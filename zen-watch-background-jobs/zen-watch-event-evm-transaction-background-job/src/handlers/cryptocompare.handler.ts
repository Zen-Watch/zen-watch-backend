import dotenv from 'dotenv';
import { ETH, ETHEREUM_MAINNET, MATIC, POLYGON_MAINNET } from '../utils/constants';
dotenv.config();


function getNativeCurrencyForChain(chain: string) {
    switch (chain) {
        case POLYGON_MAINNET:
            return MATIC;
        case ETHEREUM_MAINNET:
            return ETH;
        default:
            return MATIC;
    }
}


// TODO: Experiment & replace with Binance API
// https://dev.binance.vision/t/get-exchange-price-for-given-symbol-at-given-timestamp/1500
export async function getExchangeRate(chain: string, to_currency: string, timestamp: number, app_exchange_rate: string) {
    try {
        if (app_exchange_rate) {
            console.log('app_exchange_rate supplied in getExchangeRate', app_exchange_rate)
            return Number(app_exchange_rate);
        }
        
        console.log('call made to crypto compare api in getExchangeRate')
        const from_currency = getNativeCurrencyForChain(chain);
        const url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${from_currency}&tsyms=${to_currency}&ts=${timestamp}&api_key=${process.env.CRYPTOCOMPARE_API_KEY}`
        const resp = await fetch(url)
        const result = await resp.json()
        const exchange_rate = result[from_currency.toUpperCase()][to_currency.toUpperCase()]
        return exchange_rate;
    } catch (e) {
        throw e;
    }
} 