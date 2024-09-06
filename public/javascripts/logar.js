import { Auth } from "./auth.js"
document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("#logar").addEventListener("click", async function(){
        var email = document.querySelector("#email").value
        var password = document.querySelector("#password").value
        try{
            await Auth.login(email, password)
            window.location = "/"
        }catch{
            alert("Erro ao logar")
        }
        

    })
})