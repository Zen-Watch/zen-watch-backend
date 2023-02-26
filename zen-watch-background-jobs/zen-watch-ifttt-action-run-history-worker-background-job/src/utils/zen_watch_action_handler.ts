import { update_ifttt_action_run_history_status_and_payload } from "../logic/ifttt_action_run_history.logic";
import { IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_FAILURE, IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_FATAL_ERROR, IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_SUCCESS } from "./constants";

// create a class ZenWatchActionHandler 
export class ZenWatchActionHandler {

    // DB record of the event
    _event: any;

    constructor(_event: any) {
        this._event = _event;
    }

    handle_action = (payload: any) => {
        update_ifttt_action_run_history_status_and_payload(this._event, IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_SUCCESS, payload).then((res: any) => {
            console.log('Action run history payload saved with success - ', res);
        }).catch((err: any) => {
            console.error('Error saving action run history payload with success - ', err);
        });
    }

    handle_error = (error: any) => {
        console.error('ZenWatchActionHandler.handle_error Error:', error);
        update_ifttt_action_run_history_status_and_payload(this._event, IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_FAILURE, error).then((res: any) => {
            console.log('Action run history payload saved with failure - ', res);
        }).catch((err: any) => {
            console.error('Error saving action run history payload with failure - ', err);
        });
    }

    handle_fatal_error = (error: any) => {
        console.error('ZenWatchActionHandler.handle_fatal_error Fatal Error:', error);
        update_ifttt_action_run_history_status_and_payload(this._event, IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_FATAL_ERROR, error).then((res: any) => {
            console.log('Action run history payload saved with fatal failure - ', res);
        }).catch((err: any) => {
            console.error('Error saving action run history payload with fatal failure - ', err);
        });
    }
}