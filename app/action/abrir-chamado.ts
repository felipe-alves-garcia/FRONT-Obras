"use server"

import { redirect } from "next/navigation"

export const abrirChamado = async (prevState: any, formData: FormData) => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}/`
    const errosAPI: string[] = []

    //---

    const bodyData = new FormData()
    const image = formData.get("foto") as File
    const formValues = {
        description: formData.get("descricao"),
        latitude: formData.get("latitude"),
        longitude: formData.get("longitude"),
        street: formData.get("rua"),
        block: formData.get("bairro"),
        referencePoint: formData.get("ponto"),
        ticketClassification: formData.get("tipo"),
        citizen:{
            name: formData.get("nome"),
            email: formData.get("email"),
            phoneNumber: Number(formData.get("telefone")),  
        }
    }

    //---

    const jsonBlob = new Blob([JSON.stringify(formValues)], { type: "application/json" })   
    bodyData.append("data", jsonBlob)
    bodyData.append("file", image)

    //---

    let urlRedirect = "/abrir-chamado"
    try {
        const response = await fetch(`${url}chamado`, {
            method: "POST",
            body: bodyData,
        })    
        const responseData = await response.json()
        urlRedirect = `/codigo/${responseData.ticket.hashCode}`
    } catch (error) {
        console.error("Erro --> ", error)
        errosAPI.push("Erro ao se conectar com a API e com o Banco de Dados.")
        return { errosAPI: errosAPI, values: formValues, imagem:true }
    }
    redirect(urlRedirect)
}