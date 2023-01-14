import { Schema, model } from 'mongoose';

/*
{
    "event_id": "cace9ceb-0784-4084-a16f-d98ad699ec37",
    "event_timestamp": "1673407990", 
    "event_type": "onchain-transaction",
    "api_key": "b69bce8c-7c00-449d-b4c5-23380bc0e628",
    "environment_details": {
        "city": "San Fransisco",
        "country": "USA",
        "platform": "iOS"
    },
    "event_properties": {
		"giveaway_id": "giveaway_20230130" 
    },
    "wallet_address": "0x35a019d65a13afcd8b5bb6d32a8f5f54a2ed53e5",
    "wallet_properties": { 
        "player_rank": 90
    },
    "status": "unprocessed",
    "backfilled_properties": ""
}
*/

interface IEvent {
    event_id: string;
    event_timestamp: string;
    event_type: string;
    api_key: string;
    environment_details: string;
    event_properties: string;
    wallet_address: string;
    wallet_properties: string;
    status: string;
    backfilled_properties?: string;
}

const eventSchema = new Schema<IEvent>({
    event_id: { type: String, required: true, index: true },
    event_timestamp: { type: String, required: true, index: true },
    event_type: { type: String, required: true, index: true },
    api_key: { type: String, required: true, index: true },
    environment_details: { type: String, required: true },
    event_properties: { type: String, required: true },
    wallet_address: { type: String, index: true },
    wallet_properties: { type: String, required: true },
    status: { type: String, required: true, index: true },
    backfilled_properties: { type: String, default: '' },
});

const Event = model<IEvent>('Event', eventSchema);
export default Event;
