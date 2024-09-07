import { find_one, update } from "./registros.js"

document.addEventListener("DOMContentLoaded", function(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var data = url.searchParams.get("id");

    var nome = document.querySelector("#nome")
    var idade = document.querySelector("#idade")
    var sexo = document.querySelector("#sexo")
    var cep = document.querySelector("#cep")

    find_one(data).then((registro) => {
        nome.value = registro.nome
        idade.value = registro.idade
        sexo.value = registro.sexo
        cep.value = registro.cep
    })

    document.querySelector("#atualizar").addEventListener("click", async function(){
        try{
            await update(data, nome.value, idade.value, sexo.value, cep.value)
            window.location = "/listar"
        }catch (error){
            alert("Erro ao atualizar: " + error)
        }
        
        
    })


})