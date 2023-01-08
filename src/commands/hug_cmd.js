const {EmbedBuilder} = require("discord.js");
const dbUtil = require("../dbutil");
const mediaUtil = require("../mediautil");

const MEDIA_URL = "https://api.github.com/repos/Marcelektro/Discord-Yui-Media_Remake/contents/images/hug";


function getRandomImage() {
    return mediaUtil.getRandomImageURL(MEDIA_URL);
}

// Fetch images
mediaUtil.fetchImageList(MEDIA_URL)
    .then(t => { console.log("Successfully fetched hug images!") })
    .catch(t => { console.error("Failed to fetch hug images!", t) })


module.exports = {
    name: 'hug',
    description: 'We all need a hug every now and then...',
    category: 'Counter',
    usage: {
        format: "y!hug <member>",
        examples: [
            { command: "y!hug @member", functionality: "Gives a hug to @member" }
        ]
    },
    async execute(message) {

        if (!message.mentions.users.size) {
            message.reply("You need to mention a user to give them a hug!");
            return
        }

        // Get the mentioned user
        const user = message.mentions.users.first();


        const title = user.id === message.author.id ?
            `**${message.author.username}** hugs themselves...` :
            `**${message.author.username}** hugs **${user.username}**...`;


        // Get a random image showing a hug
        const imgUrl = getRandomImage();


        // Update database
        const dbR = `userData.${message.author.id}.hugsFor.${user.id}`;
        const hugsCount = await dbUtil.incrementDb(dbR, 0, 1);


        let footer = hugsCount === 1 ?
            `Their first hug from you!` :
            `That's ${hugsCount} hugs now!`;


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

