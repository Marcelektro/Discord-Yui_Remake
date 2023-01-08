const dbutil = require("../dbutil")
const ratelimiter = require('../ratelimiter');

let rateLimits = new ratelimiter.RateLimiterMap(10_000);

module.exports = {
    name: 'cookie',
    description: 'Bake a lovely cookie for the one you tag.',
    category: 'Counter',
    usage: {
        format: "y!cookie \<member\>",
        examples: [
            { command: "y!cookie @member", functionality: "Gives a cookie :cookie: to @member" }
        ]
    },
    async execute(message) {
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
                return message.reply(`${user}, You may not use the \`${module.exports.name}\` command again for another ${rateLimit.getTimeLeftSec()} seconds.`);
            }

            const dbR = `userData.${message.author.id}.givenCookiesTo.${user.id}`;

            // Update the cookie count for the mentioned user
            const count = await dbutil.incrementDb(dbR, 0, 1);

            // Send a message to the channel
            message.reply(`You gave ${user} a cookie 🍪! That's ${count} cookies now!`);

        } else {
            // No user was mentioned, send an error message
            message.reply("You need to mention a user to give them a cookie!");
        }
    },
};
