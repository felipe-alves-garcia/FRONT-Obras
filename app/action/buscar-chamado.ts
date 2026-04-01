"use server"

export const buscarChamado = async (id:string) => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}/`
    const errosAPI: string[] = []

    //---

    try{
        const response = await fetch(`${url}chamado/hash?code=${id}`, {
            method:"GET"
        })
        return {data:await response.json(), errosAPI: errosAPI}
    }
    catch (error){
        console.log("Erro --> ", error)
        errosAPI.push("Erro ao se conectar com a API e com o Banco de Dados.")
        return { errosAPI: errosAPI, data:{}}
    }

}