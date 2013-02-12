var redis 		= require("redis")
, 	client 		= redis.createClient()
,	totalUsers 	= 50000
,	insert		= []
,	query 		= []

;
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function(err) {
	console.log("Error " + err);
});

client.flushdb();

var startInsert = (new Date()).getTime();
for( var i = 0; i < totalUsers; i++) {
	var max = j <= Math.floor(Math.random() * 10) + 1;
	for ( var j = 0; j <= max; j++) {
		var kind = Math.floor(Math.random() * 10) + 1;
		if(i == (totalUsers - 1) && j == max){
			client.set("cfg.usr:" + i + ":kind:" + kind + ":actions", 10, function(error, reply){
				var endInsert = (new Date()).getTime();
				console.log("Insert- Start:", startInsert, "End:", endInsert)
				console.log("\tTime:", (endInsert - startInsert), "Average:", (endInsert - startInsert) / totalUsers);
			});
			continue;
		}
		client.set("cfg.usr:" + i + ":kind:" + kind + ":actions", 10);
	}
}

var startQuery = (new Date()).getTime();
for( var i = 0; i < totalUsers; i++) {
	var max = j <= Math.floor(Math.random() * 10) + 1;
	for ( var j = 0; j <= max; j++) {
		var kind = Math.floor(Math.random() * 10) + 1;
		if(i == (totalUsers - 1) && j == max){
			client.get("cfg.usr:" + i + ":kind:" + kind + ":actions", function(error, reply){
				var endQuery = (new Date()).getTime();
				console.log("Query - Start:", startQuery, "End:", endQuery)
				console.log("\tTime:", (endQuery - startQuery), "Average:", (endQuery - startQuery) / totalUsers,"\n");
				client.end();
			});
			continue;
		}
		client.get("cfg.usr:" + i + ":kind:" + kind + ":actions");
	}
}

console.log("cfg.usr:<usr>:kind:<knd>:actions", totalUsers);