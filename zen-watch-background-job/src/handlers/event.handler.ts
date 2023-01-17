import { fetchUnprocessedEvents, processUnprocessedEvents } from "../logic/web2/event.logic";

export async function handleFetchUnprocessedEvents() {
    return await fetchUnprocessedEvents();
}

//populate the visualization & notification tables as required
export async function handleProcessUnprocessedEvents(events:any) {
    return await processUnprocessedEvents(events);
}