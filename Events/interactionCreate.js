const Discord = require("discord.js")
const transcript = require("discord-html-transcripts")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, SelectMenuBuilder } = require("discord.js")

module.exports = async (bot, interaction) => {

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {

      let command = require(`../Commandes/${interaction.commandName}`)
      command.run(bot, interaction, interaction.options)
    }

    if(interaction.isButton()) {
        if(interaction.customId === "close") {
          let EmbedPermissionClose = new EmbedBuilder()
          .setColor("#3dffcc")
          .setDescription(`❌ Vous n'avez pas la permission requise !`)
     
          if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionClose], ephemeral: true})
     
          let EmbedCloseTicket = new EmbedBuilder()
          .setColor("#3dffcc")
          .setDescription(`Êtes-vous sûr de vouloir fermer le ticket ?`)
          let Button = new ActionRowBuilder()
          .addComponents(new ButtonBuilder()
            .setCustomId('oui')
            .setLabel("Oui")
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setCustomId('non')
            .setLabel("Non")
            .setStyle(ButtonStyle.Danger),
          );
          await interaction.reply({embeds: [EmbedCloseTicket], components: [Button]});
        }
        else if(interaction.customId === "oui") {
          let EmbedPermissionClose = new EmbedBuilder()
          .setColor("#3dffcc")
          .setDescription(`❌ Vous n'avez pas la permission requise !`)
     
          if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionClose], ephemeral: true})
     
          interaction.channel.delete();
        }
        else if(interaction.customId === "non") {
          let EmbedPermissionClose = new EmbedBuilder()
          .setColor("#3dffcc")
          .setDescription(`❌ Vous n'avez pas la permission requise !`)
     
          if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionClose], ephemeral: true})
     
          interaction.message.delete()
        }
        else if(interaction.customId === "transcript") {
     
          let EmbedSendTranscript = new EmbedBuilder()
          .setColor("#3dffcc")
          .setDescription(`✅ Transcript envoyé avec succès !`)
          let EmbedTranscript = new EmbedBuilder()
          .setColor("#3dffcc")
          .setDescription(`📑 Transcript de ${interaction.message.embeds[0].description.split(" ")[0]}`)
          let EmbedPermissionTranscript = new EmbedBuilder()
          .setColor("#3dffcc")
          .setDescription(`❌ Vous n'avez pas la permission requise !`)
     
          if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionTranscript], ephemeral: true})
     
          await interaction.deferReply({ ephemeral: true })
          await bot.channels.cache.get("1025813847988256828").send( {embeds: [EmbedTranscript], files: [await transcript.createTranscript(interaction.channel)]})
          await interaction.editReply({embeds: [EmbedSendTranscript], ephemeral: true})
        }
      }
     
    if(interaction.isSelectMenu()) {
        if(interaction.customId === 'menuticket') {
          if(interaction.values == 'help') {
    const EmbedTicket1 = new EmbedBuilder()
            .setColor("#3dffcc")
            .setTitle(`Comment créer un ticket ?`)
            .setDescription(`Pour créer un ticket, il vous suffit juste de cliquer sur le menu déroulant ci-dessous et de sélectionner la catégorie qui convient le mieux à votre demande d'aide !\n- Pas de mentions sauf si vous n'avez pas reçu de réponse sous 24h.\n- Pas de spam.\n- Ne pas créer de ticket pour des trucs qui ne servent a rien.`)
            .setTimestamp()
            .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({dynamic: true}) });
     
            const RowTicket = new ActionRowBuilder()
                    .addComponents(
              new SelectMenuBuilder()
              .setCustomId('menuticket')
              .setPlaceholder('Sélectionner le type de ticket que vous voulez !')
              .addOptions(
                {
                  label: `Besoin d'aide`,
                  description: `Ouvrir un ticket pour obtenir de l'aide`,
                  emoji: `🙋‍♂️`,
                  value: `help`,
                },
                {
                  label: `Report un staff ou joueur`,
                  description: `Ouvrir un ticket pour report un staff ou un joueur`,
                  emoji: `📢`,
                  value: `report`,
                },
              ),
            );
            await interaction.deferUpdate();
            await interaction.editReply({embeds: [EmbedTicket1], components: [RowTicket]})
     
            let channel = await interaction.guild.channels.create({
            parent: "1025813667524124682",
            name: `help-${interaction.user.username} `,
            type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.roles.everyone,
                deny: [Discord.PermissionFlagsBits.ViewChannel],
              },
              {
                id: interaction.user,
                allow: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ViewChannel],
              },
            ],
            });
            let EmbedCreateChannel = new EmbedBuilder()
            .setColor("#3dffcc")
            .setTitle('Ticket ouvert')
            .setDescription("<@" + interaction.user.id + "> Voici votre ticket.\nExpliquez-nous en détail votre problème !")
            .setTimestamp()
            .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({dynamic: true}) });
            const Row = new ActionRowBuilder()
                  .addComponents(new ButtonBuilder()
              .setCustomId('close')
              .setLabel('Fermer le ticket')
              .setEmoji('🗑️')
              .setStyle(ButtonStyle.Danger),
              new ButtonBuilder()
              .setCustomId('transcript')
              .setLabel('Demander le transcript')
              .setEmoji('📑')
              .setStyle(ButtonStyle.Primary),
                );
     
     
            await channel.send({embeds: [EmbedCreateChannel], components: [Row]})
     
            const EmbedSuccessCreateChannel = new EmbedBuilder()
              .setColor("#3dffcc")
              .setDescription(`✅ Votre salon a été créé avec succès ${channel} !`)
     
            await interaction.followUp({embeds: [EmbedSuccessCreateChannel], ephemeral: true})
          }
          if(interaction.values == 'report') {
            const EmbedTicket1 = new EmbedBuilder()
                    .setColor("#3dffcc")
                    .setTitle(`Comment créer un ticket ?`)
                    .setDescription(`Pour créer un ticket, il vous suffit juste de cliquer sur le menu déroulant ci-dessous et de sélectionner la catégorie qui convient le mieux à votre demande d'aide !\n- Pas de mentions sauf si vous n'avez pas reçu de réponse sous 24h.\n- Pas de spam.\n- Ne pas créer de ticket pour des trucs qui ne servent a rien.`)
                    .setTimestamp()
                    .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({dynamic: true}) });
             
                    const RowTicket = new ActionRowBuilder()
                            .addComponents(
                      new SelectMenuBuilder()
                      .setCustomId('menuticket')
                      .setPlaceholder('Sélectionner le type de ticket que vous voulez !')
                      .addOptions(
                        {
                          label: `Besoin d'aide`,
                          description: `Ouvrir un ticket pour obtenir de l'aide`,
                          emoji: `🙋‍♂️`,
                          value: `help`,
                        },
                        {
                          label: `Report un staff ou joueur`,
                          description: `Ouvrir un ticket pour report un staff ou un joueur`,
                          emoji: `📢`,
                          value: `report`,
                        },
                      ),
                    );
                    await interaction.deferUpdate();
                    await interaction.editReply({embeds: [EmbedTicket1], components: [RowTicket]})
             
                    let channel = await interaction.guild.channels.create({
                    parent: "1025813667524124682",
                    name: `report-${interaction.user.username} `,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                      {
                        id: interaction.guild.roles.everyone,
                        deny: [Discord.PermissionFlagsBits.ViewChannel],
                      },
                      {
                        id: interaction.user,
                        allow: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ViewChannel],
                      },
                    ],
                    });
                    let EmbedCreateChannel = new EmbedBuilder()
                    .setColor("#3dffcc")
                    .setTitle('Ticket ouvert')
                    .setDescription("<@" + interaction.user.id + "> Voici votre ticket.\nExpliquez-nous en détail votre problème !")
                    .setTimestamp()
                    .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({dynamic: true}) });
                    const Row = new ActionRowBuilder()
                          .addComponents(new ButtonBuilder()
                      .setCustomId('close')
                      .setLabel('Fermer le ticket')
                      .setEmoji('🗑️')
                      .setStyle(ButtonStyle.Danger),
                      new ButtonBuilder()
                      .setCustomId('transcript')
                      .setLabel('Demander le transcript')
                      .setEmoji('📑')
                      .setStyle(ButtonStyle.Primary),
                        );
             
             
                    await channel.send({embeds: [EmbedCreateChannel], components: [Row]})
             
                    const EmbedSuccessCreateChannel = new EmbedBuilder()
                      .setColor("#3dffcc")
                      .setDescription(`✅ Votre salon a été créé avec succès ${channel} !`)
             
                    await interaction.followUp({embeds: [EmbedSuccessCreateChannel], ephemeral: true})
          }
        }
}};
 

process.on('exit', code => {console.log(`Le processus s'est arreté avec le code: ${code}!`)});
process.on('uncaughtException', (err, origin) => { console.log(`UNCAUGHT_EXEPTION: ${err}`, `Origine: ${origin}`)});
process.on('unhandledRejection', (reason, promise) => { console.log(`UNHANDLED_REJECTION: ${reason}\n-----\n`, promise)});
process.on('warning', (...args) => console.log(...args));