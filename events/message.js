module.exports = (message, bot) => {

    if (!message.content.startsWith(bot.prefix) || message.author.bot) return;

    const args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (bot.commands.has(command)) bot.commands.get(command)(message, bot, args);

}
