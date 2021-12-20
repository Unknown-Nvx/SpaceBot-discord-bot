module.exports = (message) => {

    console.log("iss command loaded");

    const Discord = require('discord.js');
    const fetch = require('node-fetch');

    fetch('https://api.wheretheiss.at/v1/satellites/25544').then(res => res.json()).then(res => {

        const data = res;
        const api_key = 'AIzaSyCx2avU_rmce0i-kBq56zhCS-RgUr43z5s';
        const icon = 'https://cdn.discordapp.com/attachments/393067783979532290/863794019771613204/iss.png';
        const lat = data.latitude;
        const long = data.longitude;

        const embed = new Discord.MessageEmbed()
            .setColor('#4FA3E8')
            .setTitle('```🛰️ TRACKER```')
            .setURL('https://isstracker.spaceflight.esa.int/')
            .setImage(`http://maps.googleapis.com/maps/api/staticmap?&maptype=satellite&zoom=3&size=600x400&markers=icon:${icon}|${lat},${long}&key=${api_key}`)
            .addField('altitude', `\`${Math.round(data.altitude)} km\``, true)
            .addField('speed', `\`${Math.round(data.velocity)} km/h\``, true)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    })
}
