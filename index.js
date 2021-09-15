require('dotenv').config();
const { Client, Intents, MessageEmbed } = require("discord.js");


const client = new Client(
	{
		intents:[
			Intents.FLAGS.GUILDS, 
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
		});

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
	let embed = new MessageEmbed()
	.setTitle("Terimakasih sudah menambahkanku!")
	.setColor('#0099ff')
	.setFooter('Bot RUS');
	guild.systemChannel.send({embeds: [embed]});
});

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
		switch (interaction.commandName) {
			case "ping":
				await interaction.reply("Pong!");
				break;
			case "invite":
				let embed = new MessageEmbed()
				.setTitle("Tambahkan Bot (Click di sini)")
				.setURL("https://discord.com/api/oauth2/authorize?client_id=744547971353411585&permissions=8&scope=bot%20applications.commands")
				.setDescription("Untuk dipahami bahwa bot hanya bisa ditambahkan oleh pemilik bot, kontak OkutaJager#7771 untuk info lebih lanjut")
				.setFooter("Bot RUS");
				await interaction.reply({embeds:[embed],ephemeral:true})
			case "temenin":
				if (interaction.member.voice) {
					console.log("inside!");
				} else await interaction.reply({content: "Anda tidak di dalam voice channel!", ephemeral: true});
				break;
			default:
				console.error(`Invalid command: ${interaction.commandName}`);
		}
		
	}
});

client.login(process.env.CLIENT_TOKEN);
