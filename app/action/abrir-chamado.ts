"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

const abrirChamadoSchema = z.object({
    name: z.string().trim().min(3,{error:"Nome muito pequeno"}).max(100, {error:"Nome muito grande"}),
    email: z.string().email({error:"E-mail inválido"}),
    description: z.string().trim().max(200, {error: "Descrição muito grande"}),
    street: z.string().trim().max(150, {error: "Nome de bairro muito grande"}),
    block: z.string().trim().max(80, {error: "Nome de rua muito grande"}),
    referencePoint: z.string().trim().max(100, {error: "Ponto de referência muito grande"}),
    phoneNumber: z.string({error:"Número de telefone inválido"})
        .regex(/^\d+$/, { error: "Número de telefone deve conter apenas números. " })
        .min(11, {error:"Número de telefone muito pequeno (ex:51912345678). "})
        .max(12, {error:"Número de telefone muito grande (ex:51912345678). "})
})


export const abrirChamado = async (prevState: any, formData: FormData) => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}/`

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

    const verify = abrirChamadoSchema.safeParse({
        name: formValues.citizen.name,
        email: formValues.citizen.email,
        street: formValues.street,
        block: formValues.block,
        description: formValues.description,
        referencePoint: formValues.referencePoint,
        phoneNumber: String(formValues.citizen.phoneNumber),
    })

    if(!verify.success){
        return {
            error: verify.error.flatten().fieldErrors,
            values: formValues
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
    }
    redirect(urlRedirect)

}