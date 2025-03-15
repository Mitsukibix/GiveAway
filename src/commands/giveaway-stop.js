const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { checkPermission } = require('../utils/checkPermission');
const db = require('croxydb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('çekiliş-durdur')
    .setDescription('🛑 Aktif bir çekilişi durdur'),

  async execute(interaction) {
    if (!await checkPermission(interaction)) {
      return interaction.reply({
        content: '❌ Bu komutu kullanmak için yeterli yetkiye sahip değilsiniz!',
        ephemeral: true
      });
    }

    const modal = new ModalBuilder()
      .setCustomId('giveaway-stop-modal')
      .setTitle('🛑 Çekilişi Durdur');

    const giveawayIdInput = new TextInputBuilder()
      .setCustomId('giveawayId')
      .setLabel("Çekiliş Mesajı'nın ID'sini Girin")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('Çekiliş Mesajı ID\'sini girin')
      .setRequired(true);

    const determineWinnersInput = new TextInputBuilder()
      .setCustomId('determineWinners')
      .setLabel('Kazanan Belirlensin mi? (evet/hayır)')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('evet veya hayır yazın')
      .setRequired(true);

    const firstRow = new ActionRowBuilder().addComponents(giveawayIdInput);
    const secondRow = new ActionRowBuilder().addComponents(determineWinnersInput);

    modal.addComponents(firstRow, secondRow);
    await interaction.showModal(modal);
  }
};