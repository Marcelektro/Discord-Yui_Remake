const { AttachmentBuilder } = require('discord.js');
const { request } = require('undici');
const Canvas = require('@napi-rs/canvas');
const { GlobalFonts } = require('@napi-rs/canvas');

// TODO: Find a better way of including fonts
// TODO: Make the font a little bit thinner
GlobalFonts.registerFromPath(`${__dirname}/../assets/fonts/DejaVuSans.ttf`, 'DejaVuSans')

module.exports = {
    name: 'top',
    description: 'View the money leaderboard for your server',
    async execute(message) {
        // Create a canvas
        const canvas = Canvas.createCanvas(400, 311);
        const ctx = canvas.getContext('2d');


        // Set the background of the image
        ctx.fillStyle = '#32363C';
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        // Get the server icon image
        const url = message.guild.iconURL({ extension: 'png', size: 128, forceStatic: true })
            // If the server has no icon, I don't know what Yui would do, so let's show bot's avatar :D
            || message.client.user.displayAvatarURL({ extension: 'png', size: 128, forceStatic: true });

        const { body } = await request(url);
        const avatar = await Canvas.loadImage(await body.arrayBuffer());

        // Draw the image
        ctx.drawImage(avatar, 8, 8, 100, 100);




        /// HEADER
        const headerStatic = {
            leftX: 145,
            rightX: 378,
            textsInitialY: 46,
            textsSpaceY: 20
        }

        // TODO: Dummy values
        const headerElements = [
            {name: "Your Rank:", value: "#1"},
            {name: "Server Profiles:", value: "3,710"},
            {name: "Server Worth:", value: "$1,337"}
        ]


        // Draw the title
        ctx.font = '20px DejaVuSans';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("- Server leaderboard -", headerStatic.leftX, 13 + 7);


        // Draw elements of the header

        // Prepare the font
        ctx.font = '16px DejaVuSans';
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = "middle";

        for (let i = 0; i < headerElements.length; i++) {

            // Draw the name of the element
            ctx.textAlign = "left";
            ctx.fillText(headerElements[i].name, headerStatic.leftX, headerStatic.textsInitialY + 6 + (i * headerStatic.textsSpaceY));

            // Draw the value of the element
            ctx.textAlign = "right";
            ctx.fillText(headerElements[i].value, headerStatic.rightX, headerStatic.textsInitialY + 6 + (i * headerStatic.textsSpaceY));

        }



        // Draw a horizontal line splitting the leaderboard entries and the header
        ctx.fillStyle = '#3273DC';
        ctx.fillRect(0, 116, canvas.width, 5);




        /// LEADERBOARD ENTRIES
        const entriesStatic = {
            initialY: 131, // Initial position of the first entry
            spaceY: 5, // Space between each entry
            height: 30, // Height of each entry (with rectangle)
            marginLeftRight: 10
        }

        // Draw 5 entries
        for (let i = 0; i < 5; i++) {

            // TODO: Dummy data
            const entryUser = {
                username: "Username Here",
                balance: 1337 - i*69
            }

            // (height of the rect + space between each rect) * entry index
            const distY = (entriesStatic.height + entriesStatic.spaceY) * i;

            // Draw the background rectangles behind each entry
            ctx.fillStyle = '#23262A';
            ctx.fillRect(
                entriesStatic.marginLeftRight, // Margin from the left
                entriesStatic.initialY + distY,
                canvas.width - entriesStatic.marginLeftRight * 2, // Margin from the right
                entriesStatic.height // Height of the entry background
            );

            // The Y position of current entry
            // Initial position of the first entry + ~half of the height of entry area + (height of bg rect + space between each) * entry index
            const textY = entriesStatic.initialY + 15 + distY;

            ctx.font = '16px DejaVuSans';
            ctx.fillStyle = '#fff';
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(`${i+1}.     ${entryUser.username}`, 24, textY);

            ctx.font = '16px DejaVuSans';
            ctx.fillStyle = '#3273DC';
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillText(`\$${entryUser.balance}`, 378, textY);
        }



        // Create the attachment
        const attachment = new AttachmentBuilder(await canvas.encode('png'), {name: 'top.png'});

        // Send the attachment to the channel
        message.channel.send({
            content: ":warning: | This feature will be implemented soon. This is just an example of the Leaderboard rendering.",
            files: [attachment]
        });

    },
};
