const Discord = require('discord.js');
const client = new Discord.Client();
const Guild = new Discord.Guild();
const prefix = process.env.prefix
const fs = require('fs');
const ProfilePicture = 'http://smkrus.sch.id/wp-content/uploads/2020/05/logo.png'
const CommandList = {
	"help":"menunjukkan list command",
	"invite":"menambahkan bot mu ke server lain",
	"pekora":"commit war crimes",
	"info":"info seputar bot"
}
const ytdl = require('ytdl-core');

async function play(url, message) {
	const connection = await message.member.voice.channel.join();
	connection.play(await ytdl(url), { filter:'audioonly' });
}

client.on('ready', () => {
	client.user.setStatus('online', "auk-?")
	client.user.setPresence({
        game: {
            name: 'rus!help',
        }
    });
  client.user.setAvatar(ProfilePicture).catch(err => console.log(err));
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
				message.channel.send(EmbedInvite);
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
				message.channel.send(EmbedHelp);
				break;
			case "pekora":
				if (message.member.voice.channel) {
					play('https://www.youtube.com/watch?v=7dNrO7TSZdU',message)
				} else {
					message.reply('Join voice chat dlu goblok!');
				}
				break;
			/*case "play":
			case "p":
				var
				if (message.member.voice.channel) {
					play('https://www.youtube.com/watch?v=7dNrO7TSZdU',message)
				} else {
					message.reply('Join voice chat dlu goblok!');
				}
				break;*/
			case "info":
				message.channel.send("`Version 1.0.0\nAuthor OkutaJager\nCondition Unstable\nMay crash anytime`")
				break;
			case "dc":
			case "disconnect":
			case "leave":
				asnyc stop() {
					if(!message.guild.voiceConnection) return;
					let userVoiceChannel = message.member.voiceChannel;
					if (!userVoiceChannel) return;
					let clientVoiceConnection = message.guild.voiceConnection;
					if (userVoiceChannel === clientVoiceConnection.channel) {
						if (message.member.hasPermission('ADMINISTRATOR')) {
							clientVoiceConnection.disconnect();
							message.channel.send('Siap bang admin');
						} else if (message.member.roles.cache.some("DJ")) {
							clientVoiceConnection.disconnect();
							message.channel.send('Siap bang DJ');
						} else message.reply("ngemis mod dlu sana ato ngemis DJ dlu");
						
					} else message.reply('masuk voice chat nya dulu napa ?');
				}
				break;
			default:
				message.channel.send("pake rus!help dlu sana")
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
	}
});*/

client.login(process.env.token);
