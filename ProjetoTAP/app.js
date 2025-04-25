const express = require('express')//pro express funcionar 
const app = express()
const handlebars = require('express-handlebars').engine//pro handlebars funcionar
const bodyParser = require("body-parser")    
const post = require('./models/post')//post é o diretorio principal


app.engine('handlebars', handlebars({defaultLayout: 'main'}))//o main é a matriz, nesse caso é "main.handlebars"
app.set('view engine', 'handlebars')


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//chama a url , rota que vai apontar pro arquivo em html
app.get("/", function(req, res){//req=require res=response 
    res.render("primeira_pagina")// usando o res pq quer enviar a mensagem pro servidor 
})



app.post('/cadastrar', function(req, res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function(){
        res.redirect('/')
    }).catch(function(erro){
        res.send('Erro ao criar o post: ' + erro)
    })
})

app.get('/consulta', function(req, res){
    post.findAll().then(function(posts){ //posts é variavel
        res.render('consulta', {posts: posts})
        console.log(posts)

    }
).catch(function(erro){
    res.send("Erro ao listar os posts:" +erro)
})
})

//chama a url , rota que vai apontar pro arquivo em html
app.get("/editar/:id", function(req, res){//req=require res=response 
    post.findAll({where: {id: req.params.id}}).then(function(posts){
        res.render("editar", {post:posts})// usando o res pq quer enviar a mensagem pro servidor 
    }).catch(function(erro){
        res.send('Erro ao listar os posts:' + erro )
    })
   
})

app.get("/excluir/:id", function(req, res){//req=require res=response 
    post.destroy({where: {id: req.params.id}}).then(function(posts){
        res.redirect('/consulta')
    }).catch(function(erro){
        res.send('Erro ao listar o post:' + erro )
    })
   
})

app.post('/atualizar/:id', function(req, res){
    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao

    }, {where: {id: req.params.id}}).then(function(){
        res.redirect('./consulta')
    }).catch(function(erro){
        res.send('Erro ao atualizar o post:' +erro)
    })
});


app.listen(8081, function(){// 8081 porta pro servidor funcionar 
    console.log('Servidor Ativo!')//verifica se o servidor está ativo 
})