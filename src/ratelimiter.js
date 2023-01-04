/**
 * A simple class for handling rate limits
 */
class RateLimiter {

    constructor(cooldown) {
        this.cooldown = cooldown;
    }

    canDo() {
        let secondsLeft = (this.t + this.cooldown) - Date.now();

        if (secondsLeft > 0) {
            return false;
        }
        this.t = Date.now();

        return true;
    }

    getTimeLeftSec() {
        return ((this.t + this.cooldown) - Date.now()) / 1000;
    }

}

/**
 * A utility class for using the RateLimiter class
 */
class RateLimiterMap {

    constructor(time) {
        this.time = time;
        this.map = new Map();
    }

    get(key) {
        const a = this.map.get(key);
        if (a) return a;

        const b = new RateLimiter(this.time);
        this.map.set(key, b);
        return b;
    }

}

module.exports = {RateLimiter, RateLimiterMap}