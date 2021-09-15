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


console.log(process.env.CLIENT_TOKEN);
client.login(process.env.CLIENT_TOKEN);
