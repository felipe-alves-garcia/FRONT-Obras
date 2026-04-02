"use server"

export const listarChamadosFiltros = async (pendent:Boolean, recieved:Boolean, working:Boolean, finished:Boolean) => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}`

    const bodyFiltro = [
        {
            "ticketStatus": "PENDENT",
            "checkField": pendent
        },
        {
            "ticketStatus": "RECEIVED",
            "checkField": recieved
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
            headers:{"Content-Type": "application/json"},
            method:"POST",
            body:JSON.stringify(bodyFiltro)
        })
        const data = await response.json()
        return {data:data, error:""}
    } catch(error){
        console.log("Erro --> ", error)
        return {data:[], error:"Não foi possível listar chamados"}
    }

}