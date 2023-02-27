import dotenv from 'dotenv';
import dayjs from 'dayjs'

import { handle_fetch_unprocessed_evm_transaction_events, handle_process_unprocessed_evm_transaction_events } from './handlers/event_evm_transaction.handler';

dotenv.config();

console.log('Processing of EVM transaction job run started at - ', dayjs().format());

function run_task() {
    //read unprocessed events
    handle_fetch_unprocessed_evm_transaction_events()
        .then(unprocessed_events => {
            //act based on event type
            handle_process_unprocessed_evm_transaction_events(unprocessed_events)
                .then(() => {
                    console.log(`Processing of EVM transaction job run finished at -  `, dayjs().format());
                    //process.exit(0); // Terminate with success
                })
                .catch(err => {
                    console.log('Process terminated with error in handle_process_unprocessed_evm_transaction_events', err);
                    //process.exit(1); // Terminate with failure
                });
        })
        .catch(err => {
            console.log('Process terminated with error in handle_fetch_unprocessed_evm_transaction_events', err);
            //process.exit(1);
        });
}

// Repeat every minute
setInterval(()=> {
    console.log('SetInterval Next loop for EVM transaction job started at -', dayjs().format());
    run_task();
}, 30000);



