import { connect_to_mysql } from "../db/connection_pool";

export async function fetchIFTTTTriggerDefinition(trigger_id: number) {
  const pool = await connect_to_mysql()
  const api_worker_id = Number(process.env.API_WORKER_ID);
  const result: any = await pool!.query(`select * from ifttt_trigger_definition where id=?`, [trigger_id]);
  return result[0][0];
}
