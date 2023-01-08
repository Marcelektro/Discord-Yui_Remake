const {EmbedBuilder} = require("discord.js");
const mediaUtil = require("../mediautil");

const MEDIA_URL = "https://api.github.com/repos/Marcelektro/Discord-Yui-Media_Remake/contents/images/catgirl";


function getRandomImage() {
    return mediaUtil.getRandomImageURL(MEDIA_URL);
}

// Fetch images
mediaUtil.fetchImageList(MEDIA_URL)
    .then(t => { console.log("Successfully fetched catgirl images!") })
    .catch(t => { console.error("Failed to fetch catgirl images!", t) })


module.exports = {
    name: 'catgirl',
    description: 'Posts a random image of a catgirl.',
    // TODO: Add aliases [catgirls, neko, nekos, nya, nyaa] like Yui used to have.
    category: 'Image',
    usage: {
        format: "y!catgirl"
    },
    async execute(message) {

        // Embed title
        const title = "\ud83d\udc31 **| Here's a kitty cat for you:**";

        // Get a random image
        const imgUrl = getRandomImage();

        const embed = new EmbedBuilder({
            description: title,
            color: message.guild.members.me.displayColor,
            image: {
                url: imgUrl
            }
        });


        message.channel.send({embeds: [embed]});
    },
}
