/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar porta de escuta */
var server = app.listen(3000, function(){
    console.log('Servidor online');
})

var io = require('socket.io').listen(server);

app.set('io', io);

/* Criar a conexão por WebSocket */
io.on('connection', function(socket){
    console.log('Usuário conectou');

    socket.on('disconnect', function(){
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor', function(data){
        /* dialogos */
        socket.emit(
            'msgParaCliente',
            { nome: data.nome, mensagem: data.mensagem }
        );
        socket.broadcast.emit(
            'msgParaCliente',
            { nome: data.nome, mensagem: data.mensagem }
        );

        /* participantes */
        if(parseInt(data.nome_atualizado_nos_clientes) == 0){
            socket.emit(
                'participantesParaCliente',
                { nome: data.nome}
            );
            socket.broadcast.emit(
                'participantesParaCliente',
                { nome: data.nome}
            );
        }
    });
});