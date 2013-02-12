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

insert.push((new Date()).getTime());
for ( var i = 0; i < totalUsers; i++) {
	var max = j <= Math.floor(Math.random() * 10) + 1;
	for ( var j = 0; j <= max; j++) {
		if(i == (totalUsers - 1) && j == max){
			client.sadd("usr:cfg:" + i + ":push",
					Math.floor(Math.random() * 10) + 1, function(err, reply) {
				insert.push((new Date()).getTime());
				var startInsert = Math.min.apply(null, insert);
				var endInsert = Math.max.apply(null, insert);
				console.log("Start Inserting", startInsert, 
						"End Inserting", endInsert, 
						"Time Spent", (endInsert - startInsert), 
						"Average Per User", (endInsert - startInsert) / totalUsers);
			});
			continue;
		}
		client.sadd("usr:cfg:" + i + ":push",
				Math.floor(Math.random() * 10) + 1, function(err, reply) {
			insert.push((new Date()).getTime());
		});
	}
}

query.push((new Date()).getTime());
for ( var i = 0; i < totalUsers; i++) {
	if(i == (totalUsers - 1)) {
		client.sismember("usr:cfg:" + i + ":push", 5, function(err, reply) {
			query.push((new Date()).getTime());
			var startQuery = Math.min.apply(null, query);
			var endQuery = Math.max.apply(null, query);
			console.log("Start Querying", startQuery, 
					"End Querying", endQuery, 
					"Time Spent", (endQuery - startQuery),
					"Average Per User", (endQuery - startQuery) / totalUsers);
		});
		continue;
	}
	client.sismember("usr:cfg:" + i + ":push", 5, function(err, reply) {
		query.push((new Date()).getTime());
	});
}

insert = [];
query = [];

insert.push((new Date()).getTime());
for( var i = 0; i < totalUsers; i++) {
	var max = j <= Math.floor(Math.random() * 10) + 1;
	for ( var j = 0; j <= max; j++) {
		var kind = Math.floor(Math.random() * 10) + 1;
		if(i == (totalUsers - 1) && j == max){
			client.set("cfg.usr:" + i + ":kind:" + kind + ":actions", 10, function(error, reply){
				insert.push((new Date()).getTime());
				var startInsert = Math.min.apply(null, insert);
				var endInsert = Math.max.apply(null, insert);
				console.log("Start Inserting", startInsert, 
						"End Inserting", endInsert, 
						"Time Spent", (endInsert - startInsert), 
						"Average Per User", (endInsert - startInsert) / totalUsers);
			});
			continue;
		}
		client.set("cfg.usr:" + i + ":kind:" + kind + ":actions", 10, function(error, reply){
			insert.push((new Date()).getTime());
		});
	}
}

query.push((new Date()).getTime());
for( var i = 0; i < totalUsers; i++) {
	var max = j <= Math.floor(Math.random() * 10) + 1;
	for ( var j = 0; j <= max; j++) {
		var kind = Math.floor(Math.random() * 10) + 1;
		if(i == (totalUsers - 1) && j == max){
			client.get("cfg.usr:" + i + ":kind:" + kind + ":actions", function(error, reply){
				query.push((new Date()).getTime());
				var startQuery = Math.min.apply(null, query);
				var endQuery = Math.max.apply(null, query);
				console.log("Start Querying", startQuery, 
						"End Querying", endQuery, 
						"Time Spent", (endQuery - startQuery), 
						"Average Per User", (endQuery - startQuery) / totalUsers);
			});
			continue;
		}
		client.get("cfg.usr:" + i + ":kind:" + kind + ":actions", function(error, reply){
			query.push((new Date()).getTime());
		});
	}
}


console.log("Users", totalUsers);