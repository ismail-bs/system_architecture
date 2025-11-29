/**
 * middlewares/validator.js
 * Middleware pattern: validates request body
 */
function validator(req, res, next) {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Invalid request body' });
    }
    next();
}

module.exports = { validator };
