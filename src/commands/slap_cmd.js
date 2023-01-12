const {EmbedBuilder} = require("discord.js");
const dbUtil = require("../dbutil");
const mediaUtil = require("../mediautil");

const MEDIA_URL = "https://api.github.com/repos/Marcelektro/Discord-Yui-Media_Remake/contents/images/slap";


function getRandomImage() {
    return mediaUtil.getRandomImageURL(MEDIA_URL);
}

// Fetch images
mediaUtil.fetchImageList(MEDIA_URL)
    .then(() => { console.log("Successfully fetched slap images!") })
    .catch(t => { console.error("Failed to fetch slap images!", t) })


module.exports = {
    name: 'slap',
    description: 'Slap somebody for whatever reason you would do that...',
    category: 'Counter',
    usage: {
        format: "y!slap <member>",
        examples: [
            { command: "y!slap @member", functionality: "Gives a slap to @member" }
        ]
    },
    async execute(message) {

        if (!message.mentions.users.size) {
            message.reply("You need to mention a user to give them a slap!");
            return
        }

        // Get the mentioned user
        const user = message.mentions.users.first();


        const title = user.id === message.author.id ?
            `**${message.author.username}** slaps themselves...` :
            `**${message.author.username}** slaps **${user.username}**...`;


        // Get a random image
        const imgUrl = getRandomImage();


        // Update database
        const dbR = `userData.${message.author.id}.slapsFor.${user.id}`;
        const slapsCount = await dbUtil.incrementDb(dbR, 0, 1);


        let footer = slapsCount === 1 ?
            `Their first slap from you!` :
            `That's ${slapsCount} slaps now!`;


        const embed = new EmbedBuilder({
            description: title,
            color: message.guild.members.me.displayColor,
            image: {
                url: imgUrl
            },
            footer: {text: footer}
        });


        message.channel.send({embeds: [embed]});
    },
}
