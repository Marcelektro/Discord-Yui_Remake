const { Client, GatewayIntentBits } = require('discord.js');

const fs = require('fs');

const commandCategoryList = require('./category_list');

// .env
const dotenv = require('dotenv');
dotenv.config();

// Database
const { QuickDB } = require('quick.db');

const database = new QuickDB({
    filePath: process.env.DATABASE_PATH || "./database.sqlite"
});

// Discord Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent,
    ]
});

// Load the command files
const commands = new Map();

const commandFiles = fs.readdirSync(`${__dirname}/commands`).filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`${__dirname}/commands/${file}`);

    // Make sure the command at least has name and execute function.
    if (!command.name || !command.execute) {
        console.log(`Ignoring loading invalid command from ${file} file!`)
        continue
    }

    console.log(`Loading ${command.name} command from ${file}...`)

    // Check if the command has its category defined
    if (command.category) {
        // Check if the category the command is in, exists.
        // If it doesn't, warn about it.
        if (!commandCategoryList.hasCategory(command.category)) {
            console.log(`[WARN] Command ${command.name} has a category (${command.category}) that doesn't exist in the categories list.`)
        }
    }
    // If it has no category, warn about it.
    else {
        console.log(`[WARN] Command ${command.name} has no category set!`)
    }

    // Add the command to the set.
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
module.exports.getCommands = () => {return [...commands.values()]}