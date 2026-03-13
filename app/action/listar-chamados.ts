"use server"

export const listarChamados = async () => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}/`

    //---

    try{
        const response = await fetch(`${url}chamado/ativo`)
        const data = await response.json()
        return {data:data, error:""}
    } catch(error){
        console.log("Erro --> ", error)
        return {data:[], error:"Não foi possível listar chamados"}
    }

}