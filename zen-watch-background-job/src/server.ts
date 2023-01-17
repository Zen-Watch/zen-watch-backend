import dotenv from 'dotenv';
import { fetchUnprocessedEvents, processUnprocessedEvents } from './handlers/event.handler';

dotenv.config();

console.log('hello world')!

//read unprocessed events
const unprocessed_events = fetchUnprocessedEvents();

//act based on event type
processUnprocessedEvents(unprocessed_events);

