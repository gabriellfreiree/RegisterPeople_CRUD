import { Auth } from "./auth.js"

document.addEventListener("DOMContentLoaded", function(){
    if(Auth.isLoged()){
        document.querySelector("#deslogar").innerText = "Deslogar"
    }else{
         document.querySelector("#deslogar").innerText = "Login"
         document.querySelector("#deslogar").addEventListener("click", function(){
            window.location = "/logar"
         })
    }

    document.querySelector("#deslogar").addEventListener("click", function(){
        if(localStorage["auth"]){
            localStorage.removeItem("auth")
            window.location = "/logar"
        }
        
    })
})