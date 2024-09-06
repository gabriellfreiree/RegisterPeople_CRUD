const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser");
const client = require('./conn/mongodb.js') // conexão com mongodb
const { ExpressHandlebars } = require("express-handlebars");
app.engine('handlebars', handlebars());
app.set("view engine", "handlebars")
app.use(express.static('public'));

const db = client.db('projeto_tap_registro') //conexão com o banco de dados
const { ObjectId } = require('mongodb'); // requisição para o ObjectId
const pessoa = db.collection('pessoa') // criação da colection pessoa


app.listen(8081, function(){
    console.log("Servidor ativo!")
})

app.get('/', function(req, res){
    res.render('home')
})
app.get('/logar', function(req, res){
    res.render('logar')
})
app.get('/cadastraracesso', function(req, res){
    res.render('cadastraracesso')
})
app.get('/cadastrar', function(req, res){
    res.render('cadastrar')
})
// app.get('/listar', function(req, res){ //listar antigo
//     res.render('listar')
// })

app.get('/listar', async (req, res) =>{ //listar alterado
    try {
        const pessoas = await pessoa.find().toArray();
    
        res.render('listar', { pessoas })
    } catch (error) {
        console.error("Erro ao listar pessoas:", error);
        res.status(500).send({ message: "Erro ao listar as pessoas." });
    }
})

app.get('/quemsomos', function(req, res){
    res.render('quemsomos')
})

app.get('/inserir', async (req, res) =>{
const pessoaTeste = {nome: 'teste1', idade: 1, sexo: 'neutro', CEP: '001-01', endereco: 'rua Ahli'}
const inserir = await pessoa.insertOne(pessoaTeste)
console.log('_id: ${inserir.insertedId}')
})

app.get('/excluir/:id', async (req, res) =>{ //função excluir
    const { id } = req.params
    const iddocument = { _id: new ObjectId(id) }
    const deleter = await pessoa.deleteOne(iddocument)
    console.dir(deleter.deletedCount);

    res.redirect('/listar')
})


