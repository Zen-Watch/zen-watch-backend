import dotenv from 'dotenv';
import dayjs from 'dayjs'
import { handle_fetch_unprocessed_ifttt_action_run_history_events, handle_process_ifttt_action_run_history_events } from './handlers/ifttt_action_run_history.handler';

dotenv.config();

console.log('Processing of ifttt action run history worker background job run started at - ', dayjs().format());

// We need one instance of the worker to run in the background, so use Settimeout to run the function
// Try catch as we need to catch the error and not let the process exit before the next run
function run_task() {
    try {
        console.log('Run_task next loop for ifttt action run history worker background job started at -', dayjs().format());

        // read all unprocessed IFTTT action run history events
        handle_fetch_unprocessed_ifttt_action_run_history_events()
            .then(ifttt_action_run_history_events => {
                // process each IFTTT action run history event & create the respective action run history events
                handle_process_ifttt_action_run_history_events(ifttt_action_run_history_events)
                    .then(() => {
                        console.log(`Processing of IFTTT action run history worker background job run finished at -  `, dayjs().format());
                        //process.exit(0); // Terminate with success
                    })
                    .catch(err => {
                        console.log('Process terminated with error in handle_process_ifttt_action_run_history_events', err);
                        //process.exit(1); // Terminate with failure
                    });
            })
            .catch(err => {
                console.log('Process terminated with error in handle_fetch_unprocessed_ifttt_action_run_history_events', err);
                //process.exit(1);
            });
    } catch (e) {
        console.log('Process terminated with error in ifttt action run history worker run_task', e);
    } finally {
        console.log('Run_task next loop for ifttt action run worker background job finished at -', dayjs().format());
        console.log('------------------------------------');
        // Repeat every three minute, always
        setTimeout(run_task, 3000);
    }
}

run_task();



