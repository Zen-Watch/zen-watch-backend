import { connect_to_mysql } from "../../db/connection_pool";

export async function fetchUnprocessedEvents() {
    const pool = await connect_to_mysql()
    const result: any = await pool.query(`select * from event where status='unprocessed'`);
    return result[0];
}

//populate the visualization & notification tables as required
export async function processUnprocessedEvents(events: Array<any>) {
    try {
        console.log('FOO BAR --', events);
        console.log('PRINTING FROM processUnprocessedEvents')
        for (let _event of events) {
            console.log(_event);
        }
    } catch (e) {
        throw e;
    }
}