import dotenv from 'dotenv';
import dayjs from 'dayjs'
import { handle_fetch_all_ifttt_instances, handle_process_ifttt_instance } from './handlers/ifttt_instance.handler';
dotenv.config();

console.log('Processing of ifttt instance worker background job run started at - ', dayjs().format());

// We need one instance of the worker to run in the background, so use Settimeout to run the function
// Try catch as we need to catch the error and not let the process exit before the next run
function run_task() {
    try {
        console.log('Run_task next loop for ifttt instance worker background job started at -', dayjs().format());

        // read all ifttt instances
        handle_fetch_all_ifttt_instances()
            .then(ifttt_instances => {
                // act based on event ifttt instance & active status
                handle_process_ifttt_instance(ifttt_instances)
                    .then(() => {
                        console.log(`Processing of ifttt instance worker background job run finished at -  `, dayjs().format());
                        //process.exit(0); // Terminate with success
                    })
                    .catch(err => {
                        console.log('Process terminated with error in handle_process_ifttt_instance', err);
                        //process.exit(1); // Terminate with failure
                    });
            })
            .catch(err => {
                console.log('Process terminated with error in handle_fetch_all_ifttt_instances', err);
                //process.exit(1);
            });
    } catch (e) {
        console.log('Process terminated with error in ifttt instance worker run_task', e);
        //process.exit(1);
    } finally {
        console.log('Run_task next loop for ifttt instance worker background job finished at -', dayjs().format());
        console.log('------------------------------------');
        // Repeat every three minute, always
        setTimeout(run_task, 10000);
    }
}

run_task();


