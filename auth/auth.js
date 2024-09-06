var jwt = require("jsonwebtoken")
var fs = require("fs")
var chavePublica = fs.readFileSync("./keys/chavePublica.pem")

function auth(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send({
            msg: "Usuario nao autorizado"
        })
        return;
    }
    var auth = req.headers.authorization
    var token = auth.slice(auth.indexOf(" ") + 1, auth.length)
    
    jwt.verify(token, chavePublica, function (err, decoded) {
        if (err) {
            if (err.name == "TokenExpiredError") {
                res.status(401).send({
                    msg: "token expirado"
                })

            } else {
                res.status(500).send({
                    msg: "erro: " + err.message
                })
            }
        } else {
            req.user = decoded
            next()
        }
    })
}

module.exports = auth