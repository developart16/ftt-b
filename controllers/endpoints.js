const { currentTimestamp } = require("../utils/time");
const { cryptoData } = require("./cryptos")


exports.get_new_metrics = async (req, rep) => { 
    
    const {cryptoId, interval, currency = 'EUR'} = req.query;
    
    // console.log( {cryptoId, interval, currency} );
    // if(!cryptoId || !interval) return rep.code(400).send({error:true, message:'Missing required data'});

    const crypto = await cryptoData(cryptoId, interval);

    if ( ! crypto ) return rep.code(500).send({ 
        error: true, 
        message:'Something went wrong!'
    });

    return rep.code(200).send(crypto);
}

exports.get_cryptos = async (req, rep)=>{
    
    const {fttDB} = global;

    const availableCryptos = await fttDB.collection('cryptos').find({}).toArray();
    if ( ! availableCryptos ) return rep.code(500).send({error: true, message:"Something went Wrong!" })

    return rep.code(200).send({
        error: false, 
        data: availableCryptos
    });

}

exports.post_metrics = async (req, rep)=>{

    const {fttDB} = global;
    const {metrics} = req.body;
    const errors = [];

    if ( ! metrics ) return rep.code(400).send({error:true, message: "Requeired informtacion missing"});

    timestamp = currentTimestamp();
    for await (const _metric of metrics) {
        const search = { id: _metric.id };
        const options = { upsert: true };
        
        const set = {
            $set: {
                id: _metric.id,
                currency: _metric.currency,
                averages: _metric.averages,
                timestamp
            }
        };
        const save = await fttDB.collection('metrics')
            .findOneAndUpdate(search, set, options);

        if ( !save.ok ) errors.push(_metric.id);
        
    }

    if ( errors.length ) return rep.code(200).send({error: true, message: `Couldn't save ${errors.join(', ')}`})

    return rep.code(200).send({ error: false });

}


exports.get_merics = async (req, rep) => {

    const {fttDB} = global;

    const metrics = await fttDB.collection('metrics').find({}).toArray();

    return rep.code(200).send({
        error: false, 
        data: metrics
    });

}