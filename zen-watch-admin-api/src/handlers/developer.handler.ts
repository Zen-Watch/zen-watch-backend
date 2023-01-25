import { get_developer_by_email } from "../logic/developer.logic";
import { STATUS_NOT_FOUND, STATUS_OK } from "../utils/constants";

export async function allow_developer_signup(email: string) {
    const dev = await get_developer_by_email(email);
    if (dev !== undefined) 
        return { status: STATUS_OK, message: 'Allow Developer Signup' }
    else
        return { status: STATUS_NOT_FOUND, message: 'Developer not whitelisted for signup. Please email support to get an invite.' }
}
    