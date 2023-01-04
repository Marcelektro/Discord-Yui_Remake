const main = require('../index');
const ratelimiter = require('../ratelimiter');

let cookies = new Map();

let rateLimits = new ratelimiter.RateLimiterMap(10_000);

module.exports = {
    name: 'cookie',
    description: 'Gives a cookie to the mentioned user',
    execute(message, args) {
        // Check if a user was mentioned in the command
        if (message.mentions.users.size) {
            // Get the mentioned user
            const user = message.mentions.users.first();

            // Check if the mentioned user is the same as the command issuer
            if (user.id === message.author.id) {
                return message.reply("You can't give yourself a cookie, silly!");
            }

            const rateLimit = rateLimits.get(message.author.id);

            if (!rateLimit.canDo()) {
                return message.reply(`You need to wait ${rateLimit.getTimeLeftSec()} more seconds.`);
            }

            // Update the cookie count for the mentioned user
            const count = cookies.get(user.id) || 0;
            cookies.set(user.id, count + 1);

            // Send a message to the channel
            message.reply(`You gave ${user} a cookie 🍪! That's ${count + 1} cookies now!`);

        } else {
            // No user was mentioned, send an error message
            message.reply("You need to mention a user to give them a cookie!");
        }
    },
};
