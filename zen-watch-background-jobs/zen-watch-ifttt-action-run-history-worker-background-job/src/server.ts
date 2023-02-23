import dotenv from 'dotenv';
import dayjs from 'dayjs'

dotenv.config();

console.log('Processing of IFTTT instance worker background job run started at - ', dayjs().format());

function run_task() {

}

// Repeat every minute
setInterval(()=> {
    console.log('SetInterval Next loop for IFTTT instance worker background job started at -', dayjs().format());
    run_task();
}, 30000);



