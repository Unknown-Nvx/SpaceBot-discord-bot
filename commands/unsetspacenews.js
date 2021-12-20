module.exports = async (message) => {

    console.log("unsetspacenews command loaded");

    if (!message.member.permissions.has('ADMINISTRATOR')) return;

    const Discord = require("discord.js");
    const database = require('../db.js');
    const client = database.client;
    const collection = await database.connectDb('guilds');

    const guildid = message.guild.id;

    async function guildIsInDb() {
        const guildData = await collection.findOne({ guildid: guildid });
        if (guildData) {
            return true;
        } else {
            return false;
        }
    }

    async function removeGuildFromDb() {
        const updateChannel = await collection.deleteOne({ guildid: guildid }).then(r => {
            message.reply(`channel successfully unset.`);
        })
    }


    try {
        const alreadyInDb = await guildIsInDb();

        if (!alreadyInDb) message.reply('you are not subscribed to Space News articles...');
        if (alreadyInDb) await removeGuildFromDb();

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}
