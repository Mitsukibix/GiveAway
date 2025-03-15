const { Events } = require('discord.js');
const db = require('croxydb');

module.exports = {
  name: Events.MessageReactionRemove,
  async execute(reaction, user) {
    if (user.bot) return;
    if (reaction.emoji.name !== '🎉') return;

    const message = reaction.message;
    const giveaways = db.get(`giveaways_${message.guildId}`) || [];
    const giveawayIndex = giveaways.findIndex(g => g.messageId === message.id && !g.ended);

    if (giveawayIndex === -1) return;

    giveaways[giveawayIndex].participants = giveaways[giveawayIndex].participants.filter(id => id !== user.id);
    db.set(`giveaways_${message.guildId}`, giveaways);
  }
};