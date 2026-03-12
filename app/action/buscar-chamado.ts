"use server"

export const buscarChamado = async (id:string) => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}/`

    //---

    try{
        const response = await fetch(`${url}chamado/hash?code=${id}`, {
            method:"GET"
        })
        return await response.json()
    }
    catch (error){
        console.log("Erro --> ", error)
    }

}