const Discord = require('discord.js');
const client = new Discord.Client();
const Guild = new Discord.Guild();
const prefix = process.env.prefix
const fs = require('fs');
const ProfilePicture = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsmkrus.sch.id%2F&psig=AOvVaw1NuV5V0j0Yyb6ESu2IgGKM&ust=1597672732119000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPDboO7wn-sCFQAAAAAdAAAAABAD'
const CommandList = {
	"help":"menunjukkan list command",
	"invite":"menambahkan bot mu ke server lain",
	"pekora":"commit war crimes"
}
const ytdl = require('ytdl-core');

async function play(connection, url) {
	connection.play(await ytdl(url), { type: 'opus' });
}

client.on('ready', () => {
  client.user.setAvatar(ProfilePicture).catch(err => console.log(err));
  client.user.setStatus('online', "auk-?")
  client.user.setPresence({
        game: {
            name: 'rus!help',
        }
    });
  console.log('I am ready!');
});

client.on('message', message => {
	var MsgLow = message.content.toLowerCase();
	if (MsgLow.startsWith(prefix)) {
		MsgLow = MsgLow.slice(4)
		console.log(MsgLow)
		switch (MsgLow) {
			case "invite":
				const Embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Klik link')
				.setURL('https://discord.com/api/oauth2/authorize?client_id=744547971353411585&scope=bot&permissions=8')
				.setTimestamp();
				message.channel.send(Embed);
				break;
			case "help":
				
				break;
			/*case "pekora":
				if (message.member.voice.channel) {
					const connection = message.member.voice.channel.join();
					const dispatcher = connection.play('https://www.youtube.com/watch?v=ZlAU_w7-Xp8');
					dispatcher.on('error', console.error);
				} else {
					message.reply('Join voice chat dlu goblok!');
				}
				break;*/
		}
	}
})

client.on('message', async message => {
	if (message.member.voice.channel) {
		if (message.content.toLowerCase() == "rus!pekora") {
			const connection = await message.member.voice.channel.join();
			connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { filter: 'audioonly' }));
		}
	} else {
		message.reply('Join voice chat dlu goblok!');
	}
});

client.login(process.env.token);
