import { connect_to_mysql } from "../db/connection_pool";

export async function fetch_ifttt_action_definition_by_id(id: number) {
  const pool = await connect_to_mysql()
  const result: any = await pool!.query(`select * from ifttt_action_definition where id=?`, [id]);
  return result[0][0];
}
