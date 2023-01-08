const {EmbedBuilder} = require("discord.js");
const categoryList = require("../category_list");
const main = require("../index")

module.exports = {
    name: 'commands',
    description: 'Provides a neat list of commands.',
    category: 'Utility',
    execute(message, args) {

        // Check for the first argument. (y!commands <command group>)
        if (args.length === 1) {
            const argIn = args[0];

            // Check if the provided category exists.
            if (!categoryList.hasCategoryIgnoreCase(argIn)) {
                message.reply("Provided category does not exist!");
                return;
            }

            // Get all commands with provided category
            const commandsFiltered = main.getCommands()
                .filter(cmd => cmd.category.toLowerCase() === argIn.toLowerCase());


            // Check if there are any commands in that category.
            if (commandsFiltered.length === 0) {
                message.reply(`:warning: | There are no commands in \`${argIn}\` category!`)
                return;
            }


            let resp = "```asciidoc";

            commandsFiltered.forEach(cmd => {

                // Make the `::` always have the same padding from the left.
                const padding = " ".repeat(12 - cmd.name.length);

                // Make the commands first letter uppercase
                const name = cmd.name.substring(0, 1).toUpperCase() + cmd.name.substring(1);

                // Format:
                // • Commandname    :: command name description
                // • Test123        :: test command description 123
                resp += `\n\u2022 ${name}${padding} :: ${cmd.description}`;

            });

            resp += "\n\`\`\`" +
                "\nYou can use \`y! help \u003Ccommand\u003E\` for help with a specific command!";



            message.channel.send(resp);

            return
        }



        const embed = new EmbedBuilder({
            description: "To view the commands in each group use:\`\`\`y! commands \u003Cgroup\u003E\`\`\`",
            color: message.guild.members.me.displayColor, // Color of the highest role of the bot.
            author: {name: "Yui's commands.", iconURL: `${message.client.user.displayAvatarURL({size: 32})}`}
        });

        // Add each command category and its icon to the fields list.
        embed.addFields(categoryList.getCommandCategories().map(value => {

            // Count commands in the category
            const cmdAmount = main.getCommands()
                .filter((command) => command.category === value.name)
                .length;

            return {
                name: `${value.icon} ${value.name}`,
                value: `${cmdAmount} commands.`,
                inline: true
            };
        }));

        // message.reply({embeds: [embed]})
        message.channel.send({embeds: [embed]});

    },

}
