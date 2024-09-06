import { cadastrar } from "./registros.js"

document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("#cadastrar").addEventListener("click", async function(){
        var nome = document.querySelector("#nome").value
        var idade = document.querySelector("#idade").value
        var sexo = document.querySelector("#sexo").value
        var cep = document.querySelector("#cep").value

        try{
            await cadastrar(nome, idade, sexo, cep)
            //window.location = "/listar"
        }catch {
            alert("Erro ao cadastrar")
        }
        
    })

})