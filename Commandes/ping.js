const Discord = require("discord.js")

module.exports = {

    name: "ping",
    description: "Permet d'afficher le ping.",
    permission: "Aucune",
    dm: true,
    category: 'Informations',

    
    async run(bot,message) {

        await message.reply(`Ping: \`${bot.ws.ping}\``)
    }
    
}

process.on('exit', code => {console.log(`Le processus s'est arreté avec le code: ${code}!`)});
process.on('uncaughtException', (err, origin) => { console.log(`UNCAUGHT_EXEPTION: ${err}`, `Origine: ${origin}`)});
process.on('unhandledRejection', (reason, promise) => { console.log(`UNHANDLED_REJECTION: ${reason}\n-----\n`, promise)});
process.on('warning', (...args) => console.log(...args));