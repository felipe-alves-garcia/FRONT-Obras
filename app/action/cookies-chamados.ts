"use server"

import { cookies } from "next/headers";

const verifyCookiesChamados = (chamados: string[], chamado: string) => {
    let existe: boolean = true
    chamados.forEach((c: string) => {
        if (c == chamado) {
            existe = false
        }    
    })
    return existe
}

export const setCookiesChamados = async (id: string) => {
    const cookieStore = await cookies()
    const chamados = cookieStore.get("chamados")?.value

    if (chamados == undefined) {
        cookieStore.set({
            name: "chamados",
            value: JSON.stringify([id]),
        });
    } else {
        const chamadosArray = JSON.parse(chamados)
        if (verifyCookiesChamados(chamadosArray, id)) {
            chamadosArray.push(id)
            cookieStore.set({
                name: "chamados",
                value: JSON.stringify(chamadosArray),
            });
        }
    }
}

export const setCookiesToken = async (token: string) => {
    try{
        const cookieStore = await cookies()
        cookieStore.set({
            name: "token",
            value: JSON.stringify([token]),
        });    
        return true
    } catch(error){
        return false
    }
    

}

export const deleteCookieChamado = async ({id}: {id: string}) => {
    const cookieStore = await cookies()
    const chamados = cookieStore.get("chamados")?.value

    if (chamados == undefined) {
        cookieStore.set({
            name: "chamados",
            value: JSON.stringify([id]),
        });
    } else {
        const chamadosArray = JSON.parse(chamados)
        const chamadosArrayFilter = chamadosArray.filter((chamado: string) => chamado !== id)
        cookieStore.set({
            name: "chamados",
            value: JSON.stringify(chamadosArrayFilter),
        });
    }
}