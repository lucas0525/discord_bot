const Discord = require("discord.js")

module.exports = {

    name: "help",
    description: "Permet d'avoir la liste des commandes.",
    permission: "Aucune",
    dm: true,
    category: 'Autres',
    options: [
        {
            type: "string",
            name: "commande",
            descriptions: "La commande a afficher",
            required: false,
        },
    ],

    
    async run(bot, message, args) {

        let command;
        if(args.getString("commande")) {
            command = bot.commands.get(args.getString("commande"));
            if(!command) return message.reply("Pas de commande!")
        }
        if(!command) {

            let categories = [];
            bot.commands.forEach(command => {
                if(!categories.includes(command.category)) categories.push(command.category)
            })

            let Embed = new Discord.EmbedBuilder()
            .setColor("DarkBlue")
            .setTitle('Commande du bot')
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Commandes disponibles: \`${bot.commands.size}\`\nCatégories disponibles: \`${categories.lenght}\``)
            .setTimestamp()
            .setFooter({text: "Commandes du bot"})

            await categories.sort().forEach(async cat => {

                let commands = bot.commands.filter(cmd => cmd.category === cat)
                Embed.addFields({name: `${cat}`, value: `${command.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
            })

            await message.reply({embeds: [Embed]})
        }
    }
    
}