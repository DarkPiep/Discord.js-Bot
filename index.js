const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client();

bot.on("ready", async () => {
    console.log("bot is online");
    bot.user.setGame("mitchu is dik");
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}hello`){
        return message.channel.send("Hello!")
    }

    if (cmd === `${prefix}mitchu`){
        return message.channel.send("ok")
    }
    haha

    if (cmd === `${prefix}botinfo`){

        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Info")
        .setColor("#10a045")
        .addField("Bot Name", bot.user.username);

        return message.channel.send(botembed)
    }
});




bot.login(botconfig.token);