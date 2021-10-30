const { default: axios } = require("axios")

exports.cryptoData = async (crypto, interval = 1, currency = 'EUR')=>{
    const fullName = crypto + currency;
    const url = `https://api.kraken.com/0/public/OHLC?pair=${ fullName }&interval=${interval}`

    const {data:{result}} = await axios.get(url);

    if ( ! result ) return {error: true};

    const coinName = Object.keys(result)[0];
    
    const length = result[coinName].length;

    // const lastEntries = [
    //     result[coinName][ length - 1 ][1], 
    //     result[coinName][ length - 2 ][1]
    // ];

    if ( result ) return { error: false, data: result[coinName], length };
    return { error: true }
}