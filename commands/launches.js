module.exports = (message) => {

    console.log("launches command loaded");

    const Discord = require('discord.js');
    const fetch = require('node-fetch');

    fetch('https://fdo.rocketlaunch.live/json/launches/next/5').then(res => res.json()).then(res => {

        const data = res.result;
        const embed = new Discord.MessageEmbed().setColor('#4FA3E8');

        data.forEach((e, i) => {

            embed.addField(`#${i + 1} - ${e.name}`, `\`🚀 ${e.provider.name}\`` + ' - ' + `\`📅 ${e.date_str}\`` + ' - ' + `\`🗺️ ${e.pad.location.name}\``);
        });

        message.channel.send({ embeds: [embed] });
    })
}
