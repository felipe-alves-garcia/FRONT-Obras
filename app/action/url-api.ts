"use server"

export const urlApi = async () => {

    const url = `${process.env.URL_API}:${process.env.PORT_API}`

    return url
}