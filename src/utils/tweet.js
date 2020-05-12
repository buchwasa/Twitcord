class Tweet{
    constructor(tweetInfo){
        this.tweetInfo = tweetInfo;
    }

    getMedia() {
        if (this.tweetInfo.hasOwnProperty("entities") && this.tweetInfo["entities"].hasOwnProperty("media")) {
            let tweetMedia = this.tweetInfo["entities"]["media"];
            for (let images in tweetMedia) {
                if (tweetMedia.hasOwnProperty(images)) {
                    return tweetMedia[images]["media_url"];
                }
            }
        } else {
            return "";
        }
    }

    getId(){
        return this.tweetInfo["id_str"];
    }

    getLikes(){
        return this.tweetInfo["favorite_count"];
    }

    getRetweets(){
        return this.tweetInfo["retweet_count"];
    }

    getCreatedAt(){
        return new Date(this.tweetInfo["created_at"]);
    }

    getText(filterLinks = true){
        let fullText = this.tweetInfo["full_text"];

        if(filterLinks) {
            return fullText.replace(/((https)|(http)):\/\/t.co\/(\w+)(\s?)/g, "");
        }else{
            return fullText;
        }
    }
}

module.exports = Tweet;