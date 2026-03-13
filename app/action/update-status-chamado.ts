"use server"

export const updateStatusChamado = async (id: string, status: string) => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}/`

    //---

    try{
        await fetch(`${url}chamado/${id}`, {
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({ticketStatus:status}),
            method:"PUT"
        })
    } catch(error){
        console.log("Erro --> ", error)
    }

}