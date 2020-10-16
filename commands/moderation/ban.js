const commando = require('discord.js-commando');

module.exports = class BanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'moderation',
            memberName: 'ban',
            description: 'Just a ban command :)',
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            guildOnly: true,
        });
    }

    async run(msg) {
        const member = msg.mentions.members.first();
        member.ban().then((banned) => {
            msg.channel.send(":wave: " + banned.displayName + " has been successfully Banned :point_right: ");
        });
}};