var express = require('express');
var router = express.Router();
var auth = require("../auth/auth");
const ProxyCep = require('../CepProxy/ProxyCep');
const client = require('../conn/mongodb');
const mongo = require('mongodb');
const ApiCep = require('../CepProxy/ApiCep');

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render("home")
});

router.get("/logar", function (req, res, next) {
  res.render("logar")
})

router.get("/registrar", function (req, res, next) {
  res.render("cadastraracesso")
})

router.get("/listar", function (req, res, next) {
  res.render("listar")
})

router.get("/quemsomos", function (req, res, next) {
  res.render("quemsomos")
})

router.get("/cadastrar", function (req, res, next) {
  res.render("cadastrar")
})

router.post("/cadastrar", auth, async function (req, res, next) {

  let apiCep = await ProxyCep.getCep(req.body.cep)

  client.db("projeto_tap_registro").collection("users").updateOne({
    _id: new mongo.ObjectId(req.user.id)
  }, {
    $push: {
      registros: {
        _id: new mongo.ObjectId(),
        nome: req.body.nome,
        idade: req.body.idade,
        sexo: req.body.sexo,
        cep: apiCep.cep,
        rua: apiCep.logradouro,
        bairro: apiCep.bairro,
        cidade: apiCep.localidade,
        uf: apiCep.uf
      }
    }
  }).then((registro) => {
    res.status(200).send({
      msg: "registro cadastrado com sucesso"
    })
  }).catch((error) => {
    res.status(500).send({
      msg: "Erro ao cadastrar: " + error
    })
  })

})

router.put("/atualizar/:id", auth, async function (req, res, next) {

  let apiCep = await ProxyCep.getCep(req.body.cep)

  client.db("projeto_tap_registro").collection("users").updateOne({
    _id: new mongo.ObjectId(req.user.id),
    "registros._id":  new mongo.ObjectId(req.params.id)
  }, {
    $set: {
      "registros.$.nome": req.body.nome,
      "registros.$.idade": req.body.idade,
      "registros.$.sexo": req.body.sexo,
      "registros.$.rua": apiCep.logradouro,
      "registros.$.bairro": apiCep.bairro,
      "registros.$.cidade": apiCep.localidade,
      "registros.$.uf": apiCep.uf
    }
  }).then(() => {
    res.status(200).send({
      msg: "registro atualizado com sucesso"
    })
  }).catch((error) => {
    res.status(500).send({
      msg: "Erro ao cadastrar: " + error
    })
  })

})

router.delete("/deletar/:id", auth, async function (req, res, next) {
  client.db("projeto_tap_registro").collection("users").updateOne({
    _id: new mongo.ObjectId(req.user.id),
  }, {
    $pull: {
      registros:{
        "_id": new mongo.ObjectId(req.params.id)
      }
    }
  }).then(() => {
    res.status(200).send({
      msg: "registro excluido com sucesso"
    })
  }).catch((error) => {
    res.status(500).send({
      msg: "Erro ao excluir: " + error
    })
  })
})  

router.get("/listar_registros", auth, async function (req, res, next) {

  var user = client.db("projeto_tap_registro").collection("users")
  .findOne({
    _id: new mongo.ObjectId(req.user.id),
  }).then((user) => {
    res.send(user.registros)
  })

})

router.get("/listar_registros/:id", auth, async function (req, res, next) {

  var user = client.db("projeto_tap_registro").collection("users")
  .findOne({
    _id: new mongo.ObjectId(req.user.id),
  }).then((user) => {

    for(registro of user.registros){
      if(req.params.id == registro._id){
        res.send(registro)
        return
      }
    }
    
    res.status(404).send("nao encontrado")
  })

})


module.exports = router;
