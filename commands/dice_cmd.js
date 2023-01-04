
module.exports = {
    name: 'dice',
    description: 'Roll a dice',
    execute(message) {
        // Generate a random number between 1 and 6
        const result = Math.floor(Math.random() * 6) + 1;

        // Send the result to the channel
        message.channel.send(`🎲 | You throw your dice and roll a **${result}**`);
    },
}
