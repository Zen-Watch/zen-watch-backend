import { create_ifttt_trigger_run_history_event } from "../logic/ifttt_trigger_run_history.logic";
import { IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_FATAL_ERROR, IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_UNPROCESSED } from "./constants";

// create a class ZenWatchTriggerHandler 
export class ZenWatchTriggerHandler {

    // DB record of the event
    _event: any;

    constructor(_event: any) {
        this._event = _event;
    }

    handle_trigger = (payload: any) => {
        create_ifttt_trigger_run_history_event(this._event, payload, IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_UNPROCESSED).then((res: any) => {
            console.log('Trigger run history payload saved with success - ', res);
        }).catch((err: any) => {
            console.error('Error saving trigger run history payload with success - ', err);
        });
    }

    handle_error = (error: any) => {
        console.error('ZenWatchTriggerHandler.handle_error Error:', error);
        create_ifttt_trigger_run_history_event(this._event, error, IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_UNPROCESSED).then((res: any) => {
            console.log('Trigger run history payload saved with error - ', res);
        }).catch((err: any) => {
            console.error('Error saving trigger run history payload with error - ', err);
        });
    }

    handle_fatal_error = (error: any) => {
        console.error('ZenWatchTriggerHandler.handle_fatal_error Fatal Error:', error);
        create_ifttt_trigger_run_history_event(this._event, error, IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_FATAL_ERROR).then((res: any) => {
            console.log('Trigger run history payload saved with fatal error - ', res);
        }).catch((err: any) => {
            console.error('Error saving trigger run history payload with fatal error - ', err);
        });
    }
}