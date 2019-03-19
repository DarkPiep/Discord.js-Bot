const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const prefix = "!";

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconect;
    });
}

const bot = new Discord.Client();

var servers = {};



bot.on("ready", async () => {
    console.log("bot is online");
    bot.user.setActivity("mitchu is dik");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "hello":
            message.channel.sendMessage("Hey");
        break;
        case "mitchu":
            message.channel.sendMessage("is dik!");
        break;
        case "play":
        if (!args[1]) {
            message.channel.sendMessage("Use a link fag");
            return;
        }



        if (!message.member.voiceChannel) {
            message.channel.sendMessage("Maybe go in a f ing voice channel");
            return;
        }

        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        };

        var server = servers[message.guild.id]; 

        server.queue.push(args[1]);

        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
            play(connection, message);
        });
        break;

        case "skip":
            var server = servers[message.guild.id];

            if (server.dispatcher) server.dispatcher.end();
        break;

        case "stop":
            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;
        default:
            message.channel.sendMessage("use a good command noob");
        
    }
});
    

bot.login(botconfig.token);