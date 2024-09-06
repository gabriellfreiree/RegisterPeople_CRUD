import { Auth } from "./auth.js"

export async function isLoged(){
    if(Auth.isLoged()){
        if(Auth.isExpired()){
            try{
                await Auth.refreshToken()
            }catch {
                alert("Erro ao gerar novo token")
                //window.location = "/logar"
            }
        }
    }else{
        alert("Erro ao logar")
        window.location = "/logar"
    }
}

isLoged()

