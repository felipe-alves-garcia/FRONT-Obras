"use server"

export const buscarChamadoAdmin = async (id:string, token:string) => {
    const url = `${process.env.URL_API}:${process.env.PORT_API}/`
    const errosAPI: string[] = []

    //---

    try{
        const response = await fetch(`${url}chamado/admin/${id}`, {
            method:"GET",
            headers:{"Content-Type": "application/json", "authorization": token}
        })
        const data = await response.json()
        
        if (data?.status == 500) return { errosAPI: errosAPI, data:{}, invalido:true}
        if (data?.statusCode == 404){
            errosAPI.push("Erro ao se conectar com a API e com o Banco de Dados.")
            return { errosAPI: errosAPI, data:{}, invalido:false}
        }
        return {data:data, errosAPI: errosAPI, invalido:false}
    }
    catch (error){
        errosAPI.push("Erro ao se conectar com a API e com o Banco de Dados.")
        return { errosAPI: errosAPI, data:{}, invalido:false}   
    }

}