const Discord = require('discord.js');
const client = new Discord.Client();
const Guild = new Discord.Guild();
const prefix = process.env.prefix
const fs = require('fs');
const ProfilePicture = 'http://smkrus.sch.id/wp-content/uploads/2020/05/logo.png'
const CommandList = {
	"help":"menunjukkan list command",
	"invite":"menambahkan bot mu ke server lain",
	"pekora":"commit war crimes"
}
const ytdl = require('ytdl-core');

async function play(url) {
	const connection = await message.member.voice.channel.join();
	connection.play(await ytdl(url), { filter:'audioonly' });
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
				const EmbedInvite = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Klik link')
				.setURL('https://discord.com/api/oauth2/authorize?client_id=744547971353411585&scope=bot&permissions=8')
				.setTimestamp();
				message.channel.send(Embed);
				break;
			case "help":
				MsgLow = "";
				for (const [key,value] of Object.entries(CommandList)) {
					MsgLow = MsgLow.concat("`"+key+"` - "+value+"\n")
				}
				const EmbedHelp = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('List Perintah')
				.setDescription(MsgLow)
				.setTimestamp();
				message.channel.send(Embed);
				break;
			case "pekora":
				if (message.member.voice.channel) {
					play('https://www.youtube.com/watch?v=ZlAU_w7-Xp8')
				} else {
					message.reply('Join voice chat dlu goblok!');
				}
				break;
		}
	}
})

/*client.on('message', async message => {
	if (message.member.voice.channel) {
		if (message.content.toLowerCase() == "rus!pekora") {
			const connection = await message.member.voice.channel.join();
			connection.play(ytdl('https://www.youtube.com/watch?v=7dNrO7TSZdU', { filter: 'audioonly' }));
		}
	} else {
		message.reply('Join voice chat dlu goblok!');
	}*/
});

client.login(process.env.token);
