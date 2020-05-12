const Tweet = require("./tweet");

class Retweet extends Tweet{
    constructor(tweetInfo, retweetInfo){
        super(tweetInfo);
        this.retweetInfo = retweetInfo;
    }

    getId(){
        return this.retweetInfo["id_str"];
    }

    getLikes(){
        return this.retweetInfo["favorite_count"];
    }

    getRetweets(){
        return this.retweetInfo["retweet_count"];
    }

    getText(filterLinks = true) {
        let fullText = this.retweetInfo["full_text"];

        if(filterLinks) {
            return fullText.replace(/((https)|(http)):\/\/t.co\/(\w+)(\s?)/g, this.getURLs());
        }else{
            return fullText;
        }
    }
}

module.exports = Retweet;