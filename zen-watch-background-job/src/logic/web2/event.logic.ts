import { connect_to_mysql } from "../../db/connection_pool";

export async function fetchUnprocessedEvents() {
    const pool = await connect_to_mysql()
    const result: any = await pool.query(`select * from event where status='unprocessed'`);
    return result[0];
}
