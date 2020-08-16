const Discord = require('discord.js');
const client = new Discord.Client();
const Guild = new Discord.Guild();
const prefix = process.env.prefix
const fs = require('fs');
const ProfilePicture = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsmkrus.sch.id%2F&psig=AOvVaw1NuV5V0j0Yyb6ESu2IgGKM&ust=1597672732119000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPDboO7wn-sCFQAAAAAdAAAAABAD'
		
client.on('ready', () => {
  client.user.setAvatar(ProfilePicture).catch(err => console.log(err));
  client.user.setStatus('online', "auk-?")
  client.user.setPresence({
        game: {
            name: 'rus!',
        }
    });
  console.log('I am ready!');
});

client.on('message', message => {})

client.login(process.env.token);
