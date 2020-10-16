const { Command } = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const { MessageEmbed } = require('discord.js');
module.exports = class CreditsCommand extends Command {
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
        });
    }

    async run(msg) {
        const embed = new MessageEmbed()
        .setTitle("Bot Credits")
        .setDescription("Blizzard is created by CollierDevs#2407")
        .setFooter("Blizzard is made with 💖 and ☕")
        .setColor("AQUA");
        msg.channel.send(embed);
    }
};