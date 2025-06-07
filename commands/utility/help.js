const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with help information.'),
	async execute(interaction) {
		await interaction.reply(`Hi, ${interaction.user.username}. Currently I will listen to all messages, look for SLP files and upload them to slippilab.com.`);
	},
};
