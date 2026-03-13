"use server"

export const buscarStatus = async () => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}/`

    //---

    try{
        const response = await fetch(`${url}chamado/status`)
        const data = await response.json()
        let newData = [
            {
                status:"PENDENT",
                count:0
            },
            {
                status:"RECIEVED",
                count:0
            },
            {
                status:"WORKING",
                count:0
            },
            {
                status:"FINISHED",
                count:0
            }
        ]
        for (let i=0; i<data.length; i++){
            for (let n=0; n<newData.length; n++){
                if (data[i].status == newData[n].status) newData[n].count = data[i].count
            }
        }
        return newData
    } catch(error){
        console.log("Erro --> ",error)
    }

}