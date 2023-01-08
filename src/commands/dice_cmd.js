
// TODO: The command should require an argument for sides amount of the dice.
// TODO: Also it should accept 2 additional args with predicted side and bet amount.
module.exports = {
    name: 'dice',
    description: 'Bet on the roll of a dice',
    category: 'Gambling',
    usage: {
        format: "y!dice <sides> {choice} {bet}",
        examples: [
            { command: "y!dice 4", functionality: "Rolls a 4 sided die, makes no bet on the outcome" },
            { command: "y!dice 4 2 100", functionality: "Rolls a 4 sided die, predicts it will land on 2 and bets 100 silver on it" }
        ]
    },
    execute(message) {
        // Generate a random number between 1 and 6
        const result = Math.floor(Math.random() * 6) + 1;

        // Send the result to the channel
        message.channel.send(`🎲 | You throw your dice and roll a **${result}**`);
    },
}
