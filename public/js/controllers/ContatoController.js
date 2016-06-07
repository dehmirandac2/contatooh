angular.module("contatooh").controller("ContatoController", function($scope, $routeParams, Contato){
	
	if($routeParams.contatoId){
		Contato.get({id: $routeParams.contatoId},
			function(contato){
				console.log(contato)
				$scope.contato = contato;
			},
			function(erro){
				$scope.mensagem = {
					texto: "Não foi possível obter o contato"
				}
				console.log('erro')
			}
		)
	}
	else{
		$scope.contato = new Contato();
	}

	$scope.salva = function(){
		console.log($scope.contato)
		$scope.contato.$save()
			.then(function(){
				$scope.mensagem = {
					texto: "Contato salvo com sucesso"
				}
				//limpa o form
				$scope.contato = new Contato();
			})
			.catch(function(erro){
				$scope.mensagem = {
					texto: "Erro ao salvar o contato"
				}
			})
	}

	Contato.query(function(contatos){
		$scope.contatos = contatos;
	})
});