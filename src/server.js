require("dotenv").config();
const Twitter = new (require("twitter"))({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});
const Discord = require("discord.js");
const Client = new Discord.Client();
const Timeline = require("./twitter/timeline");

class Server {
    constructor() {
        Client.on("ready", () => {
            let channel = Client.channels.find(channels => channels.id === process.env.TIMELINE_CHANNEL_ID);

            new Timeline(Twitter, channel);
        });

        Client.login(process.env.DISCORD_KEY).catch((error) => {
            console.log(error);
        });
    }

}

module.exports = Server;