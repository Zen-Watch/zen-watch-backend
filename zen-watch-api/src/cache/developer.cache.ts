import { get_developer_by_api_key } from "../logic/developer.logic";
import { INVALID_API_KEY } from "../utils/constants";

const NodeCache = require( "node-cache" );

// Caches
let _api_key_cache:any  = undefined;

// Initializations
function get_api_key_cache() {
    // If the pool was already created, return it instead of creating a new one.
    if(typeof _api_key_cache !== 'undefined') {
        return _api_key_cache;
    }
    _api_key_cache = new NodeCache({ stdTTL: 300, checkperiod: 320 });
    return _api_key_cache;
}

// Cache Methods
export async function get_developer_by_api_key_from_cache(api_key: string) {
    const _cache = get_api_key_cache();
    const value = _cache.get(api_key);
    if ( value === undefined ){
        const dev = await get_developer_by_api_key(api_key);
        if (dev === undefined) 
            throw new Error(INVALID_API_KEY);
        _cache.set(api_key, dev);
    }
    return _cache.get(api_key);
}