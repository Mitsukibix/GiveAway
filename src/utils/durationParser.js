const moment = require('moment');
require('moment-duration-format');
moment.locale('tr');

function parseTurkishDuration(durationStr) {
  const units = {
    'hafta': 'w',
    'gün': 'd',
    'saat': 'h',
    'dakika': 'm',
    'saniye': 's'
  };

  let msString = '';
  
  for (const [unit, shortUnit] of Object.entries(units)) {
    const regex = new RegExp(`(\\d+)\\s*${unit}`);
    const match = durationStr.match(regex);
    if (match) {
      msString += `${match[1]}${shortUnit} `;
    }
  }

  return msString.trim();
}

function formatDuration(ms) {
  return moment.duration(ms).format('D [gün] H [saat] m [dakika] s [saniye]');
}

module.exports = { parseTurkishDuration, formatDuration };