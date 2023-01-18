import dotenv from 'dotenv';
import dayjs from 'dayjs'

import { handleFetchUnprocessedEvents, handleProcessUnprocessedEvents } from './handlers/event.handler';

dotenv.config();

console.log('Processing run started at - ', dayjs().format());

//read unprocessed events
handleFetchUnprocessedEvents()
    .then(unprocessed_events => {
        //act based on event type
        handleProcessUnprocessedEvents(unprocessed_events)
            .then(() => {
                console.log(`Processing run finished at -  `, dayjs().format());
                process.exit(0); // Terminate with success
            })
            .catch(err => {
                console.log('PROCESS TERMINATED WITH ERROR IN handleProcessUnprocessedEvents', err);
                process.exit(1); // Terminate with failure
            });
    })
    .catch(err => {
        console.log('PROCESS TERMINATED WITH ERROR IN handleFetchUnprocessedEvents', err);
        process.exit(1);
    });


