var redis = require("redis"), client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function(err) {
	console.log("Error " + err);
});

client.hmset("user1", {
	"test" : JSON.stringify({ "push" : true, "log" : true })
});
client.hgetall("user1", function(err, obj) {
	console.dir(obj);
});