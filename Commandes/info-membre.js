const Discord = require("discord.js")
const { EmbedBuilder } = require("discord.js")
const { color } = require('../config')

module.exports = {

  name: "info-membre",
  description: "Afficher le nombre total de membre",
  permission: "Aucune",
  dm: false,
  category: 'Informations',

  async run(bot, message, args) {

    const EmbedMemberCount = new EmbedBuilder()
    .setColor(color)
    .addFields({ name: "Membres totaux :", value: `👥 ${message.guild.memberCount}`, inline: false })
    .addFields({ name: "Humain :", value: `👤 ${message.guild.members.cache.filter(member => !member.user.bot).size}`, inline: true })
    .addFields({ name: "Bot :", value: `🤖 ${message.guild.members.cache.filter(member => member.user.bot).size}`, inline: true })
    
    await message.reply({embeds: [EmbedMemberCount]})
  }}