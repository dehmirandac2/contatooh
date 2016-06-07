var mongoose = require("mongoose");

module.exports = function(uri){
	mongoose.connect(uri);

	mongoose.connection.on('connected', function(){
		console.log("Mongoose conectado em "+ uri);
	});

	mongoose.connection.on('disconnected', function(){
		console.log("Mongoose desconectado em " + uri);
	})

	mongoose.connection.on('error', function(){
		console.log("Mongoose erro na conexão " + uri);
	})

	process.on("SIGINT", function(){
		mongoose.connection.close(function(){
			console.log("Mongoose desconectado pelo término da aplicação");
			process.exit(0);
		})
	})
};