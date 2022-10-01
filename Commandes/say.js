const Discord = require('discord.js');

module.exports = {

    name: "say",
    description: "Envoyer un message avec le bot.",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    usage: "/say",
    dm: false,
    category: 'Administration',
    options: [
        {
            type: "string",
            name: "message",
            description: "Le message que le bot vas envoyer.",
            required: true,
            autocomplete: false
        },
    ],

    async run(bot, message, args) {

        let messages = args.getString('message')

        try{
            
            let SuccesEmbedBot = new Discord.EmbedBuilder()
                .setDescription(":white_check_mark: **Votre message a bien été envoyer!**")
                .setColor("Green")

            message.reply({embeds: [SuccesEmbedBot], ephemeral: true})
            await message.channel.send({content: `${messages}`})
        
        }catch(err) {console.log(err)}
    }
}