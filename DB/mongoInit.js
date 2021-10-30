const { ObjectId } = require("mongodb");



module.exports = mongoInit = async () => {
	
	const MongoClient = require("mongodb").MongoClient;
   
	
	let dbUrl = process.env.MONGO_URL || "mongodb://localhost:27017";
	
	
	// Conecto a mongoDB
	let options = {
		useNewUrlParser: true,
		useUnifiedTopology: true
	};
	
	
	try {
		
		const client = new MongoClient(dbUrl, options);
			
		const con = await client.connect();
	
		const fttDB = con.db("fttDB");
		
		
		if ( fttDB ) {
			
			console.log("    ✅ MongoDB");
			
			global.fttDB = fttDB;
			
		};
		
	} catch (err) {
		console.log( err );
		console.log("    ❌ MongoDB error");
	};	
	
};