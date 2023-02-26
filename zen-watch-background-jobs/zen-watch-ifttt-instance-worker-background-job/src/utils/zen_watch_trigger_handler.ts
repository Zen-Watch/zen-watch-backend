import { save_ifttt_trigger_run_history_payload } from "../logic/ifttt_trigger_run_history.logic";

// create a class ZenWatchTriggerHandler 
export class ZenWatchTriggerHandler {

    // DB record of the event
    _event: any;

    constructor(_event: any) {
        this._event = _event;
    }

    handle_trigger = (payload: any) => {
        save_ifttt_trigger_run_history_payload(this._event, payload).then((res: any) => {
            console.log('Trigger run history payload saved - ', res);
        }).catch((err: any) => {
            console.error('Error saving trigger run history payload - ', err);
        });
    }

    handle_error = (error: any) => {
        console.error('Error:', error)
    }
}