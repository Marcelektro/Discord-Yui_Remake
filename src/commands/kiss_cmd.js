const {EmbedBuilder} = require("discord.js");
const dbUtil = require("../dbutil");
const mediaUtil = require("../mediautil");

const MEDIA_URL = "https://api.github.com/repos/Marcelektro/Discord-Yui-Media_Remake/contents/images/kiss";


function getRandomImage() {
    return mediaUtil.getRandomImageURL(MEDIA_URL);
}

// Fetch images
mediaUtil.fetchImageList(MEDIA_URL)
    .then(t => { console.log("Successfully fetched kiss images!") })
    .catch(t => { console.error("Failed to fetch kiss images!", t) })


module.exports = {
    name: 'kiss',
    description: 'Give a big kiss to the member you tag!',
    category: 'Counter',
    usage: {
        format: "y!kiss <member>",
        examples: [
            { command: "y!kiss @member", functionality: "Gives a kiss to @member" }
        ]
    },
    async execute(message) {

        if (!message.mentions.users.size) {
            message.reply("You need to mention a user to give them a kiss!");
            return
        }

        // Get the mentioned user
        const user = message.mentions.users.first();


        const title = user.id === message.author.id ?
            `**${message.author.username}** kisses themselves...` :
            `**${message.author.username}** kisses **${user.username}**...`;


        // Get a random image
        const imgUrl = getRandomImage();


        // Update database
        const dbR = `userData.${message.author.id}.kissesFor.${user.id}`;
        const hugsCount = await dbUtil.incrementDb(dbR, 0, 1);


        let footer = hugsCount === 1 ?
            `Their first kiss from you!` :
            `That's ${hugsCount} kisses now!`;


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

