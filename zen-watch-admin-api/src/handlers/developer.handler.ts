import { get_developer_by_email_from_cache } from "../cache/developer.cache";
import { STATUS_NOT_FOUND, STATUS_OK } from "../utils/constants";

export async function allow_developer_signup(email: string) {
    try {
        const dev = await get_developer_by_email_from_cache(email);
        return { status: STATUS_OK, message: 'Allow Developer Signup' }
    } catch(error) {
        return { status: STATUS_NOT_FOUND, message: 'Developer not whitelisted for signup. Please email support to get an invite.' }
    }
}
    