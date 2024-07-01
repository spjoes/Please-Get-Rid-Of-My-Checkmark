require('dotenv').config();

const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET
});

const rwClient = twitterClient.readWrite;

module.exports = rwClient