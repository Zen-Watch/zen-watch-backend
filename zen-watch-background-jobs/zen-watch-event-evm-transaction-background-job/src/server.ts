import dotenv from 'dotenv';
import dayjs from 'dayjs'

import { handleFetchUnprocessedEVMTransactionEvents, handleProcessUnprocessedEVMTransactionEvents } from './handlers/event_evm_transaction.handler';

dotenv.config();

console.log('Processing of EVM transaction job run started at - ', dayjs().format());

function run_task() {
    //read unprocessed events
    handleFetchUnprocessedEVMTransactionEvents()
        .then(unprocessed_events => {
            //act based on event type
            handleProcessUnprocessedEVMTransactionEvents(unprocessed_events)
                .then(() => {
                    console.log(`Processing of EVM transaction job run finished at -  `, dayjs().format());
                    //process.exit(0); // Terminate with success
                })
                .catch(err => {
                    console.log('Process terminated with error in handleFetchUnprocessedEVMTransactionEvents', err);
                    //process.exit(1); // Terminate with failure
                });
        })
        .catch(err => {
            console.log('Process terminated with error in handleFetchUnprocessedEVMTransactionEvents', err);
            //process.exit(1);
        });
}

// Repeat every minute
setInterval(()=> {
    console.log('SetInterval Next loop for EVM transaction job started at -', dayjs().format());
    run_task();
}, 60000);



