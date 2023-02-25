import dotenv from 'dotenv';
import dayjs from 'dayjs'
import { handleFetchUnprocessedIFTTTTriggerRunHistoryEvents, handleProcessIFTTTTriggerRunHistoryEvents } from './handlers/ifttt_trigger_run_history.handler';

dotenv.config();

console.log('Processing of IFTTT trigger run history worker background job run started at - ', dayjs().format());


function run_task() {
    // read all unprocessed IFTTT trigger run history events
    handleFetchUnprocessedIFTTTTriggerRunHistoryEvents()
        .then(ifttt_trigger_run_history_events => {
            // process each IFTTT trigger run history event & create the respective action run history events
            handleProcessIFTTTTriggerRunHistoryEvents(ifttt_trigger_run_history_events)
                .then(() => {
                    console.log(`Processing of IFTTT trigger run history worker background job run finished at -  `, dayjs().format());
                    //process.exit(0); // Terminate with success
                })
                .catch(err => {
                    console.log('Process terminated with error in handleProcessIFTTTTriggerRunHistoryEvents', err);
                    //process.exit(1); // Terminate with failure
                });
        })
        .catch(err => {
            console.log('Process terminated with error in handleFetchUnprocessedIFTTTTriggerRunHistoryEvents', err);
            //process.exit(1);
        });
}

// Repeat every minute
setInterval(()=> {
    console.log('SetInterval Next loop for IFTTT trigger run history worker background job started at -', dayjs().format());
    run_task();
}, 3000); // 30000



