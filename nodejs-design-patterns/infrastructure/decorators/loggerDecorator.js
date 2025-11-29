/**
 * infrastructure/decorators/loggerDecorator.js
 * Decorator pattern: adds logging to any method
 */
function withLogging(fn, name) {
    return function(...args) {
        console.log(`[LOG] ${name} called with args:`, args);
        const result = fn(...args);
        console.log(`[LOG] ${name} result:`, result);
        return result;
    };
}

module.exports = withLogging;
