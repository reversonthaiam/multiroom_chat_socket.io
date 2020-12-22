module.exports.iniciaChat = function(application, req, res){
    
    var dadosForm = req.body;

    req.assert('nome', 'nome ou apelido é obrigatorio').notEmpty();
    req.assert('nome', 'Quantidade minima de caracteres 3 e maxima de 20').len(3,20);


    
    var erros = req.validationErrors();

    if(erros){
        res.render("index", {validacao : erros});
        return;
    }

    application.get('io').emit(
        'msgParaCliente',
        {nome: dadosForm.nome, mensagem: ' acabou de entrar no chat!'}
    )


    
    res.render("chat", {dadosForm : dadosForm});
}


