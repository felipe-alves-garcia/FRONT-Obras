"use server"

import { redirect } from "next/navigation"

export const verifyBuscarChamado = async (prevState: any, formData: FormData) => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}/`

    //---
    
    const formValues = {
        codigo: formData.get("codigo")
    }

    //---

    console.log(url)
    let exist:Boolean = false
    try {
        const response = await fetch(`${url}chamado/hash?code=${formValues.codigo}`, {
            method: "GET",
        })    
        if (response.status == 200) exist = true
    } catch (error) {
        console.error("Erro -->", error)
    }
    return {
        status:exist,
        hashcode:formValues.codigo
    }

}