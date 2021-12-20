module.exports = async (message) => {

    console.log("setspacenews command loaded");

    if (!message.member.permissions.has('ADMINISTRATOR')) return;

    const database = require('../db.js');
    const client = database.client;
    const collection = await database.connectDb('guilds');

    const guildid = message.guild.id;
    const channelid = message.channel.id;
    const guildName = message.guild.name;
    const guildSize = message.guild.memberCount;

    async function guildIsInDb() {
        const guildData = await collection.findOne({ guildid: guildid });
        if (guildData) {
            if (guildData.channelid != channelid) { await changeChannelId(); return 'updated' }
            return true;
        } else {
            return false;
        }
    }

    async function changeChannelId() {
        const updateChannel = await collection.findOneAndUpdate({ guildid: guildid }, { $set: { channelid: channelid } }).then(r => {
            message.reply(`The new <#${channelid}> channel has been updated successfully`);
        })
    }

    async function addGuildinDb() {
        const insertGuildId = await collection.insertOne({ guildid: guildid, guild_name: guildName, guild_size: guildSize, channelid: channelid }).then(r => {
            message.reply(`<#${channelid}> channel has been set successfully, space news articles will be posted in this channel.`);
        })
    }

    try {
        const alreadyInDb = await guildIsInDb();

        if (alreadyInDb === 'updated') return;
        if (alreadyInDb) message.reply('you have already subscribed to Space News articles.');
        if (!alreadyInDb) await addGuildinDb();

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }


}
