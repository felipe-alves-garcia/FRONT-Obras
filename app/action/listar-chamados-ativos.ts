"use server"

export const listarChamadosAtivos = async (token:string) => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}`
    const errosAPI: string[] = []

    //---

    try{
        const response = await fetch(`${url}/chamado/ativo`,{
            headers:{"Content-Type": "application/json", "authorization": token}
        })
        const data = await response.json()
        if (data.status == 500) return {data:{}, error:"", errosAPI: errosAPI, invalido:true}
        return {data:data, error:"", errosAPI: errosAPI, invalido:false}
    } catch(error){
        console.log("Erro --> ", error)
        errosAPI.push("Erro ao se conectar com a API e com o Banco de Dados.")
        return {data:[], error:"Não foi possível listar chamados", errosAPI: errosAPI, invalido:false}
    }

}