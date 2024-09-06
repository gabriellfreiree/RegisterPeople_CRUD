import { Auth } from "./auth.js";

export async function list(){

    let registros = await fetch("/listar_registros", {
        headers: {
            authorization: Auth.getAuth().token
        }
    })

    if(registros.ok){
        let json = await registros.json()
        return json
    }else{
        throw new Error("Erro ao listar produtos")
    }


}

export async function find_one(id){

    let registros = await fetch("/listar_registros/" + id, {
        headers: {
            authorization: Auth.getAuth().token
        }
    })

    if(registros.ok){
        let json = await registros.json()
        return json
    }else{
        throw new Error("Erro ao listar produtos")
    }


}

export async function cadastrar(nome, idade, sexo, cep){
    let body = {
        nome: nome,
        idade: idade,
        sexo: sexo,
        cep: cep
    }

    console.log(nome)

    body = JSON.stringify(body)

    let response = await fetch("/cadastrar", {
        method: "POST",
        headers: {
            authorization: Auth.getAuth().token,
            "Content-Type": "application/json",
        
        },

        body: body
    })


    if(response.ok){
        return true
    }else{
        throw new Error("Erro ao cadastrar")
    }

}

export async function update(id, nome, idade, sexo, cep){
    let body = {
        nome: nome,
        email: email,
        sexo: sexo,
        cep: cep
    }

    body = JSON.stringify(body)

    let response = await fetch("/atualizar/" + id, {
        method: "PUT",
        headers: {
            authorization: Auth.getAuth().token,
            "Content-Type": "application/json"
        },

        body: body
    })


    if(response.ok){
        return true
    }else{
        throw new Error("Erro ao atualizar")
    }

}

export async function deletar(id){

    let response = await fetch("/deletar/"+ id, {
        method: "DELETE",
        headers: {
            authorization: Auth.getAuth().token,
            "Content-Type": "application/json"
        }
    })


    if(response.ok){
        return true
    }else{
        throw new Error("Erro ao cadastrar")
    }

}