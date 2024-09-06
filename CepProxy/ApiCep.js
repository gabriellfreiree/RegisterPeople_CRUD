class ApiCep{
    static async getResource(cep){
        var resourceCep = await fetch("https://viacep.com.br/ws/"+cep+"/json/")
        if(resourceCep.ok){
            var cep = await resourceCep.json()
        }else{
            var cep = {}
        }
       
        return cep;
    }
}

module.exports = ApiCep