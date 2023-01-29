import { get_developer_by_api_key } from "../logic/developer.logic";

const NodeCache = require( "node-cache" );

let _api_key_cache:any  = undefined;

function get_api_key_cache() {
    // If the pool was already created, return it instead of creating a new one.
    if(typeof _api_key_cache !== 'undefined') {
        console.log('RETURNING EXISTING DEVELOPER API_KEY CACHE');
        return _api_key_cache;
    }
    _api_key_cache = new NodeCache({ stdTTL: 300, checkperiod: 320 });
    console.log('CREATED DEVELOPER API_KEY CACHE')
    return _api_key_cache;
}

export async function get_developer_by_api_key_from_cache(api_key: string) {
    const _cache = get_api_key_cache();
    const value = _cache.get(api_key);
    if ( value === undefined ){
        console.log('CACHE MISS')!
        const dev = await get_developer_by_api_key(api_key);
        console.log(dev)
        if (dev === undefined) 
            throw new Error('Invalid API Key');
        _cache.set(api_key, dev);
        console.log('SUCCESSFULLY SET THE CACHE')!
    }
    console.log('Returning from cache', _cache.get(api_key));
    return _cache.get(api_key);
}