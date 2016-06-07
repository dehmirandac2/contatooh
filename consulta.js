var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

//ObjectId de alum contato existente
var _idProcurado = new ObjectID("5750aa449e42a5b74276cbc4");

MongoClient.connect("mongodb://127.0.0.1:27017/contatooh", function(erro, db){
	if(erro) throw err;
	db.collection("contato").findOne({_id: _idProcurado}, function(erro, contato){
		if(erro) throw erro;
		console.log(contato);
	});
})