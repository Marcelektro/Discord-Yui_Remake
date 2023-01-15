const {EmbedBuilder} = require("discord.js");
const mediaUtil = require("../mediautil");

const MEDIA_URL = "https://api.github.com/repos/Marcelektro/Discord-Yui-Media_Remake/contents/images/dance";


function getRandomImage() {
    return mediaUtil.getRandomImageURL(MEDIA_URL);
}

// Fetch images
mediaUtil.fetchImageList(MEDIA_URL)
    .then(() => { console.log("Successfully fetched dance images!") })
    .catch(t => { console.error("Failed to fetch dance images!", t) })


module.exports = {
    name: 'dance',
    description: 'Because dancing feels good?',
    category: 'Reaction',
    usage: {
        format: "y!dance"
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
