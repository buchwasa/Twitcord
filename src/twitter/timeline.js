const { RichEmbed } = require("discord.js");
const Tweet = require("../utils/tweet");
const Retweet = require("../utils/retweet");
const User = require("../utils/user");

class Timeline {
    constructor(twitter, channel) {
        if (!twitter.hasOwnProperty("options")) {
            console.log("Invalid Twitter information provided!");
            process.exit(1);
        }
        this.twitter = twitter;
        this.channel = channel;

        //setInterval(function(){
        this.getHomeTimeline();
        //}, 60000);
    }

    getHomeTimeline() {
        let seenTweets = [];
        this.getTweets((tweets) => {
            for (let tweet in tweets.reverse()) {
                let tweetInfo = tweets[tweet];
                let tweetId = tweetInfo["id"].toString();
                if (seenTweets.indexOf(tweetId) <= -1) {
                    if(!tweetInfo.hasOwnProperty("retweeted_status")){
                        this.constructEmbed(new Tweet(tweetInfo), new User(tweetInfo["user"]), "BLUE")
                    }else{
                        this.constructEmbed(new Retweet(tweetInfo, tweetInfo["retweeted_status"]), new User(tweetInfo["retweeted_status"]["user"]), "GREEN");
                    }
                    seenTweets.push(tweetId);
                } else {
                    console.log("Tweet with ID " + tweetId + " was already posted, ignoring it.");
                }
            }
        });
    }

    getTweets(callback) {
        this.twitter.get("statuses/home_timeline", {
            "count": 5,
            "tweet_mode": "extended"
        }, (error, tweets) => {
            if (error) {
                for (let msg in error) {
                    if (error.hasOwnProperty(msg)) {
                        console.log("An error occurred while fetching tweets: ", error[msg]["message"]);
                    } else {
                        console.log("An unknown error occurred.");
                    }
                }

                return;
            }

            return callback(tweets);
        });
    }

    constructEmbed(tweet, user, color){
        let embed = new RichEmbed();

        embed.setTitle("TWEET LINK")
            .setDescription(tweet.getText())
            .setAuthor(user.getScreenName(), user.getProfilePicture())
            .setTimestamp(tweet.getCreatedAt())
            .setImage(tweet.getMedia())
            .setColor(color)
            .setFooter(
                "Retweets: " + tweet.getRetweets() +
                " - Likes: " + tweet.getLikes()
            )
            .setURL(`https://twitter.com/${user.getScreenName()}/status/${tweet.getId()}`);

        this.channel.send({embed});
    }
}


module.exports = Timeline;