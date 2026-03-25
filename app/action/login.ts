"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

const loginSchema = z.object({
    cpf: z.string().min(11, {error:"CPF Inválido"}).max(12, {error:"CPF Inválido"}),
    password: z.string().min(8, {error:"Senha muito pequena"})
})

export const loginUser = async (prevState:any, formData:FormData) => {
    
    const url = `${process.env.URL_API}:${process.env.PORT_API}/`

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



    //---

    try{
        const response = await fetch(`${url}/auth`, {
            method:"POST",
            body: JSON.stringify(formValues)
        })
        console.log(response)
    } catch(error){
        console.log("Erro --> ", error)
    }

}

