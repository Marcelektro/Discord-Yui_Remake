const {request} = require("undici");


// key: URL to a folder with media files
// value: a list of URLs of files from that folder
const mediaUrlCache = new Map();


function updateCache(folderUrl, fileUrl) {
    const list = mediaUrlCache.get(folderUrl) || [];

    list.push(fileUrl);

    mediaUrlCache.set(folderUrl, list);
}

function getFromCache(folderUrl) {
    return mediaUrlCache.get(folderUrl) || [];
}


async function fetchImageList(url) {

    console.log(`Fetching media from ${url}...`)

    const { body } = await request(url, {
        headers: {
            'User-Agent': 'github.com/Marcelektro/Discord-Yui-Media_Remake'
        }
    });

    // Parse the response body as JSON
    const files = await body.json();

    files
        // .filter(file => file.name.endsWith('.gif'))
        .forEach(file => {
            updateCache(url, file.download_url);
        });

    console.log(`Loaded ${files.length} files from ${url}!`)
}

function getRandomImageURL(folderUrl) {
    const c = getFromCache(folderUrl);

    return c[Math.floor(Math.random() * c.length)];
}


module.exports = {
    fetchImageList,
    getRandomImageURL
}
