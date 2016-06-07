/*É neste ar-
quivo que subiremos o servidor através do Node.js associando-o à instância

do Express:*/

var http = require('http');
var app = require('./config/express')();

require('./config/database.js')('mongodb://localhost/contatooh');

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server escutando a porta ' + app.get('port'))
})