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
    try {
        const response = await fetch(`${url}chamado/hash?code=${formValues.codigo}`, {
            method: "GET",
        })    
        if (response.status == 200) exist = true
    } catch (error) {
        console.error("Erro -->", error)
        errosAPI.push("Erro ao se conectar com a API e com o Banco de Dados.")
    }

    return {
        status:exist,
        hashcode:formValues.codigo,
        errosAPI:errosAPI
    }

}