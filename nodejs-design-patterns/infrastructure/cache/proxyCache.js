/**
 * infrastructure/cache/proxyCache.js
 * Proxy pattern: caches results for repository methods
 */
class ProxyCache {
    constructor(target) {
        this.target = target;
        this.cache = {};
    }

    save(obj) {
        this.cache = {}; // invalidate cache on write
        return this.target.save(obj);
    }

    findAll() {
        if (!this.cache.all) {
            this.cache.all = this.target.findAll();
        }
        return this.cache.all;
    }

    findByEmail(email) {
        return this.target.findByEmail(email);
    }
}

module.exports = ProxyCache;
