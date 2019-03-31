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

    let args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "hello":
            message.channel.sendMessage("Hey");
        break;
        case "mitchu":
            message.channel.sendMessage("is dik!");
        break;
        case "jerome":
            message.channel.sendMessage("Nice headshot jerome. :smile: :gun: ");
        break;
            case "play":
        if (!args[1]) {
            message.channel.sendMessage("Use a link fag");
            return;
        }
        case "wtf":
            message.channel.sendMessage("https://cdn.discordapp.com/attachments/244427626431643659/557656648332738600/SPOILER_c24c7e5ce9204e9449a6f388c08a48c7.png");
        break;
        


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
        
        case "8ball":
            if (!args[2]) message.channel.sendMessage("Ask a question dum dum!");

            var sayings = ["Yes", "No", ]
            var result = Math.floor((Math.random() * sayings.length) + 0); 

            message.channel.sendMessage(sayings[result]);
        break;

        default:
            message.channel.sendMessage("use a good command noob");
        
    }
});
    

bot.login(botconfig.token);