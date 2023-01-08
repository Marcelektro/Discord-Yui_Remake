
module.exports = {
    name: 'say',
    description: 'Yui will say what you tell her to say. (Add -hide to the end to remove your own message)',
    category: 'Fun',
    usage: {
        format: "y!say <text>",
        examples: [
            { command: "y!say Hello", functionality: "Yui will say \'Hello\'" },
            { command: "y!say Hello -hide", functionality: "Yui will say \'Hello\' and delete your message" }
        ]
    },
    async execute(message, args) {

        if (args.length === 0) {
            message.reply("You need to provide a message that Yui will say.");

            return;
        }

        // Get the text message
        let text = args.join(' ');

        if (text.endsWith(" -hide")) {
            text = text.substring(0, text.length - 6);

            // If the msg ends with -hide, remove the command message.
            await message.delete();
        }

        // Send the message to the channel
        // Ensure the message won't mention anyone
        message.channel.send({ content: text, allowedMentions: { parse: [] } });

    },
}
