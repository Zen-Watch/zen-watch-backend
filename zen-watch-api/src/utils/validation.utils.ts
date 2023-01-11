
export function validateZenWatchEvent(event: any) {
    console.log('calling validateZenWatchEvent', event);
    const resp_json = {
        'request': event
    }
    return resp_json;
}