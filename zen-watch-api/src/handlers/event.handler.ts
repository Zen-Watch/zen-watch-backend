import { validateZenWatchEvent } from '../utils/validation.utils';

export function handleZenWatchEvent(event: any) {
    const valid_event = validateZenWatchEvent(event)
    const resp_json = {
        'request': valid_event
    }
    return resp_json;
}