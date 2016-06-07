angular.module('contatooh').factory("Contato", function($resource){

	//Toda serviço criado com factory deve retornar um objeto.
	return $resource("/contatos/:id");
})