const {EmbedBuilder} = require("discord.js");
const mediaUtil = require("../mediautil");

const MEDIA_URL = "https://api.github.com/repos/Marcelektro/Discord-Yui-Media_Remake/contents/images/party";


function getRandomImage() {
    return mediaUtil.getRandomImageURL(MEDIA_URL);
}

// Fetch images
mediaUtil.fetchImageList(MEDIA_URL)
    .then(() => { console.log("Successfully fetched party images!") })
    .catch(t => { console.error("Failed to fetch party images!", t) })


module.exports = {
    name: 'party',
    description: 'When something is worth celebrating.',
    category: 'Reaction',
    usage: {
        format: "y!party"
    },
    async execute(message) {

        const imgUrl = getRandomImage();

        const embed = new EmbedBuilder({
            color: message.guild.members.me.displayColor,
            image: {
                url: imgUrl
            }
        });

        message.channel.send({embeds: [embed]});
    },
}
