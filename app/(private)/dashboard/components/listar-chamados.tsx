"use client"

import { listarChamados } from "@/app/action/listar-chamados"

import { useState, useEffect } from "react"

const ListarChamados = () => {

    const [ chamados, setChamados ] = useState([{
        id:"",
        hashCode:"",
        chamadoStatus:"",    
        description:"",
        ticketClassification:"",
        ticketStatus:""
    }])

    useEffect(() => {
        listarChamados().then((resp) => {
            setChamados(resp.data)
        }).catch((error) => {
            console.log("Erro --> ", error)
        })
    }, [])

    return (
        <div>
            <h2 className="text-xl text-gray-700 font-bold mb-5 pl-5">Chamados Não Finalizados</h2>
            <div className="flex flex-wrap justify-start pb-30">
                {
                    chamados.map((chamado) => {
                        console.log(chamado)
                        return (
                            <a key={chamado?.id} className="mx-3 my-3 block bg-gray-100 w-90 rounded-xl p-3 border-1 hover:border-blue-400 hover:bg-blue-100 hover:opacity-90 cursor-pointer shadow">
                                <div className="w-full h-45 rounded-xl">
                                    <img
                                        src={"http://localhost:8080/uploads/"+chamado?.id+".jpg"}
                                        className="w-full h-full object-cover overflow-hidden rounded-xl"
                                    />
                                </div>
                                <div className="px-2 py-5">
                                    <div className="font-medium text-blue-400">
                                        <div className="mb-5 mt-3 flex justify-between">
                                            {
                                                chamado?.ticketClassification == "LIGHT_FIXTURE_INSTALLATION" && (
                                                    <p className="bg-blue-100 px-5 py-2 inline rounded-xl border-blue-400 border-1"> Instalação de Iluminária</p>
                                                )
                                            }
                                            {
                                                chamado?.ticketClassification == "LIGHT_ON_DURING_DAYTIME" && (
                                                        <p className="bg-blue-100 px-5 py-2 inline rounded-xl border-blue-400 border-1"> Lâmpada Acesa ao Dia</p>
                                                )
                                            }
                                            {
                                                chamado?.ticketClassification == "LOOSE_WIRE" && (
                                                        <p className="bg-blue-100 px-5 py-2 inline rounded-xl border-blue-400 border-1"> Fio Solto</p>
                                                )
                                            }
                                            {
                                                chamado?.ticketClassification == "BLINKING_LIGHT" && (
                                                        <p className="bg-blue-100 px-5 py-2 inline rounded-xl border-blue-400 border-1"> Lâmpada Piscando</p>
                                                )
                                            }
                                            {
                                                chamado?.ticketClassification == "LIGHT_BULB_OFF" && (
                                                        <p className="bg-blue-100 px-5 py-2 inline rounded-xl border-blue-400 border-1"> Lâmpada Apagada</p>
                                                )
                                            }
                                            {
                                                chamado?.ticketClassification == "NO_LIGHT_BULB" && (
                                                        <p className="bg-blue-100 px-5 py-2 inline rounded-xl border-blue-400 border-1"> Sem Lâmpada</p>
                                                )
                                            }
                                            {
                                                chamado?.ticketClassification == "VANDALISM" && (
                                                        <p className="bg-blue-100 px-5 py-2 inline rounded-xl border-blue-400 border-1"> Vandalismo</p>
                                                )
                                            }  


                                            {
                                                chamado?.ticketStatus == "PENDENT" && (
                                                    <div className="px-5 bg-red-400 rounded-[100]"></div>
                                                )
                                            }
                                            {
                                                chamado?.ticketStatus == "RECIEVED" && (
                                                    <div className="px-5 bg-yellow-400 rounded-[100]"></div>
                                                )
                                            }
                                            {
                                                chamado?.ticketStatus == "WORKING" && (
                                                    <div className="px-5 bg-green-400 rounded-[100]"></div>
                                                )
                                            }
                                            {
                                                chamado?.ticketStatus == "FINISHED" && (
                                                    <div className="px-5 bg-blue-400 rounded-[100]"></div>
                                                )
                                            }
                                        </div>
                                        <p>Código: <span className="leading-5 font-bold text-gray-700">{chamado?.hashCode}</span></p>
                                        <p>Descrição: <span className="leading-5 font-bold text-gray-700">{chamado?.description}</span></p>
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