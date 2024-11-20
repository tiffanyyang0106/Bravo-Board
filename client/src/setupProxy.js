const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("Setting up proxy...");
    app.use(
        '/api', // Change '/goals' to '/api' to avoid duplication
        createProxyMiddleware({
            target: 'http://127.0.0.1:5000', // Flask backend
            changeOrigin: true,
            logLevel: 'debug', // Detailed logs for proxy behavior
            pathRewrite: {
                '^/api': '', // Strip '/api' before forwarding to Flask
            },
            onProxyReq: (proxyReq, req, res) => {
                console.log(`[Proxying] ${req.method} request to: ${req.url}`);
            },
            onProxyRes: (proxyRes, req, res) => {
                console.log(`[Response] Status: ${proxyRes.statusCode} for: ${req.url}`);
            },
        })
    );
};
