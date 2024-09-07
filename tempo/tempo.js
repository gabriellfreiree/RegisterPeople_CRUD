const client = require("../conn/mongodb")


var times = client.db("projeto_tap_registro").collection("times")

async function get_time(tipo, time){
    await times.insertOne({
        tipo: tipo,
        time: time
    })
    
}

module.exports = get_time