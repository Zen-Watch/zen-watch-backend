import { save_ifttt_action_run_history_payload } from "../logic/ifttt_action_run_history.logic";

// create a class ZenWatchActionHandler 
export class ZenWatchActionHandler {

    // DB record of the event
    _event: any;

    constructor(_event: any) {
        this._event = _event;
    }

    handle_action = (payload: any) => {
        save_ifttt_action_run_history_payload(this._event, payload).then((res: any) => {
            console.log('Action run history payload saved - ', res);
        }).catch((err: any) => {
            console.error('Error saving action run history payload - ', err);
        });
    }

    handle_error = (error: any) => {
        console.error('Error:', error);
    }
}