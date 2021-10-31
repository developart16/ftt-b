const { get_cryptos, get_new_metrics, post_metrics, get_merics } = require("./controllers/endpoints");

module.exports = async (fastify, options) => {

    fastify.route({
        method: "GET",
        url: "/newMetrics",
        handler: get_new_metrics,
        // schema: schema_get
    });

    fastify.route({
        method: "GET",
        url: "/metrics",
        handler: get_merics,
        // schema: schema_get
    });
    
    fastify.route({
        method: "GET",
        url: "/cryptos",
        handler: get_cryptos,
        // schema: schema_get
    });

    fastify.route({
        method: "POST",
        url: "/metrics",
        handler: post_metrics,
        // schema: schema_get
    });
}