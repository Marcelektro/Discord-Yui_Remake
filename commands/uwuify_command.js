const main = require('../index');

// Function to uwuify a given string
function uwuify(text) {
    // Copy the original first letter of the input message
    // and do the transformation on the rest of it
    text = text.substring(0, 1) + text.substring(1).toLowerCase()
        .replaceAll('s', 'sh')
        .replaceAll('l', 'w')
        .replaceAll('r', 'w')

    text += " uwu"

    return text;
}

module.exports = {
    name: 'uwuify',
    description: 'Uwuifies the given text',
    execute(message, args) {
        // Get the text to uwuify from the command arguments
        const text = args.join(' ');

        // Uwuify the text
        const uwuifiedText = uwuify(text);

        // Send the uwuified text back to the channel
        message.reply(uwuifiedText);
    },
};
