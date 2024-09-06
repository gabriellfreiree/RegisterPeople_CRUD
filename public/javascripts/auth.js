export class Auth{
    static storage = localStorage

    static isLoged(){
        if(this.storage["auth"]){
            return true
        }else{
            return false
        }
    }

    static isExpired(){

        var tokenDate = Number(this.getAuth().date)

        if((Number(this.getAuth().expiresIn) * 1000) + tokenDate < new Date().getTime()){
            return true
        }else{
            return false
        }

    }

    static async login(email, password){
        var body = {
            email: email,
            password: password
        }

        body =  JSON.stringify(body)


        var response = await fetch("/auth/login", {
            body: body,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(response.ok){

            var auth = await response.json()

            auth = {
                ...auth,
                date: new Date().getTime()
            }

            this.storage["auth"] = JSON.stringify(auth)
        }else {
            throw new Error("Erro ao logar")
        }


    }

    static async register(email, password){

        var body = {
            email: email,
            password: password
        }

        body = JSON.stringify(body)

        var response = await fetch("/auth/register", {
            body: body,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(response.ok){
            return true
        }else{
            throw new Error("Erro ao cadastrar")
        }

    }

    static async refreshToken(){

        var refreshToken = this.getAuth().refreshToken 

        var body = {
            refreshToken: refreshToken
        }

        body = JSON.stringify(body)

        var response = await fetch("/auth/refreshToken", {
            body: body,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(response.ok){
           
            var auth = await response.json()

            auth = {
                ...auth,
                date: new Date().getTime(),
                refreshToken: refreshToken
            }

            this.storage["auth"] = JSON.stringify(auth)
        }else{
            throw new Error("Erro ao gerar novo token")
        }
    }

    static getAuth(){
        return JSON.parse(this.storage["auth"])
    }
}