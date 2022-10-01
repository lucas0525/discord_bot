const Discord = require('discord.js')
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loader/loadCommands")
const loadEvents = require("./Loader/loadEvents")
const config = require("./config")

bot.commands = new Discord.Collection()

bot.on("guildMemberAdd", member => {
    console.log("Un nouveau membre est arrivé")
    bot.channels.cache.get("1025813726126940250").send("Souhaiter la bienvenue à " + "<@" + member.id + "> qui a rejoint le serveur!")
    bot.channels.cache.get("1025813726126940250").send("https://media.discordapp.net/attachments/943136269964292096/979911740542320690/IMG_4319.gif");
    member.roles.add("1025279204268457984")
    member.send("Bonjour, bonsoir\nBienvenue sur le serveur communauter de lylou14!\nEn espérant que tu vas rester longtemp!")
});

bot.on("guildMemberRemove", member => {
    console.log("Un membre a quitté le serveur"),
    bot.channels.cache.get("1025813726126940250").send("Malheuresement " + member.displayName + " nous a quitté trop vite.")
})

bot.login(process.on.TOKEN)
loadCommands(bot)
loadEvents(bot)
