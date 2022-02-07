module.exports = async (bot) => {

    console.log("bot ready");

    const Discord = require('discord.js');
    const fetch = require('node-fetch');
    const database = require('../db.js');

    bot.user.setActivity("$help");

    const client = database.client;
    const collection = await database.connectDb('guilds');

    async function checkArticleId() { // Return the current articleid stored in the database.
        const collection = await database.connectDb('dataFromApi');

        const cursor = collection.find();
        try {
            const dataArray = await cursor.toArray();
            return dataArray[0].articleid;
        } catch (err) {
            console.log(err);
        } finally {
            cursor.close();
        }
    }

    async function updateArticleId(id) { // Set the new articleid in database.
        const dataFromDb = await database.connectDb('dataFromApi');
        const currentArticleId = await checkArticleId();

        await dataFromDb.findOneAndUpdate({ articleid: currentArticleId }, { $set: { articleid: id } }).then(r => {
            console.log(`✅ new articleid updated ! (${id})\n`);
        })
    }

    async function getAllGuildsIds() { // Return an array of all Discord servers who subscribed to the Article News.
        const allGuilds = await collection;
        const cursor = collection.find();
        try {
            return await cursor.toArray();
        } catch (err) {
            console.log(err);
        } finally {
            cursor.close();
        }
    }

    async function checkIfNewArticle() {  // Fetch articles & check if there is a new one, if yes return the data (true) else return false.
        const data = await fetch('https://api.spaceflightnewsapi.net/v3/articles').then(r => r.json());
        const articleId = data[0].id;
        const currentArticleId = await checkArticleId();

        if (currentArticleId === articleId) { console.log('❌ there is no new article.\n'); return false };
        if (currentArticleId != articleId) {

            await updateArticleId(articleId);
            return data[0]; //return data (true) or false.
        }
    }

    async function sendTheArticleInAllChannels() { // If new article, post it in all subscribed Discord servers.
        const newarticle = await checkIfNewArticle();
        if (newarticle) {

            const guildsIds = await getAllGuildsIds();
            const embed = new Discord.MessageEmbed()
                .setTitle(newarticle.title)
                .setURL(newarticle.url)
                .setImage(newarticle.imageUrl)
                .setDescription(newarticle.summary)
                .setTimestamp();

            guildsIds.forEach(e => {
                const guildid = e.guildid;
                const channelid = e.channelid;
                const fetchedChannel = bot.channels.cache.get(channelid);
                
                fetchedChannel.send({ embeds: [embed] });
            });
        }
    }

    const interval = 30 * 1000;
    setInterval(() => {
        console.log('⏲️ every 5 minutes task loaded'); // Check every five minutes if there is an new article, and if it does, send it.
        const toto = bot.channels.cache.get('874302736806580265');
        toto.send("toto");
        //sendTheArticleInAllChannels();
    }, interval);

    setInterval(async function () {
        bot.user.setActivity('$help');
        setTimeout(() => {
            bot.user.setActivity('👉 https://roadtomars.page | Go check out this project 🚀');
        }, 6000);
    }, 12000);

}
