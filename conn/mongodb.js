const {MongoClient} = require("mongodb")

const uri = "mongodb+srv://guipereira05122005:senha@aplicacao.8rmcc.mongodb.net/?retryWrites=true&w=majority&appName=Aplicacao"

const client = new MongoClient(uri)

var db = client.db("projeto_tap_registros")

module.exports = client