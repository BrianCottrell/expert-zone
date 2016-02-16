var redis = require("redis"),
    client = redis.createClient({
        host: "pub-redis-13181.us-east-1-3.7.ec2.redislabs.com",
        port: 13181
    });

client.on("error", function (err) {
    console.log("Error " + err);
});

// Get All Asset Keys
function getAssetIds(callback) {
    client.keys("asset:*", callback);
}

// Get image of an asset by assetId
function getImage(assetId, callback) {
    client.hget("asset:"+assetId, "image", callback);
}

// Set image of an asset by assetId
function setImage(assetId, value, callback) {
    client.hset("asset:"+assetId, "image", value, callback);
}

// Get video of an asset by assetId
function getVideo(assetId, callback) {
    client.hget("asset:"+assetId, "video", callback);
}

// Set video of an asset by assetId
function setVideo(assetId, value, callback) {
    client.hset("asset:"+assetId, "video", value, callback);
}

// Get question of an asset by assetId
function getQuestion(assetId, callback) {
    client.hget("asset:"+assetId, "question", callback);
}

// Set question of an asset by assetId
function setQuestion(assetId, value, callback) {
    client.hset("asset:"+assetId, "question", value, callback);
}

module.exports = {
    getAssetIds:    getAssetIds,
    getImage:       getImage,
    setImage:       setImage,
    getVideo:       getVideo,
    setVideo:       setVideo,
    getQuestion:    getQuestion,
    setQuestion:    setQuestion
}