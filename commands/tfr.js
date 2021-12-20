module.exports = async (message) => {

    console.log("tfr command loaded");

    const Discord = require('discord.js');
    const tfrs = require('@faa-aviation-data-portal/tfrs');

    function convertDate(date) {
        const datearray = date.split("/");
        return datearray[1] + '/' + datearray[0] + '/' + datearray[2];
    }

    tfrs.list().then(results => {

        const texasTfrs = results.filter(tfr => tfr.state == 'TX' && tfr.type == 'SPACE OPERATIONS');

        const embed = new Discord.MessageEmbed()
            .setTitle('TEXAS SPACE OPERATIONS TFR')
            .setColor('#F65C4A')
            .setURL('https://tfr.faa.gov/tfr2/list.jsp')
            .setThumbnail('https://www.freelogovectors.net/wp-content/uploads/2019/01/faa-logo.png');

        texasTfrs.forEach(e => {

            embed.addField(`${e.description}`, `\`📅 ${convertDate(e.date)}\``, true);
            embed.addField('```📄 NOTAM```', `[${e.notam}](${e.links.details})`, true);
            embed.addField('\u200B', '\u200B', true);

        });

        message.channel.send({ embeds: [embed] });
    })
}
