/*Importar as configurações do servidor*/
const app = require('./config/server');

/*parametrizar a porta que o servidor vai escutar*/

let server = app.listen(80, () => {
    console.log("Servidor ON");
});

/* fazer o servidor ouvir usando o socket.io tambem*/
let io = require('socket.io').listen(server);

app.set('io', io);

/*Criar a conexão por websocket */
io.on('connection', (socket) => {
    console.log('Usuário conectado');

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });

    socket.on('msgParaServidor', (data) => {
        /*Dialogo, enviar a mensagem para todos os usuários conectados*/
        socket.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
            );
        socket.broadcast.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
            );  
        //participantes
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
        socket.emit(
            'participantesParaClientes',
            { apelido: data.apelido }   
            );
            socket.broadcast.emit(
            'participantesParaClientes',
            { apelido: data.apelido}
            );
        }
    });
});
