import dotenv from 'dotenv';
import dayjs from 'dayjs'
import { handle_fetch_all_ifttt_instances, handle_process_ifttt_instance } from './handlers/ifttt_instance.handler';
dotenv.config();

console.log('Processing of IFTTT instance worker background job run started at - ', dayjs().format());

function run_task() {
    // read all ifttt instances
    handle_fetch_all_ifttt_instances()
        .then(ifttt_instances => {
            // act based on event ifttt instance & active status
            handle_process_ifttt_instance(ifttt_instances)
                .then(() => {
                    console.log(`Processing of IFTTT instance worker background job run finished at -  `, dayjs().format());
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
}

// Repeat every minute
setInterval(()=> {
    console.log('SetInterval Next loop for IFTTT instance worker background job started at -', dayjs().format());
    run_task();
}, 3000); //30000



