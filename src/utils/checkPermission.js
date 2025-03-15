async function checkPermission(interaction) {
  const adminRoleId = process.env.ADMIN_ROLE_ID;
  
  if (!adminRoleId) {
    console.error('❌ ADMIN_ROLE_ID is not set in .env file');
    return false;
  }

  const member = await interaction.guild.members.fetch(interaction.user.id);
  return member.roles.cache.has(adminRoleId);
}

module.exports = { checkPermission };