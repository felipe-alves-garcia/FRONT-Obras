"use server"

export const verifyBuscarChamado = async (prevState: any, formData: FormData) => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}/`
    let errosAPI: string[] = []

    //---
    
    const formValues = {
        codigo: formData.get("codigo")
    }

    //---

    let exist:Boolean = false
    let id: string = ""
    try {
        const response = await fetch(`${url}chamado/hash?code=${formValues.codigo}`, {
            method: "GET",
        })    
        if (response.status == 200){
            exist = true
            const data = await response.json()
            id = data.ticket.id
        }
    } catch (error) {
        console.error("Erro -->", error)
        errosAPI.push("Erro ao se conectar com a API e com o Banco de Dados.")
    }

    return {
        id:id,
        status:exist,
        hashcode:formValues.codigo,
        errosAPI:errosAPI
    }

}