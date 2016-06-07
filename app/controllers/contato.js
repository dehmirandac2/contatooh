module.exports = function(app){
	var Contato = app.models.contato;
	var controller = {};

	controller.listaTodos = function(req, res){

		/*De acordo com a documentação do Express, res.json é idên-
tico a res.send quando um objeto ou array é passado. A diferença

é que o primeiro explicitamente converte tipos não-objeto como null

e undefined. Usamos res.json também para deixar clara nossa in-
tenção de trabalhar com este tipo de dado.*/

		Contato.find().populate('emergencia').exec()
			.then(function(contatos){
				res.json(contatos)
			}, function(erro){
				console.error(erro);
				res.status(500).json(erro);
			})
	};

	controller.obtemContato = function(req, res){
		console.log(req)
		var _id = req.params.id;
		Contato.findById(_id).exec()
			.then(function(contato){
				if(!contato) throw new Error('Contato não encontrado');
				res.json(contato);
			}, function(erro){
				console.log(erro);
				res.status(404).json(erro);
			})

	}

	controller.removeContato = function(req, res){
		var _id = req.params.id;
		Contato.remove({"_id": _id}).exec()
			.then(function(){
				res.end();
			}, function(erro){
				return console.error(erro)
			})
	}

	controller.salvaContato = function(req, res){
		var _id = req.body._id;
		req.body.emergencia = req.body.emergencia || null;

		if(_id){
			Contato.findByIdAndUpdate(_id, req.body).exec()
				.then(function(contato){
					res.json(contato);
				}, function(erro){
					console.error(erro);
					res.status(500).json(erro);
				})
		}
		else{
			Contato.create(req.body)
				.then(function(contato){
					res.status(201).json(contato);
				}, function(erro){
					console.log(erro);
					res.status(500).json(erro);
				})
		}
	}

	
	return controller;
}