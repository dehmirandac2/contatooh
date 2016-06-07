angular.module("contatooh").controller('ContatosController', function($scope, $resource, Contato){
	
	$scope.contatos = []

	$scope.filtro = '';

	$scope.init = function(){
		BuscaContatos();
	}

	$scope.init();
	/*
	Esse ou o debaixo
	$http.get("/contatos")
		.success(function(data){
			$scope.contatos = data
		})*/
	
	/*
	Ou esse aqui

	var Contatos = $resource("/contatos");
	var promise = Contatos.query().$promise;

	promise
		.then(function(contatos){
			$scope.contatos = contatos;
		})
		.catch(function(erro){
			console.log('Não foi possível')
			console.log(erro);
		});
		})*/

	function BuscaContatos(){
		Contato.query(function(contatos){
			$scope.contatos = contatos;
			console.log(contatos)
		},
		function(erro){
			$scope.mensagem = {
				texto: 'Não foi possível'
			}
			console.log(erro);
		});
	}

	$scope.remove = function(contato){
		var promise = Contato.delete({ id: contato._id }).$promise;

		promise
			.then(BuscaContatos)
			.catch(function(){
				$scope.mensagem = {
					texto: 'Não foi possível remvoer o contato'
				};
				console.log(erro);
			})
	}
})