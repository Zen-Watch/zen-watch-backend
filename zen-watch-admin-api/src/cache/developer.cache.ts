import { get_developer_by_api_key, get_developer_by_email } from "../logic/developer.logic";

const NodeCache = require( "node-cache" );

// Caches
let _api_key_cache:any  = undefined;
let _email_cache:any  = undefined;

// Initializations
function get_api_key_cache() {
    // If the pool was already created, return it instead of creating a new one.
    if(typeof _api_key_cache !== 'undefined') {
        return _api_key_cache;
    }
    _api_key_cache = new NodeCache({ stdTTL: 300, checkperiod: 320 });
    return _api_key_cache;
}

function get_email_cache() {
    // If the pool was already created, return it instead of creating a new one.
    if(typeof _email_cache !== 'undefined') {
        return _email_cache;
    }
    _email_cache = new NodeCache({ stdTTL: 300, checkperiod: 320 });
    return _email_cache;
}

// Cache Methods
export async function get_developer_by_api_key_from_cache(api_key: string) {
    const _cache = get_api_key_cache();
    const value = _cache.get(api_key);
    if ( value === undefined ){
        const dev = await get_developer_by_api_key(api_key);
        if (dev === undefined) 
            throw new Error('Invalid API Key');
        _cache.set(api_key, dev);
    }
    return _cache.get(api_key);
}

export async function get_developer_by_email_from_cache(email: string) {
    const _cache = get_email_cache();
    const value = _cache.get(email);
    if ( value === undefined ){
        const dev = await get_developer_by_email(email);
        if (dev === undefined) 
            throw new Error('Invalid Developer Email');
        _cache.set(email, dev);
    }
    return _cache.get(email);
}