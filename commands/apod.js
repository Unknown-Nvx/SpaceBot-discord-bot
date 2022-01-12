module.exports = (message) => {

    console.log("apod command loaded");

    const Discord = require('discord.js');
    const fetch = require('node-fetch');
    const mapApiKey = process.env.MAP_API_KEY;

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${mapApiKey}`).then(res => res.json()).then(res => {

        const data = res;
        const embed = new Discord.MessageEmbed()
            .setColor('#9555D6')
            .setTitle(data.title)
            .setImage(data.hdurl)
            .setDescription(data.explanation)
            .setFooter({text: `@${data.copyright} ` + `| APOD: ${data.date}`});

        if (data.media_type === 'video') message.channel.send(data.url);

        message.channel.send({ embeds: [embed] });
    })
}
