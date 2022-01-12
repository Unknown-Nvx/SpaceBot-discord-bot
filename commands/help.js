module.exports = (message) => {

    console.log("help command loaded");

    const Discord = require("discord.js");
    const isAdmin = message.member.permissions.has('ADMINISTRATOR');

    if (isAdmin) {
        const adminHelpEmbed = new Discord.MessageEmbed()
            .setColor('#5E6BDB')
            .setAuthor({name: '🔗 HELP (admin)'})
            .addField('👩‍🚀   $astronauts', '```astronauts in space right now```', false)
            .addField('🚀   $launches', '```Upcoming space flight```', false)
            .addField('🛰️   $iss', '```Check ISS stats and location```', false)
            .addField('🔭   $apod', '```NASA APOD (astronomy picture of the day)```', false)
            .addField('📄   $tfr', '```View Texas Space Operations TFR```', false)
            .addField('📌   $setspacenews (admin)', '```Space News articles will be posted in this channel```', false)
            .addField('⛔   $unsetspacenews (admin)', '```Unsubscribe from Space News```', false)
            .setFooter({text: 'developed by Unknown8#9125'});

        message.channel.send({ embeds: [adminHelpEmbed] });
    } else {
        const userHelpEmbed = new Discord.MessageEmbed()
            .setColor('#5E6BDB')
            .setAuthor({name: '🔗 HELP'})
            .addField('👩‍🚀   $astronauts', '```astronauts in space right now```', false)
            .addField('🚀   $launches', '```Upcoming space flight```', false)
            .addField('🛰️   $iss', '```Check ISS stats and location```', false)
            .addField('🔭   $apod', '```NASA APOD (astronomy picture of the day)```', false)
            .addField('📄   $tfr', '```View Texas Space Operations TFR```', false)
            .setFooter({text: 'developed by Unknown8#9125'});

        message.channel.send({ embeds: [userHelpEmbed] });
    }
}
