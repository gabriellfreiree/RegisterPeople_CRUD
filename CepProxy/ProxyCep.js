const client = require("../conn/mongodb");
const ApiCep = require("./ApiCep");
var ceps = client.db("projeto_tap_registro").collection("enderecos")

class ProxyCep{
    static async getCep(cep){

        var endereco = await ceps.findOne({
            cep: cep
        })

        if(endereco){
            return endereco
        }else{
            var novoCep = await ApiCep.getResource(cep)
            ceps.insertOne(novoCep)
            return novoCep
        }

    }
}

module.exports = ProxyCep