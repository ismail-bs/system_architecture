/**
 * middlewares/logger.js
 * Middleware pattern: logs request info
 */
function logger(req, res, next) {
    console.log(`[REQUEST] ${req.method} ${req.url} - body:`, req.body);
    next();
}

module.exports = { logger };
