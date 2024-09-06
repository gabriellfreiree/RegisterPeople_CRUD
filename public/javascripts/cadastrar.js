import {Auth} from "./auth.js"

document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("#cadastrar").addEventListener("click", async function(){
        var email = document.querySelector("#email").value
        var password = document.querySelector("#password").value

        try{
            await Auth.register(email, password)
            window.location = "/logar"
        }catch {
            alert("Erro ao cadastrar")
        }
        
    })

})