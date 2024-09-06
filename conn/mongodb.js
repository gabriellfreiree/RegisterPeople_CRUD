const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb+srv://guipereira05122005:senha@aplicacao.8rmcc.mongodb.net/?retryWrites=true&w=majority&appName=Aplicacao";
const client = new MongoClient(uri);

module.exports = client
