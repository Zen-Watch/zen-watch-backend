import Event from "../../models/web2/event.model";

export async function saveEvent(params:any) {
    const event = new Event({
        event_id: params.event_id,
        event_timestamp: params.event_timestamp,
        event_type: params.event_type,
        api_key: params.api_key,
        environment_details: params.environment_details,
        event_properties: params.event_properties,
        wallet_address: params.wallet_address,
        wallet_properties: params.wallet_properties,
        status: params.status,
        backfilled_properties: params.backfilled_properties,
    })
    await event.save()
}