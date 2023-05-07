const fs = require("fs");
// Bot File
module.exports =
    fs.writeFileSync("bot.js",
`
// Perms

const Discord = require("discord.js");
const http = require("http");
const { EmbedBuilder, PermissionBitFlags } = require("@discordjs/builders");
const env = require("dotenv").config();

// Server

const server = http.createServer((req, res) => {
    res.write("Your Bot Hoster");
});
server.listen();

// Client-Setup

const client = new Discord.Client(
    {
        partials: [
            Discord.Partials.Channel,
            Discord.Partials.GuildMember,
            Discord.Partials.Message,
            Discord.Partials.Reaction,
            Discord.Partials.ThreadMember,
            Discord.Partials.GuildScheduledEvent
        ],
        intents: [
            Discord.GatewayIntentBits.Guilds,
            Discord.GatewayIntentBits.DirectMessages,
            Discord.GatewayIntentBits.GuildEmojisAndStickers,
            Discord.GatewayIntentBits.GuildIntegrations,
            Discord.GatewayIntentBits.GuildInvites,
            Discord.GatewayIntentBits.GuildMembers,
            Discord.GatewayIntentBits.GuildMessages,
            Discord.GatewayIntentBits.GuildMessageReactions,
            Discord.GatewayIntentBits.MessageContent,
            Discord.IntentsBitField.Flags.Guilds,
            Discord.IntentsBitField.Flags.DirectMessages,
            Discord.IntentsBitField.Flags.GuildEmojisAndStickers,
            Discord.IntentsBitField.Flags.GuildInvites,
            Discord.IntentsBitField.Flags.GuildMembers,
            Discord.IntentsBitField.Flags.GuildMessages,
            Discord.IntentsBitField.Flags.MessageContent
        ]
    }
);

// Client-Start

client.on("ready", function(){
    console.log("Bot starting!");
    console.log("Logged in!");
    console.log("Bot started");
});

// Client-Reconnect

client.on("shardReconnecting", function(){
    console.log("Trying to reconnect to the websocket");
});

// Client-Reconnected

client.on("shardResume", function(){
    console.log("Der Bot hat sich wieder verbunden!")
});

// Client-Warning

client.on("warn", function(info){
    console.log(info);
});

// Client-Disconnect

client.on("shardDisconnect", function(event){
    console.log("The bot disconnected and won't reconnect itself");
});

// Client-Error

client.on("error", function(error){
    console.error(error);
});

// Client-Login

client.login(process.env["TOKEN"]);
`);
// Commands File
module.exports =
fs.writeFileSync("commands.js",
`
// Perms

const dotenv = require("dotenv").config();
const token = process.env["TOKEN"];
const clientId= process.env["CLIENT_ID"];
const { REST, SlashCommandBuilder, Routes, PermissionFlagsBits } = require('discord.js');

// Commands

const commands = [

].map(command => command.toJSON());
const rest = new REST(
    {
        version: '10'
    }
).setToken(token);
rest.put(
    Routes.applicationCommands(clientId), {
        body: commands
    })
	.then((data) => console.log("Commands saved: " + data.length))
	.catch(console.error);
`);
// ENV File
module.exports =
fs.writeFileSync(".env",
`TOKEN=
CLIENT_ID=`)