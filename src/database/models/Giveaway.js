const mongoose = require('mongoose');

const giveawaySchema = new mongoose.Schema({
  messageId: String,
  channelId: String,
  guildId: String,
  startAt: Number,
  endAt: Number,
  ended: Boolean,
  winnerCount: Number,
  prize: String,
  description: String,
  hostedBy: String,
  winners: Array,
  participants: Array
});

module.exports = mongoose.model('Giveaway', giveawaySchema);