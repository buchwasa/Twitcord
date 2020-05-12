class User {
    constructor(userInfo){
        this.userInfo = userInfo;
    }

    getScreenName(){
        return this.userInfo["screen_name"];
    }

    getProfilePicture(){
        return this.userInfo["profile_image_url"];
    }
}

module.exports = User;