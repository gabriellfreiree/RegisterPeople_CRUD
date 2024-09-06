var express = require('express');
var router = express.Router();
var client = require("../conn/mongodb")
var jwt = require("jsonwebtoken")
var bcrypt = require("bcrypt")
var fs = require("fs")
var path = require("path")
var chavePrivada = fs.readFileSync("keys/chavePrivada.pem")
var chavePublica = fs.readFileSync("keys/chavePublica.pem")

/* GET home page. */
router.post('/login', function (req, res, next) {

    client.db("projeto_tap_registro").collection("users").findOne({
        email: req.body.email
    }).then((user) => {

        if (!user) {
            res.status(401).send({
                "msg": "Senha ou email incorretos"
            })
        } else {

            if(!bcrypt.compareSync(req.body.password, user.password)){
                res.status(401).send({
                    "msg": "Senha ou email incorretos"
                })

                return;
            }

            let authUser = {
                id: user._id,
                email: user.email
            }

            let token = jwt.sign(authUser, chavePrivada, {
                expiresIn: "2h",
                algorithm: 'RS256'
            })

            authUser = {
                ...authUser,
                type: "refreshToken"
            }

            let refreshToken = jwt.sign(authUser, chavePrivada, {
                expiresIn: "10d",
                algorithm: "RS256"
            })

            res.status(200).send({
                token: token,
                refreshToken: refreshToken,
                expiresIn: 7200
            })

        }
    }).catch((error) => {
        res.status(500).send({
            msg: "erro: " + error
        })
    })

});

router.post('/register', function (req, res, next) {

    client.db("projeto_tap_registro").collection("users").findOne({
        email: req.body.email
    }).then((user) => {
        if (!user) {
            client.db("projeto_tap_registro").collection("users").insertOne({
                "email": req.body.email,
                "password": bcrypt.hashSync(req.body.password, 3)
            }).then((user) => {
                res.send({
                    msg: "usuario cadastrado com sucesso"
                })

            }).catch((error) => {
                res.status(500).send({
                    msg: "erro: " + error
                })

            })
        } else {
            res.status(400).send({
                msg: "Usuario já cadastrado"
            })
        }

    })

    

})

router.post('/refreshToken', function (req, res, next) {
    jwt.verify(req.body.refreshToken, chavePublica, function (err, decoded) {
        if (err) {
            if (err.name == "TokenExpiredError") {
                res.status(400).send({
                    msg: "token expirado"
                })
            } else {
                res.status(400).send({
                    msg: "token incorreto"
                })
            }

        } else {
            if (decoded.type == "refreshToken") {

                var user = {
                    id: decoded.id,
                    email: decoded.email
                }

                let token = jwt.sign(user, chavePrivada, {
                    expiresIn: "2h",
                    algorithm: "RS256"
                })

                res.send({
                    token: token,
                    expiresIn: 7200
                })
            } else {
                res.status(400).send({
                    msg: "token incorreto"
                })
            }
        }
    })
})

module.exports = router;