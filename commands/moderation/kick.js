const commando = require('discord.js-commando');

module.exports = class KickCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            aliases: ["k"],
            group: 'moderation',
            memberName: 'kick',
            description: 'Just a kick command :)',
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            guildOnly: true,
        });
    }

    async run(msg) {
        const member = msg.mentions.members.first();
        member.kick().then((kicked) => {
            // Successmessage
            msg.channel.send(":wave: " + kicked.displayName + " has been successfully kicked :point_right: ");
        });
}};