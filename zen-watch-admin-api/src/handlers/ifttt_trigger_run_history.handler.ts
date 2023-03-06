import { get_developer_by_email_from_cache } from "../cache/developer.cache";
import { fetch_ifttt_trigger_run_history_logic } from "../logic/ifttt_trigger_run_history.logic";
import { STATUS_NOT_FOUND, STATUS_OK } from "../utils/constants";

export async function fetch_ifttt_trigger_run_history(email: string) {
    try {
        const dev = await get_developer_by_email_from_cache(email);
        const rows = await fetch_ifttt_trigger_run_history_logic(dev.id);
        return { status: STATUS_OK, message: rows }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during trigger run history fetch. Please contact support@zen.watch' }
    }
}