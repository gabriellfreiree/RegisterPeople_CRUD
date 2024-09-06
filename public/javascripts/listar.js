import {deletar, list} from "./registros.js"
import {isLoged} from "./authUser.js"

document.addEventListener("DOMContentLoaded", function () {
    isLoged()

    var tabela = document.querySelector("#table")

    var results = list().then((results) => {
        for (let result of results) {
            var tr = document.createElement("tr")

            var nome = document.createElement("td")
            nome.innerText = result.nome

            var idade = document.createElement("td")
            idade.innerText = result.idade

            var sexo = document.createElement("td")
            sexo.innerText = result.sexo

            var cep = document.createElement("td")
            cep.innerText = result.cep

            var endereco = document.createElement("td")
            endereco.innerText = result.rua

            var opcoes = document.createElement("td")

            var botoes = document.createElement("div")
            botoes.classList = "flex space-x-1"

            var atualizar = document.createElement("a")
            atualizar.href = "/atualizar?id=" + result._id
            atualizar.classList = "bg-colorbutton hover:bg-blue-700 text-white font-bold py-1 px-4 rounded shadow-inner shadow-md"
            atualizar.innerText = "editar"

            var excluir = document.createElement("a")
            excluir.classList = "bg-colorbutton hover:bg-blue-700 text-white font-bold py-1 px-4 rounded shadow-inner shadow-md"
            excluir.innerText = "excluir"
            excluir.setAttribute("registro", result._id)
            excluir.id = "excluir"
            
            opcoes.append(botoes)
            botoes.append(atualizar, excluir)
            tr.append(nome, idade, sexo, cep, endereco, opcoes)
            
            tabela.appendChild(tr)
        }

        document.querySelectorAll("#excluir").forEach((botao) => {
            botao.addEventListener("click", function(botao){
                deletar(botao.target.getAttribute("registro")).then(()=> {
                    window.location = "/listar"
                })
                
            })
        })
    })




})