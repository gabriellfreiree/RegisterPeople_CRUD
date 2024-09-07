import { Auth } from "./auth.js"

export async function isLoged(){
    if(Auth.isLoged()){
        if(Auth.isExpired()){
            try{
                await Auth.refreshToken()
            }catch {
                window.location = "/logar"
            }
        }
    }else{
        window.location = "/logar"
    }
}

isLoged()
