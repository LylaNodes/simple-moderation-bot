const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class CreditsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'credits',
            group: 'misc',
            memberName: 'credits',
            description: 'Displays Bot Developer(s) and such',
            details: oneLine`
                Displays bot Developer(s) and such.
            `,
            examples: ['credits'],
        })
    }

    async run(msg) {
        if (msg.author.bot) return;
        let { MessageEmbed } = require('discord.js')
        let embed = new MessageEmbed()
        .setTitle("Bot Credits")
        .setDescription("This, bot is made by the LylaNodes Team.")
        .setFooter("Bot is made with 💖 and ☕")
        .setColor("AQUA")
        msg.channel.send(embed)
    }
}
