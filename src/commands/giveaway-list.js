const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { checkPermission } = require('../utils/checkPermission');
const db = require('croxydb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('çekiliş-list')
    .setDescription('📋 Aktif çekilişleri listele'),

  async execute(interaction) {
    if (!await checkPermission(interaction)) {
      return interaction.reply({
        content: '❌ Bu komutu kullanmak için yeterli yetkiye sahip değilsiniz!',
        ephemeral: true
      });
    }

    try {
      const giveaways = db.get(`giveaways_${interaction.guildId}`) || [];
      const activeGiveaways = giveaways.filter(g => !g.ended);

      if (activeGiveaways.length === 0) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#FF0000')
              .setTitle('❌ Aktif Çekiliş Yok')
              .setDescription('Şu anda aktif çekiliş bulunmuyor!')
          ],
          ephemeral: true
        });
      }

      const embed = new EmbedBuilder()
        .setTitle('🎉 Aktif Çekilişler')
        .setColor('#FF69B4')
        .setDescription(
          activeGiveaways.map(g => {
            const winRate = ((g.winnerCount / (interaction.guild.memberCount - 1)) * 100).toFixed(2);
            return `**🎁 Ödül:** ${g.prize}\n` +
              `**⏰ Bitiş:** <t:${Math.floor(g.endAt / 1000)}:R>\n` +
              `**👥 Katılımcı:** ${g.participants.length}\n` +
              `**🎯 Kazanan Sayısı:** ${g.winnerCount}\n` +
              `**📊 Kazanma Oranı:** ${winRate}%\n` +
              `**📝 Açıklama:** ${g.description}\n` +
              `**🆔 ID:** \`${g.messageId}\`\n\n`;
          }).join('---\n')
        )
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Çekiliş listeleme hatası:', error);
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('❌ Hata')
            .setDescription('Çekilişler listelenirken bir hata oluştu!')
        ],
        ephemeral: true
      });
    }
  }
};