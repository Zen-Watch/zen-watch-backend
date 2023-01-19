import { connect_to_mysql } from "../db/connection_pool";

export async function fetchUnprocessedEvents() {
    const pool = await connect_to_mysql()
    const result: any = await pool.query(`select * from event where status='unprocessed'`);
    return result[0];
}

// Ref: https://github.com/sidorares/node-mysql2/discussions/1471
// https://github.com/sidorares/node-mysql2/blob/07a429d9765dcbb24af4264654e973847236e0de/test/integration/connection/test-transaction-commit.js
// https://github.com/sidorares/node-mysql2/blob/07a429d9765dcbb24af4264654e973847236e0de/test/integration/connection/test-transaction-rollback.js
export async function saveBackFillJson(event:any, backfill_json_str:string) {
    try{
        const pool = await connect_to_mysql();
        const backfill_json = {}
        await pool.getConnection(async (err, conn) => {
            try{
                console.log('TRY CALLED in saveBackFillJson')
                console.log('TRY FINISHED in saveBackFillJson')
            }
            catch(error) {
                console.log('ERROR CALLED in saveBackFillJson')
            }
            finally {
                console.log('FINALLY CALLED in saveBackFillJson')
                await conn.release();
            }
        });
    }catch(e){
        throw e;
    }
}