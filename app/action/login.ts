"use server"

import { setCookiesToken } from "./cookies-chamados"

import { redirect } from "next/navigation"
import { z } from "zod"

const loginSchema = z.object({
    cpf: z.string().min(11, {error:"CPF Inválido"}).max(12, {error:"CPF Inválido"}),
    password: z.string().max(30, {error:"Senha muito grande"})
})

export const loginUser = async (prevState:any, formData:FormData) => {
    
    const url = `${process.env.URL_API}:${process.env.PORT_API}/`
    const errosAPI: string[] = []

    //---

    const formValues = {
        cpf: formData.get("cpf"),
        password: formData.get("password")
    }
    
    const verify = loginSchema.safeParse({
        cpf: formValues.cpf,
        password: formValues.password
    })

    if(!verify.success){
        return{
            error: verify.error.flatten().fieldErrors,
            values: formValues
        }
    }

    //---

    let verifyCookies: Boolean = false
    try{
        const response = await fetch(`${url}auth`, {
            headers: {
                "Content-Type": "application/json" // Avisa o servidor que você está enviando JSON
            },
            method:"POST",
            body:   JSON.stringify(formValues)
        })
        const resp = await response.json()
        const token = resp.token

        if (token == undefined) return {
            error: {
                cpf:"CPF ou senha está incorreto",
                password:"CPF ou senha está incorreto",
            },
            values: formValues
        }

        verifyCookies = await setCookiesToken(token)
        
    } catch(error){
        console.log("Erro --> ", error)
        errosAPI.push("Erro ao se conectar com a API e com o Banco de Dados.")
    }
    
    if (verifyCookies) redirect("/dashboard")

    return { errosAPI: errosAPI }
}

