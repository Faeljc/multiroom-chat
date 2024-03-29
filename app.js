/*importar as configurações do servidor*/

var app = require('./config/server');

/* parametrizar a porta de escuta*/

var server = app.listen(80, function(){
	console.log('servidor ok');
});

var io = require('socket.io').listen(server);

app.set('io', io);

/*Cria a conexão do web socket */

io.on('connection', function(socket){

	console.log('Usuário conectou');

	socket.on('disconnect', function(){
		console.log('Usuário desconectou');
	})
	/* dialogo */
	socket.on('msgParaServidor', function(data){
		socket.emit('msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
			);

		socket.broadcast.emit('msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
			);

	/* participantes */
	if(parseInt(data.apelido_atualizado_nos_clientes)==0){
		socket.emit('participantesParaCliente', 
				{apelido: data.apelido}
				);

			socket.broadcast.emit('participantesParaCliente', 
				{apelido: data.apelido}
				);
		}
	});
});