const fs = require("fs");
const path = require("path");
const mongoInit = require("./DB/mongoInit")

const envFile = `${process.env.MODE || "local"}.env`;
const envRoute = path.resolve(__dirname, "./env", envFile);

if (fs.existsSync(envRoute)) {
	require("dotenv").config({
		path: envRoute,
	});	
	console.log( `    ✅ ENV loaded mode ${process.env.MODE || 'local' }` );
} else {
	console.log( `    ❌ ${envFile} not found` );
};



const availableCriptos = [
    {
        "id" : "XDG",
        "currency" : "EUR",
        "name" : "Dogecoin"
    },
    {
        "id" : "BTC",
        "currency" : "EUR",
        "name" : "Bitcoin"
    },
    {
        "id" : "ETH",
        "currency" : "EUR",
        "name" : "Etherium"
    },
    {
        "id" : "ADA",
        "currency" : "EUR",
        "name" : "Cardano"
    },
    {
        "id" : "DOT",
        "currency" : "EUR",
        "name" : "Polkadot"
    },
    {
        "id" : "XRP",
        "currency" : "EUR",
        "name" : "Ripple"
    }
]

async function restart() {

    await mongoInit();
    const {fttDB} = global;


    for await (const _crypto of availableCriptos) {
        const search = { id: _crypto.id };
        const options = { upsert: true };
        
        const set = {
            $set: {
                id: _crypto.id,
                currency: _crypto.currency,
                name: _crypto.name,
            }
        };
        const save = await fttDB.collection('cryptos')
            .findOneAndUpdate(search, set, options);

        if ( !save.ok ) errors.push(_crypto.id);
        
    }

} 

(async() => {
    await restart()
})();
