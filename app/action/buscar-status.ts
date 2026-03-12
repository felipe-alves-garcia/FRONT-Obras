"use server"

export const buscarStatus = async () => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}/`

    //---

    try{
        const response = await fetch(`${url}chamado/status`)
        const data = await response.json()
        return data
    } catch(error){
        console.log("Erro --> ",error)
    }

}