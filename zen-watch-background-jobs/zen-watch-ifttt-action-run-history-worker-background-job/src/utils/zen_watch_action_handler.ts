
// create a class ZenWatchActionHandler 
export class ZenWatchActionHandler {

    // DB record of the event
    _event: any;

    constructor(_event: any) {
        this._event = _event;
    }

    handle_action = (payload: any) => {
        console.log('ZenWatchActionHandler.handle_action', payload);
        // console.log('ZenWatchActionHandler.handle_action', payload.then((result: any) => {
        //     console.log('ZenWatchActionHandler.handle_action.result', result);
        //     }).catch((error: any) => {
        //         console.error('ZenWatchActionHandler.handle_action.error', error);
        //     })
        // );
    }

    handle_error = (error: any) => {
        console.error('Error:', error);
        // console.error('Error:', error.then((result: any) => {
        //     console.log('ZenWatchActionHandler.handle_error.result', result);
        //     }).catch((error: any) => {
        //         console.error('ZenWatchActionHandler.handle_error.error', error);
        //     })
        // );
    }
}