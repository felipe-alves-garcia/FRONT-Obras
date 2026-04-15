"use server"

import { z } from "zod"

const abrirChamadoSchema = z.object({
    name: z.string().trim().min(3,{error:"Nome muito pequeno"}).max(100, {error:"Nome muito grande"}),
    email: z.string().email({error:"E-mail inválido"}),
    description: z.string().trim().min(2,{error:"Descrição muito pequena"}).max(200, {error: "Descrição muito grande"}),
    street: z.string().trim().min(2,{error:"Nome de rua muito pequeno"}).max(150, {error: "Nome de bairro muito grande"}),
    block: z.string().trim().min(2,{error:"Nome de bairro muito pequeno"}).max(80, {error: "Nome de rua muito grande"}),
    referencePoint: z.string().trim().min(2,{error:"Nome de ponto de referência muito pequeno"}).max(100, {error: "Ponto de referência muito grande"}),
    phoneNumber: z.string({error:"Número de telefone inválido"})
        .regex(/^\d+$/, { error: "Número de telefone deve conter apenas números. " })
        .min(11, {error:"Número de telefone muito pequeno (ex:51912345678). "})
        .max(11, {error:"Número de telefone muito grande (ex:51912345678). "})
})

export const verifyFormValues = async (
    name:string,
    email:string,
    street:string,
    block:string,
    description:string,
    referencePoint:string,
    phoneNumber:string,
    file:File | null
) => {

    const MAX_SIZE_IMG = 5 * 1024 * 1024

    const verify = abrirChamadoSchema.safeParse({
        name: name,
        email: email,
        street: street,
        block: block,
        description: description,
        referencePoint: referencePoint,
        phoneNumber: String(phoneNumber),
    })

    const verifyFile = (file != null && file.size > MAX_SIZE_IMG) ? false : true
    if(!verify.success){
        return {
            error: {
                name:verify.error.flatten().fieldErrors?.name || null,
                email:verify.error.flatten().fieldErrors?.email || null,
                phoneNumber:verify.error.flatten().fieldErrors?.phoneNumber || null,
                referencePoint:verify.error.flatten().fieldErrors?.referencePoint || null,
                street:verify.error.flatten().fieldErrors?.street || null,
                block:verify.error.flatten().fieldErrors?.block || null,
                description:verify.error.flatten().fieldErrors?.description || null
            },
            status:false,
            imagem: verifyFile,
        }
    }
    return {
        error: {
            name:null,
            email:null,
            phoneNumber:null,
            referencePoint:null,
            street:null,
            block:null,
            description:null
        },
        imagem:verifyFile,
        status: (verifyFile) ? true : false
    }
    
}