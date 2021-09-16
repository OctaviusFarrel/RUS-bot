require('dotenv').config();
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const { Client, Intents, MessageEmbed } = require("discord.js");

function embedMaker(title, description, url = "",) {
	return new MessageEmbed()
	.setTitle(title)
	.setDescription(description)
	.setColor('#0099ff')
	.setURL(url)
	.setThumbnail(client.user.avatarURL())
	.setFooter('Bot RUS');
}

const client = new Client(
	{
		intents:[
			Intents.FLAGS.GUILDS, 
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
			Intents.FLAGS.GUILD_VOICE_STATES]
		});

const botVoiceChannels = new Map();


client.once('ready', () => {
	console.log("I'm Ready");
	client.user.setPresence(
		{
			activities:[
				{
					name:"Bot RUS yang keren!",type:'COMPETING'
				}
			],
			status:'online'
		});
});

client.on('guildCreate', guild => {
	let embed = embedMaker("Terimakasih sudah menambahkanku!");
	guild.systemChannel.send({embeds: [embed]});
});

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
		switch (interaction.commandName) {
			case "ping":
				await interaction.reply("Pong!");
				break;
			case "invite":
				let embed = embedMaker(
					"Tambahkan Bot (Click di sini)", 
					"Perlu dipahami bahwa bot hanya bisa ditambahkan oleh pemilik bot, kontak OkutaJager#7771 untuk info lebih lanjut",
					"https://discord.com/api/oauth2/authorize?client_id=744547971353411585&permissions=8&scope=bot%20applications.commands")
				await interaction.reply({embeds:[embed],ephemeral:true})
			case "keluar":
				break;
			case "temenin":
				if (botVoiceChannels.get(interaction.guildId)) {
					await interaction.reply({content: "Saya sedang menemani seseorang di voice channel lain!", ephemeral: true});
					return;
				}
				const voiceChannel = interaction.member.voice.channel;
				if (voiceChannel) {
					const connection = joinVoiceChannel({
						channelId: voiceChannel.id,
						guildId: voiceChannel.guild.id,
						adapterCreator: voiceChannel.guild.voiceAdapterCreator,
						selfDeaf: false
					})
					botVoiceChannels.set(interaction.guildId, connection);
					await interaction.reply("Saya sudah join!");
				} else await interaction.reply({content: "Anda tidak di dalam voice channel!", ephemeral: true});
				break;
			default:
				console.error(`Invalid command: ${interaction.commandName}`);
		}
		
	}
});

client.login(process.env.CLIENT_TOKEN);
