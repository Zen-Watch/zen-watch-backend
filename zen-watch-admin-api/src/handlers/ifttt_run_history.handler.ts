
import { create_ifttt_category_logic } from "../logic/ifttt_category.logic";
import { STATUS_NOT_FOUND, STATUS_OK } from "../utils/constants";

export async function create_ifttt_category(categ_name: string, is_onchain: boolean) {
    try {
        const row_created = await create_ifttt_category_logic(categ_name, is_onchain);
        console.log('row_created', row_created);
        return { status: STATUS_OK, message: 'Category created' }
    } catch(error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during category creation. Please contact support@zen.watch' }
    }
}
    