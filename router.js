const { metrics } = require("./controllers/endpoints");

module.exports = async (fastify, options) => {
    const fttDB = global.fttDB;

    fastify.route({
        method: "GET",
        url: "/metrics",
        handler: metrics,
        // schema: schema_get
    });
}