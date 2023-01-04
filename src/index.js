const { Client, GatewayIntentBits } = require('discord.js');

const fs = require('fs');

const dotenv = require('dotenv');
dotenv.config();

const { QuickDB } = require('quick.db');

const database = new QuickDB({
    filePath: "./database.sql"
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent,
    ]
});

// Load the command files
let commands = new Map();

const commandFiles = fs.readdirSync(`${__dirname}/commands`).filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`${__dirname}/commands/${file}`);
    console.log(`Loading ${command.name} command from ${file}...`)
    commands.set(command.name, command);
}

// Set the bot prefix
client.prefix = "y!";


// Handle ready event
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


// Handle the message sent event
client.on('messageCreate', (message) => {
    // Ignore messages from other bots
    if (message.author.bot) return;

    // Check if the message starts with the command prefix
    if (message.content.toLowerCase().startsWith(client.prefix.toLowerCase())) {
        // Parse the command and arguments from the message
        const args = message.content.slice(client.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Get the command object from the collection
        const command = commands.get(commandName);

        // Ignore the message if the command is not found
        if (!command) return;

        // Check if the command requires any arguments and if they were provided
        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${client.prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply);
        }

        // Execute the command
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error trying to execute the \`${command.name}\` command!`);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

module.exports.getDatabase = () => {return database}