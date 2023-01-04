const main = require('./index');

module.exports = {

    async incrementDb(dbPath, defaultValue, incrementValue) {
        const has = await main.getDatabase().has(dbPath);

        if (has) {
            // I know I can use .add, but I chose to do it this way :D
            // Mainly because I'm new to coding 🤔
            const value = await main.getDatabase().get(dbPath) + incrementValue;

            await main.getDatabase().set(dbPath, value);

            return value
        }


        const value = defaultValue + incrementValue;

        await main.getDatabase().set(dbPath, value);

        return value;
    }

}
