const commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = class HelpCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'misc',
            memberName: 'help',
            description: 'Displays a list of available commands.',
            examples: ['help'],
        });
    }

    async run(msg) {
        if (msg.author.bot) return;

        const commandsDir = path.join(__dirname, './commands');
        const categories = fs.readdirSync(commandsDir);

        const embed = new MessageEmbed()
            .setTitle('Help Menu')
            .setDescription('Select a command from the dropdown menu to get more information.')
            .setColor('AQUA')
            .setFooter('Use the reactions to navigate the help menu.');

        let emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
        let i = 0;
        const commandMap = new Map();

        for (const category of categories) {
            const categoryPath = path.join(commandsDir, category);
            const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const CommandClass = require(path.join(categoryPath, file));
                const commandInstance = new CommandClass(this.client);
                const emoji = emojis[i++];
                embed.addField(`${emoji} ${commandInstance.name}`, commandInstance.description);
                commandMap.set(emoji, commandInstance);

                if (i >= emojis.length) i = 0; // Reset emoji counter if it exceeds available emojis
            }
        }

        const initialMessage = await msg.channel.send(embed);

        for (const emoji of commandMap.keys()) {
            await initialMessage.react(emoji);
        }

        const filter = (reaction, user) => commandMap.has(reaction.emoji.name) && user.id === msg.author.id;
        const collector = initialMessage.createReactionCollector(filter, { time: 60000 });

        collector.on('collect', (reaction) => {
            const cmd = commandMap.get(reaction.emoji.name);
            const cmdEmbed = new MessageEmbed()
                .setTitle(`Command: ${cmd.name}`)
                .setDescription(cmd.description)
                .addField('Details', cmd.details || 'No details provided.')
                .addField('Examples', cmd.examples.join('\n') || 'No examples provided.')
                .setColor('AQUA');

            initialMessage.edit(cmdEmbed);
            reaction.users.remove(msg.author.id);
        });

        collector.on('end', () => {
            initialMessage.reactions.removeAll();
        });
    }
};
