module.exports = (message) => {

    console.log("astronauts command loaded");

    const Discord = require('discord.js');
    const fetch = require('node-fetch');

    fetch('http://api.open-notify.org/astros.json').then(res => res.json()).then(res => {

        const data = res.people;
        const embed = new Discord.MessageEmbed().setColor('#4FA3E8').setTitle('```Astronauts in space```');

        data.forEach(e => {

            embed.addField(`👨‍🚀 ${e.name}`, '*craft:* `' + e.craft + '`');
        });

        message.channel.send({ embeds: [embed] });
    })
}
