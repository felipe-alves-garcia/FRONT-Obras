"use server"

export const listarChamadosFiltros = async (pendent:Boolean, received:Boolean, working:Boolean, finished:Boolean, token:string) => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}`
    const errosAPI: string[] = []

    const bodyFiltro = [
        {
            "ticketStatus": "PENDENT",
            "checkField": pendent
        },
        {
            "ticketStatus": "RECEIVED",
            "checkField": received
        },
        {
            "ticketStatus": "WORKING",
            "checkField": working
        },
        {
            "ticketStatus": "FINISHED",
            "checkField": finished
        }
    ]

    //---

    try{
        const response = await fetch(`${url}/chamado/filtro`, {
            headers:{"Content-Type": "application/json", "authorization": token},
            method:"POST",
            body:JSON.stringify(bodyFiltro)
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