import { connect_to_mysql } from "../db/connection_pool";

export async function create_ifttt_category_logic(categ_name: string, is_onchain: boolean) {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool!.query( `insert into ifttt_category (categ_name, is_onchain) values (?, ?);`, [categ_name, is_onchain])
    return result[0];
  } catch (e) {
    throw e;
  }
}