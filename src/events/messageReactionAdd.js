const { Events } = require('discord.js');
const db = require('croxydb');

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction, user) {
    if (user.bot) return;
    if (reaction.emoji.name !== '🎉') return;

    const message = reaction.message;
    const giveaways = db.get(`giveaways_${message.guildId}`) || [];
    const giveawayIndex = giveaways.findIndex(g => g.messageId === message.id && !g.ended);

    if (giveawayIndex === -1) return;

    if (!giveaways[giveawayIndex].participants.includes(user.id)) {
      giveaways[giveawayIndex].participants.push(user.id);
      db.set(`giveaways_${message.guildId}`, giveaways);
    }
  }
};