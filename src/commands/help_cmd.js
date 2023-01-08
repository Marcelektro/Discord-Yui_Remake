const {EmbedBuilder} = require("discord.js");
const main = require("../index")

module.exports = {
    name: 'help',
    description: 'Shows all commands or help on tagged command',
    category: 'Utility',
    execute(message, args) {

        // Get the color of the highest role of the bot,
        // so the embed color matches the username color.
        const embedColor = message.guild.members.me.displayColor;

        // Handle per-command help
        if (args.length === 1) {
            const argIn = args[0];

            const cmd = main.getCommands()
                .find(command => command.name.toLowerCase() === argIn.toLowerCase());

            if (!cmd) {
                message.reply(`Command \`${argIn}\` does not exist.`);
                return;
            }

            const category = cmd.category;
            const cmdName = cmd.name.substring(0, 1).toUpperCase() + cmd.name.substring(1);
            const cmdDescription = cmd.description;


            const embed = new EmbedBuilder({
                title: `${category} -> ${cmdName} command:  (Server Only)`,
                description: `${cmdDescription}`,
                color: embedColor,
                footer: {text: "<> - required, | - either/or, {} - optional"}
            });

            if (cmd.usage) {

                if (cmd.usage.format) {
                    embed.addFields({
                        name: "Format",
                        value: `\`${cmd.usage.format}\``,
                        inline: false
                    });
                }

                if (cmd.usage.examples && cmd.usage.examples.length > 0) {

                    const format = (index) => {
                        return `\`${cmd.usage.examples[index].command}\` - ${cmd.usage.examples[index].functionality}`;
                    };

                    let exampleList = format(0);

                    for (let i = 1; i < cmd.usage.examples.length; i++) {
                        exampleList += "\n" + format(i);
                    }

                    embed.addFields({
                        name: "Examples",
                        value: `${exampleList}`,
                        inline: false
                    });
                }

            }

            embed.addFields({
                name: "Extra Links",
                value: "[Invite Yui!](https://github.com/Marcelektro/Discord-Yui_Remake) | [Support Server](https://github.com/Marcelektro/Discord-Yui_Remake) | [Donate](https://github.com/Marcelektro/Discord-Yui_Remake)",
                inline: false
            });

            message.channel.send({embeds: [embed]})

            return;
        }


        // Original embed Yui would send, but with links replaced, as the discordyui[.]net no longer works.
        const embedOld = new EmbedBuilder({
            color: embedColor,
            description: "" +
                "**Command List**" +
                "\n[https://discordyui.net/commands](https://github.com/Marcelektro/Discord-Yui_Remake)" +
                "\n" +
                "\n**Command Help:**" +
                "\n\`y!help \u003Ccommand\u003E\`" +
                "\n" +
                "\n**Direct List**" +
                "\n\`y!commands\`" +
                "\n" +
                "\n**Some extra links:**" +
                "\n[Invite Yui!](https://github.com/Marcelektro/Discord-Yui_Remake) | [Support Server](https://github.com/Marcelektro/Discord-Yui_Remake) | [Donate](https://github.com/Marcelektro/Discord-Yui_Remake)"
        });

        // A custom embed to inform about this project
        const embedRemake = new EmbedBuilder({
            color: embedColor,
            description: "**Discord Yui Remake**" +
                "\nThe Yui (_Yui#2222_) bot has been shutdown on 5th of July 2022." +
                "\nWe've decided to recreate her, for fun **c:**" +
                "\n" +
                "\n**Github Repository**" +
                "\n[https://github.com/Marcelektro/Discord-Yui_Remake](https://github.com/Marcelektro/Discord-Yui_Remake)"
        });


        message.reply({embeds: [embedOld, embedRemake]})

    },
}
