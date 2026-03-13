"use client"

import { listarChamados } from "@/app/action/listar-chamados"
import { urlApi } from "@/app/action/url-api"

import { useState, useEffect } from "react"

const ListarChamados = () => {

    const [ url, setUrl ] = useState("")
    const [ chamadosAtivos, setChamadosAtivos ] = useState([{
        ticket: {
            id:"",
            hashCode:"",
            chamadoStatus:"",    
            description:"",
            ticketClassification:"",
            ticketStatus:""    
        },
        imageURI:""
    }])

    useEffect(() => {
        urlApi().then((resp) => {
            setUrl(resp)
        }).catch((error) => {
            console.log("Erro --> ", error)
        })
        listarChamados().then((resp) => {
            setChamadosAtivos(resp.data)
        }).catch((error) => {
            console.log("Erro --> ", error)
        })
    }, [])

    return (
        <div>
            <h2 className="text-xl text-gray-700 font-bold mb-5 pl-5">Chamados Não Finalizados</h2>
            <div className="flex flex-wrap justify-center pb-30">
                {
                    chamadosAtivos.map((chamado) => {
                        return (
                            <a key={chamado?.ticket?.id} href={`/dashboard/chamado/${chamado?.ticket?.hashCode}`} className="mx-3 my-3 block bg-gray-100 w-90 rounded-xl p-3 border-1 hover:border-blue-400 hover:bg-blue-100 hover:opacity-90 cursor-pointer shadow">
                                <div className="w-full h-45 rounded-xl">
                                    {
                                        chamado?.imageURI != null && (
                                            <img
                                                src={`${url}${chamado?.imageURI}`}
                                                className="w-full h-full object-cover overflow-hidden rounded-xl"
                                            />        
                                        )
                                    }
                                    {
                                        chamado?.imageURI == null && (
                                            <div className="w-full h-full flex justify-center items-center bg-blue-100 rounded-xl border-blue-300 border-2">
                                                <div className="w-20 h-20 rounded-[100] flex justify-center items-center border-blue-300 border-2">
                                                    <i className="text-4xl bi bi-file-text text-blue-300 font-bold"></i>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="px-2 py-5">
                                    <div className="font-medium text-blue-400">
                                        <div className="mb-5 mt-3 flex justify-between">
                                            {
                                                chamado?.ticket?.ticketClassification == "LIGHT_FIXTURE_INSTALLATION" && (
                                                    <p className="bg-blue-100 px-5 py-2 inline rounded-xl border-blue-400 border-1"> Instalação de Iluminária</p>
                                                )
                                            }
                                            {
                                                chamado?.ticket?.ticketClassification == "LIGHT_ON_DURING_DAYTIME" && (
                                                        <p className="bg-blue-100 px-5 py-2 inline rounded-xl border-blue-400 border-1"> Lâmpada Acesa ao Dia</p>
                                                )
                                            }
                                            {
                                                chamado?.ticket?.ticketClassification == "LOOSE_WIRE" && (
                                                        <p className="bg-blue-100 px-5 py-2 inline rounded-xl border-blue-400 border-1"> Fio Solto</p>
                                                )
                                            }
                                            {
                                                chamado?.ticket?.ticketClassification == "BLINKING_LIGHT" && (
                                                        <p className="bg-blue-100 px-5 py-2 inline rounded-xl border-blue-400 border-1"> Lâmpada Piscando</p>
                                                )
                                            }
                                            {
                                                chamado?.ticket?.ticketClassification == "LIGHT_BULB_OFF" && (
                                                        <p className="bg-blue-100 px-5 py-2 inline rounded-xl border-blue-400 border-1"> Lâmpada Apagada</p>
                                                )
                                            }
                                            {
                                                chamado?.ticket?.ticketClassification == "NO_LIGHT_BULB" && (
                                                        <p className="bg-blue-100 px-5 py-2 inline rounded-xl border-blue-400 border-1"> Sem Lâmpada</p>
                                                )
                                            }
                                            {
                                                chamado?.ticket?.ticketClassification == "VANDALISM" && (
                                                        <p className="bg-blue-100 px-5 py-2 inline rounded-xl border-blue-400 border-1"> Vandalismo</p>
                                                )
                                            }  


                                            {
                                                chamado?.ticket?.ticketStatus == "PENDENT" && (
                                                    <div className="px-5 bg-red-400 rounded-[100]"></div>
                                                )
                                            }
                                            {
                                                chamado?.ticket?.ticketStatus == "RECIEVED" && (
                                                    <div className="px-5 bg-yellow-400 rounded-[100]"></div>
                                                )
                                            }
                                            {
                                                chamado?.ticket?.ticketStatus == "WORKING" && (
                                                    <div className="px-5 bg-green-400 rounded-[100]"></div>
                                                )
                                            }
                                            {
                                                chamado?.ticket?.ticketStatus == "FINISHED" && (
                                                    <div className="px-5 bg-blue-400 rounded-[100]"></div>
                                                )
                                            }
                                        </div>
                                        <p>Código: <span className="leading-5 font-bold text-gray-700">{chamado?.ticket?.hashCode}</span></p>
                                        <p>Descrição: <span className="leading-5 font-bold text-gray-700">{chamado?.ticket?.description}</span></p>
                                    </div>    
                                </div>
                            </a>    
                        )
                    })
                }    
            </div>
        </div>
    )
}

export default ListarChamados