const { Client, Intents, Collection } = require("discord.js");
const { prefix, token } = require("./config.json");

const bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MEMBERS"] });

bot.prefix = prefix;
bot.commands = new Collection();

bot.on("ready", () => require("./events/ready.js")(bot));
bot.on("messageCreate", (message) => require("./events/message")(message, bot));

bot.commands.set("help", require("./commands/help.js"));
bot.commands.set("astronauts", require("./commands/astronauts.js"));
bot.commands.set("launches", require("./commands/launches.js"));
bot.commands.set("apod", require("./commands/apod.js"));
bot.commands.set("iss", require("./commands/iss.js"));
bot.commands.set("tfr", require("./commands/tfr.js")); //$tfr command can be slow
bot.commands.set("setspacenews", require("./commands/setspacenews.js"));
bot.commands.set("unsetspacenews", require("./commands/unsetspacenews.js"));

bot.login(process.env.TOKEN);
