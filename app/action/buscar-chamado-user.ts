"use server"

export const buscarChamadoUser = async (id:string) => {
    const url = `${process.env.URL_API}:${process.env.PORT_API}/`
    const errosAPI: string[] = []

    //---

    try{
        const response = await fetch(`${url}chamado/hash?code=${id}`, {
            method:"GET",
        })
        const data = await response.json()
        
        if (data?.statusCode == 404){
            errosAPI.push("Erro ao se conectar com a API e com o Banco de Dados.")
            return { errosAPI: errosAPI, data:{}}
        }
        
        return {data:data, errosAPI: errosAPI}
    }
    catch (error){
        console.log("Erro --> ", error)
        errosAPI.push("Erro ao se conectar com a API e com o Banco de Dados.")
        return { errosAPI: errosAPI, data:{}}   
    }

}