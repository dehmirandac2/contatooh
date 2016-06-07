//archive to config express
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

/*o Express está dentro de uma função

passada como parâmetro para o objeto module.exports, disponível im-
plicitamente em cada módulo. Tudo que for adicionado em sua propriedade

exports estará visível fora do módulo;*/

module.exports = function(){
	var app = express();

	//configuração de ambiente
	app.set('port', 3000);

	/*Precisamos fazer com que os arquivos dentro da pasta public sejam
acessíveis pelo usuário através do navegador. Realizamos esta configuração
através da função app.use, que recebe como parâmetro o middleware
express.static:*/
	
	app.use(express.static('./public'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());

	/*templates engine ejs para carregar as views dinâmicas */

	app.set('view engine', 'ejs');
	//diretorio onde ficarão as views
	app.set('views', './app/views');


	/*A função load carregará todos os scripts dentro das pastas
app/models, app/controllers e app/routes. No final, a função
into adiciona dinamicamente na instância do Express propriedades que
apontam para esses módulos.*/

//O parâmetro {cwd: ‘app’} foi necessário para mudar o diretório padrao
	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);

	return app;
};