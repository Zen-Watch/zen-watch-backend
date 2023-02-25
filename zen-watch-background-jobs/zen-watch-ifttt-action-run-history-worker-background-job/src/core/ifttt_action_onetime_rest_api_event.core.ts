import { fetch_ifttt_action_definition_by_id } from "../logic/ifttt_action_definition.logic";

async function echo_bot_by_zen_watch(url: any, api_key: any, payload: any) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': api_key,
        },
        body: JSON.stringify(payload.data),
    });

    if (!response.ok) {
        throw new Error(`Failed to post to webhook: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function handle_ifttt_action_onetime_rest_api_event(ifttt_action_run_history_event: any) {
    console.log("handle_ifttt_action_onetime_rest_api_event", ifttt_action_run_history_event);
    const action_definition = await fetch_ifttt_action_definition_by_id(ifttt_action_run_history_event.action_run_info.action_id);
    console.log("action_definition", action_definition);
    const response = await echo_bot_by_zen_watch(
        'http://localhost:1338/ifttt/test/echo', 
        'xyz', 
        JSON.stringify({a: 1})
    );
    console.log("response", response);
}