const { EmbedBuilder } = require('discord.js');

async function sendLog(client, type, data) {
  const logChannelId = process.env.LOG_CHANNEL_ID;
  
  if (!logChannelId) {
    console.error('❌ LOG_CHANNEL_ID is not set in .env file');
    return;
  }

  const logChannel = await client.channels.fetch(logChannelId);
  if (!logChannel) return;

  const logEmbed = new EmbedBuilder()
    .setColor('#2F3136')
    .setTimestamp();

  switch (type) {
    case 'giveawayStart':
      logEmbed
        .setTitle('📝 Çekiliş Başlatıldı')
        .setDescription(`**Çekilişi Başlatan:** <@${data.hostedBy}>\n**Ödül:** ${data.prize}`)
        .addFields(
          { name: '🎁 Kazanan Sayısı', value: data.winnerCount.toString(), inline: true },
          { name: '⏰ Süre', value: `<t:${Math.floor(data.endAt / 1000)}:R>`, inline: true },
          { name: '📝 Açıklama', value: data.description },
          { name: '🆔 Çekiliş ID', value: data.messageId }
        );
      break;
    
    case 'giveawayEnd':
      logEmbed
        .setTitle('🏁 Çekiliş Sonlandırıldı')
        .setDescription(`**Çekilişi Sonlandıran:** <@${data.endedBy}>\n**Ödül:** ${data.prize}`)
        .addFields(
          { name: '👥 Toplam Katılımcı', value: data.participants.length.toString(), inline: true },
          { name: '👑 Kazananlar', value: data.winners.length > 0 ? data.winners.map(w => `<@${w}>`).join(', ') : 'Kazanan Yok', inline: true },
          { name: '🆔 Çekiliş ID', value: data.messageId }
        );
      break;
  }

  await logChannel.send({ embeds: [logEmbed] });
}

module.exports = { sendLog };