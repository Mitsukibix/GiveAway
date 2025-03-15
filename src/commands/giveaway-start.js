const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { checkPermission } = require('../utils/checkPermission');
const db = require('croxydb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('çekiliş-başlat')
    .setDescription('🎉 Yeni bir çekiliş başlat'),

  async execute(interaction) {
    if (!await checkPermission(interaction)) {
      return interaction.reply({
        content: '❌ Bu komutu kullanmak için yeterli yetkiye sahip değilsiniz!',
        ephemeral: true
      });
    }

    const modal = new ModalBuilder()
      .setCustomId('giveaway-modal')
      .setTitle('🎉 Yeni Çekiliş');

    const prizeInput = new TextInputBuilder()
      .setCustomId('prize')
      .setLabel('🎁 Çekiliş Ödülü')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const winnersInput = new TextInputBuilder()
      .setCustomId('winners')
      .setLabel('👥 Kazanan Sayısı')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const durationInput = new TextInputBuilder()
      .setCustomId('duration')
      .setLabel('⏰ Süre (1h, 1d, 1w)')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const descriptionInput = new TextInputBuilder()
      .setCustomId('description')
      .setLabel('📝 Çekiliş Açıklaması')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const rows = [
      new ActionRowBuilder().addComponents(prizeInput),
      new ActionRowBuilder().addComponents(winnersInput),
      new ActionRowBuilder().addComponents(durationInput),
      new ActionRowBuilder().addComponents(descriptionInput),
    ];

    modal.addComponents(rows);
    await interaction.showModal(modal);
  }
};