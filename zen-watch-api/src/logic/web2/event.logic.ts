import { connect_to_mysql } from "../../db/connection_pool";


export async function saveEvent(params:any) {
    try{
        console.log('INSIDE SAVE EVENT', params);
        const pool = connect_to_mysql()


    }catch(e){
        throw e;
    }
}