
const indicators = {
    textIndicator: ":regional_indicator_%s: ",
    numberIndicator: ":%s: "
};

const numbers = new Map([
    [0, "zero"], [1, "one"],
    [2, "two"], [3, "three"],
    [4, "four"], [5, "five"],
    [6, "six"], [7, "seven"],
    [8, "eight"], [9, "nine"]
]);


const makeBanner = (input) => {

    let out = "";

    for (const c of input) {

        // If the character is a space, make it two spaces for clarity of the output.
        if (c === " ") {
            out += "  ";
        }
        // If the character is a letter, make it a text indicator
        else if (c.match(/[a-z]/i)) {
            out += indicators.textIndicator.replace("%s", c.toLowerCase());
        }
        // If the character is a number, make it a number indicator
        else if (c.match(/[0-9]/)) {
            out += indicators.numberIndicator.replace("%s", numbers.get(parseInt(c)));
        }
        // If the character is nothing above, copy it as it is.
        else {
            out += c;
        }

    }

    return out;
}


module.exports = {
    name: 'banner',
    description: 'Makes a banner of your message using regional indicators.',
    category: 'Fun',
    usage: {
        format: "y!banner <text to bannerise>",
        examples: [
            { command: "y!banner Hello", functionality: "Yui will turn it into a text made of regional indicators" }
        ]
    },
    async execute(message, args) {

        if (args.length === 0) {
            message.reply("You need to provide a message that Yui will turn into a banner.");

            return;
        }

        // Get the text message
        const input = args.join(' ');

        // Turn the text into a banner
        const text = makeBanner(input);

        // Send the message to the channel
        // Ensure the message won't mention anyone
        message.channel.send({ content: text, allowedMentions: { parse: [] } });

    },
}
