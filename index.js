const path = require("path");
const fs = require("fs");
const mongoInit = require("./DB/mongoInit");

const fastify = require("fastify")({
	logger: false,
	disableRequestLogging: true
});


const envFile = `${process.env.MODE || "local"}.env`;
const envRoute = path.resolve(__dirname, "./env", envFile);

if (fs.existsSync(envRoute)) {
	require("dotenv").config({
		path: envRoute,
	});	
	console.log( `    ✅ ENV loaded mode ${process.env.MODE}` );
} else {
	console.log( `    ❌ ${envFile} not found` );
};


const port = process.env.PORT || 3555;

// ############################################################
// Fastify
// ############################################################

(async() => {
	
	fastify.register(require("./router"));
	fastify.register(require("fastify-cors"), {
		origin: "*",
		methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
	});
	
	
	
	fastify.get("/version", async (request, reply) => {
		return {
			v: version
		}
	});
	
	
	const start = async () => {
		try {
			await fastify.listen(port)
		} catch (err) {
			fastify.log.error(err)
			process.exit(1)
		};
	};
	
	
	await mongoInit();
	start();
	
	fastify.ready( async err => {
		
		if (err) throw err;
		console.log( "    ✅ Fastify" );
		
	});
	
})();