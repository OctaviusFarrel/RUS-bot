const Discord = require('discord.js');
const client = new Discord.Client();
const Guild = new Discord.Guild();
const prefix = process.env.prefix
const fs = require('fs');
const ProfilePicture = 'http://smkrus.sch.id/wp-content/uploads/2020/05/logo.png'
const myid = parseInt(process.env.token,10)
const CommandList = {
	"help":"Menunjukan list command",
	"invite":"Menambahkan bot mu ke server lain",
	"pekora":"Commit war crimes",
	"info":"Info seputar bot",
	"disconnect":"Membuat Bot keluar dari voice channel",
	"play":"Coming soon"
}
const ytdl = require('ytdl-core');

async function play(url, message) {
	const connection = await message.member.voice.channel.join();
	connection.play(await ytdl(url), { filter:'audioonly' });
}

async function report(message,myid,response) {
	var myuser = await client.users.fetch(myid);
	console.log(myid);
	console.log(myuser);
	message[myuser].send(response);
}

async function stop(message) {
	if (!message.guild) return;
	let userVoiceChannel = message.member.voice;
	if (!userVoiceChannel) return;
	let clientVoiceConnection = message.guild.voice;
	if (clientVoiceConnection == undefined) {
		message.reply("aku tidak di dalam voice channel apapun :)");
		return;
	}
	if (userVoiceChannel.channel === clientVoiceConnection.channel) {
		if (message.member.hasPermission('MANAGE_CHANNEL')) {
			clientVoiceConnection.channel.leave();
			message.channel.send('Siap bang admin');
		} else if (message.member.roles.name("DJ")) {
			clientVoiceConnection.channel.leave();
			message.channel.send('Siap bang DJ');
		} else message.reply("ngemis mod dlu sana ato ngemis DJ dlu");
	} else message.reply('masuk voice chat nya dulu napa ?');

}

client.on('ready', () => {
	client.user.setPresence({
		status:'online',
        	activity: {
			name:'rus!help',
			type:'STREAMING',
			url:'https://smkrus.sch.id/'
        	}
    	});
	client.user.setAvatar(ProfilePicture).catch(err => console.log(err));
	console.log('I am ready!');
});

client.on('message', message => {
	var MsgLow = message.content.toLowerCase();
	if (MsgLow.startsWith(prefix)) {
		MsgLow = MsgLow.slice(4)
		if (MsgLow == 'invite') {
			const EmbedInvite = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Klik link')
				.setURL('https://discord.com/api/oauth2/authorize?client_id=744547971353411585&scope=bot&permissions=8')
				.setTimestamp();
			message.channel.send(EmbedInvite);
		} else if (MsgLow == 'help') {
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
		} else if (MsgLow == "pekora") {
			if (message.member.voice.channel) {
				play('https://www.youtube.com/watch?v=7dNrO7TSZdU',message)
			} else {
				message.reply('Join voice chat dlu goblok!');
			}
		} else if (MsgLow == 'dc'||MsgLow == 'disconnect'||MsgLow == 'leave') {
			stop(message);
		} else if (MsgLow == "info") {
			message.channel.send("`Version : 1.0.1\nAuthor : OkutaJager\nCondition : Unstable\nMay crash anytime`");
		} else if (MsgLow.includes("ban")) {
			if (message.member.hasPermission('BAN_MEMBERS')) {
				if (message.mentions.users.first() === undefined) {
					message.channel.send("Mau ngeban setan ?");
					return;
				}
				var banData = MsgLow.split(" ");
				banData = banData.slice(2);
				var banReason = "";
				for (var word in banData) {
				banReason = banReason.concat(banData[word]+" ");
				}
				var userBan = message.guild.member(message.mentions.users.first());
				userBan.ban({days:0,banReason})
				.then(message.channel.send("RIP "+message.mention.users.first().tag))
				.catch(console.error)
			} else message.channel.send("KAMU TIDAK BERKUASA!");
		} else if (MsgLow.includes("kick")) {
			if (message.member.hasPermission('KICK_MEMBERS')) {
				if (message.mentions.users.first() === undefined) {
					message.channel.send("Mau ngekick setan ?")
					return;
				}
				var kickData = MsgLow.split(" ");
				kickData = kickData.slice(2);
				var kickReason = "";
				for (var word in kickData) {
				kickReason = kickReason.concat(kickData[word]+" ");
				}
				var userKick = message.guild.member(message.mentions.users.first());
				userKick.kick(kickReason);
			} else message.channel.send("KAMU TIDAK BERKUASA!");
		} else message.channel.send("pake rus!help dlu sana")
			/*case "play":
			case "p":
				var
				if (message.member.voice.channel) {
					play('https://www.youtube.com/watch?v=7dNrO7TSZdU',message)
				} else {
					message.reply('Join voice chat dlu goblok!');
				}
				break;*/
			/*case "report":
				message.channel.send("`Command report ini akan langsung mengarah ke DM author (OkutaJager), silahkan ketik bug, dsb setelah membaca pesan ini`")
				const reportCollector = new Discord.MessageCollector(message.channel,response => response.author.id == message.author.id ,{time:100000});
				reportCollector.on('collect',response => {
					report(message,myid,response);
				});
				break;*/
	}
})

client.login(process.env.token);
