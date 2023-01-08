
// List of all categories the commands can be in, and the corresponding icon of each one.
const commandCategories = [
    {
        name: "Moderation", icon: "\ud83d\udee1"
    },
    {
        name: "Automation", icon: "\ud83e\udd16"
    },
    {
        name: "Features", icon: "\ud83d\udc8e"
    },
    {
        name: "Permissions", icon: "\ud83d\udd12"
    },
    {
        name: "Search", icon: "\ud83d\udd0e"
    },
    {
        name: "Utility", icon: "\ud83d\udd27"
    },
    {
        name: "Information", icon: "\u2139"
    },
    {
        name: "Fun", icon: "\ud83d\ude0f"
    },
    {
        name: "Economy", icon: "\ud83d\udcb0"
    },
    {
        name: "Gambling", icon: "\ud83c\udfb2"
    },
    {
        name: "Profile", icon: "\ud83d\ude03"
    },
    {
        name: "Skills", icon: "\u2692"
    },
    {
        name: "Image", icon: "\ud83d\uddbc"
    },
    {
        name: "Reaction", icon: "\ud83d\udc99"
    },
    {
        name: "Counter", icon: "\ud83d\udcc8"
    },
    {
        name: "Ship", icon: "\u26f5"
    }
];

module.exports = {

    getCommandCategories() {
        return commandCategories;
    },

    hasCategory(name) {
        return commandCategories.some(category => category.name === name);
    },

    hasCategoryIgnoreCase(name) {
        return commandCategories.some(cat => cat.name.toLowerCase() === name.toLowerCase());
    }

}

