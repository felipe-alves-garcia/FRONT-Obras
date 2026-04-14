"use server"

export const updateStatusChamado = async (id: string, status: string, token: string, generalDescription:string, internalDescription:string) => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}/`
    const errosAPI: string[] = []

    //---

    try{
        if(generalDescription == "") return {errosAPI: [], data:{}, erro:"*Comentário Obrigatório", status:false}
        const response = await fetch(`${url}chamado/${id}`, {
            headers:{"Content-Type": "application/json", "Authorization": token},
            body:JSON.stringify({ticketStatus:status, generalDescription:generalDescription, internalDescription:internalDescription}),
            method:"PUT"
        })
        const data = await response.json()
        if(data?.status == 400){
            errosAPI.push("Erro ao se conectar com a API e com o Banco de Dados.")
            return {errosAPI: errosAPI, data:{}, erro:"", status:false}
        }
        return {errosAPI:[], data:data, erro:"", status:true} 
    } catch(error){
        console.log("Erro --> ", error)
        errosAPI.push("Erro ao se conectar com a API e com o Banco de Dados.")
        return {errosAPI: errosAPI, data:{}, erro:"", status:false}
    }

}