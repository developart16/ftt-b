const { cryptoData } = require("./cryptos")


exports.metrics = async (req, rep) => { 
    
    const {cryptoId, interval, currency = 'EUR'} = req.query;
    
    // console.log( {cryptoId, interval, currency} );
    // if(!cryptoId || !interval) return rep.code(400).send({error:true, message:'Missing required data'});

    const crypto = await cryptoData(cryptoId, interval);

    if ( ! crypto ) return rep.code(500).send({error:true, message:'Something went wrong!'});

    // console.log( "crypto", `(${typeof crypto}): `, crypto);

    return rep.code(200).send(crypto);
}