"use client"

import { buscarChamadoUser } from "@/app/action/buscar-chamado-user"
import { urlApi } from "@/app/action/url-api"

import LoadErros from "@/components/global/load-erros"
import Loading from "@/components/global/loading"

import { useEffect, useState } from "react"

const BuscarChamado = ({id}: {id:string}) => {

    /*
        - PENDENT
        - RECIEVED
        - WORKING
        - FINISHED
    */
    /*
        - LIGHT_FIXTURE_INSTALLATION
        - LIGHT_ON_DURING_DAYTIME
        - LOOSE_WIRE
        - BLINKING_LIGHT
        - LIGHT_BULB_OFF
        - NO_LIGHT_BULB
        - VANDALISM
    */

    const [ statusLoading, setStatusLoading ] = useState(false)
    const [ errosAPI, setErrosAPI ] = useState<string[]>([])
    const [ url, setUrl ] = useState("")
    const [ chamado, setChamado ] = useState({
        ticket:{
            description:"",
            referencePoint:"",
            street:"",
            block:"",
            ticketClassification:"",
            ticketStatus:"",
            hashCode:"",
            createdAt:[],
            updatedAt:[],
            latitude:0,
            longitude:0,
            id:"",
            ticketMessageList:[{
                ticketStatus:"",
                generalDescription:"",
                createdAt:"",
                internalUser:{
                    userName:""
                }

            }]
        },
        imageURI:null
    })

    useEffect(() => {
        urlApi().then((resp) => {
            setUrl(resp)
        }).catch((error) => {
            console.log("Erro --> ", error)
            setErrosAPI(["Erro interno do site.", error])
        })
        setStatusLoading(true)
        buscarChamadoUser(id).then((resp) => {
            setChamado(resp.data)
            setErrosAPI(resp.errosAPI)
            setStatusLoading(false)
        }).catch((error) => {
            setStatusLoading(false)
            console.log("Error --> ", error)
            setErrosAPI(["Erro interno do site.", error])
        })
    }, [])

    return (
        <>
            <Loading status={statusLoading}/>
            <LoadErros erros={errosAPI}/>
            {
                chamado?.ticket?.hashCode != "" && chamado.ticket != null && (
                    <>
                        <h1 className="mb-2 font-medium text-blue-400">Chamado: 
                            <span className="leading-5 text-lg font-bold text-gray-700">&nbsp;{chamado?.ticket?.hashCode}</span>
                        </h1>
                        {
                            chamado?.ticket?.ticketStatus == "PENDENT" && (
                                <div className="sm:px-20 pb-10 pt-5">
                                    <div className="w-full bg-red-200 py-10 rounded-3xl border-2 border-red-500">
                                        <p className="text-red-500 text-center font-bold text-xl">
                                            <i className="bi bi-envelope-paper-fill mr-5"></i>
                                            EM ABERTO
                                        </p>
                                    </div>  
                                    <div className="flex mt-1 px-1 space-x-px">
                                        <div className="py-1 bg-red-500 flex-1 rounded-xl"></div>
                                        <div className="py-1 flex-1 border-1 border-red-500 rounded-xl"></div>
                                        <div className="py-1 flex-1 border-1 border-red-500 rounded-xl"></div>
                                        <div className="py-1 flex-1 border-1 border-red-500 rounded-xl"></div>
                                    </div>  
                                </div>
                            )
                        }
                        {
                            chamado?.ticket?.ticketStatus == "RECEIVED" && (
                                <div className="sm:px-20 pb-10 pt-5">
                                    <div className="w-full bg-yellow-200 py-10 rounded-3xl border-2 border-yellow-500">
                                        <p className="text-yellow-500 text-center font-bold text-xl">
                                            <i className="bi bi-clipboard-data-fill mr-5"></i>
                                            EM ANÁLISE
                                        </p>
                                    </div>
                                    <div className="flex mt-1 px-1 space-x-px">
                                        <div className="py-1 bg-yellow-500 flex-1 rounded-xl"></div>
                                        <div className="py-1 bg-yellow-500 flex-1 rounded-xl"></div>
                                        <div className="py-1 flex-1 border-1 border-yellow-500 rounded-xl"></div>
                                        <div className="py-1 flex-1 border-1 border-yellow-500 rounded-xl"></div>
                                    </div>     
                                </div>
                            )
                        }
                        {
                            chamado?.ticket?.ticketStatus == "WORKING" && (
                                <div className="sm:px-20 pb-10 pt-5">
                                    <div className="w-full bg-green-200 py-10 rounded-3xl border-2 border-green-500">
                                        <p className="text-green-500 text-center font-bold text-xl">
                                            <i className="bi bi-tools mr-5"></i>
                                            EM TRABALHO
                                        </p>
                                    </div>  
                                    <div className="flex mt-1 px-1 space-x-px">
                                        <div className="py-1 bg-green-500 flex-1 rounded-xl"></div>
                                        <div className="py-1 bg-green-500 flex-1 rounded-xl"></div>
                                        <div className="py-1 bg-green-500 flex-1 rounded-xl"></div>
                                        <div className="py-1 flex-1 border-1 border-green-500 rounded-xl"></div>
                                    </div>       
                                </div>
                            )
                        }
                        {
                            chamado?.ticket?.ticketStatus == "FINISHED" && (
                                <div className="sm:px-20 pb-10 pt-5">
                                    <div className="w-full bg-blue-200 py-10 rounded-3xl border-2 border-blue-500">
                                        <p className="text-blue-500 text-center font-bold text-xl">
                                            <i className="bi bi-lightbulb-fill mr-5"></i>
                                            FINALIZADO
                                        </p>
                                    </div>  
                                    <div className="flex mt-1 px-1 space-x-px">
                                        <div className="py-1 bg-blue-500 flex-1 rounded-xl"></div>
                                        <div className="py-1 bg-blue-500 flex-1 rounded-xl"></div>
                                        <div className="py-1 bg-blue-500 flex-1 rounded-xl"></div>
                                        <div className="py-1 bg-blue-500 flex-1 rounded-xl"></div>
                                    </div>    
                                </div>
                            )
                        }  
                        <div className="flex justify-center mb-10">
                            <div className="bg-gray-100 w-100 text-center font-bold text-gray-400 py-5 border-4 rounded-[100]">
                                {
                                chamado?.ticket?.ticketClassification == "LIGHT_FIXTURE_INSTALLATION" && (
                                        <h2>Instalação de Iluminária</h2>
                                )
                                }
                                {
                                chamado?.ticket?.ticketClassification == "LIGHT_ON_DURING_DAYTIME" && (
                                        <h2>Lâmpada Acesa ao Dia</h2>
                                )
                                }
                                {
                                chamado?.ticket?.ticketClassification == "LOOSE_WIRE" && (
                                        <h2>Fio Solto</h2>
                                )
                                }
                                {
                                chamado?.ticket?.ticketClassification == "BLINKING_LIGHT" && (
                                        <h2>Lâmpada Piscando</h2>
                                )
                                }
                                {
                                chamado?.ticket?.ticketClassification == "LIGHT_BULB_OFF" && (
                                        <h2>Lâmpada Apagada</h2>
                                )
                                }
                                {
                                chamado?.ticket?.ticketClassification == "NO_LIGHT_BULB" && (
                                        <h2>Sem Lâmpada</h2>
                                )
                                }
                                {
                                chamado?.ticket?.ticketClassification == "VANDALISM" && (
                                        <h2>Vandalismo</h2>
                                )
                                }
                            </div>
                        </div>       
                        <p className="mb-2 font-medium text-blue-400">Criado em: 
                            <span className="leading-5 font-bold text-gray-700">&nbsp;{chamado?.ticket?.createdAt[0]}/{chamado?.ticket?.createdAt[1]}/{chamado?.ticket?.createdAt[2]}</span>
                        </p>  
                        <p className="mb-2 font-medium text-blue-400">Última Atualização em: 
                            <span className="leading-5 font-bold text-gray-700">&nbsp;{chamado?.ticket?.updatedAt[0]}/{chamado?.ticket?.updatedAt[1]}/{chamado?.ticket?.updatedAt[2]}</span>
                        </p>      
                        <p className="mb-2 font-medium text-blue-400">Ponto de Referência: 
                            <span className="leading-5 font-bold text-gray-700">&nbsp;{chamado?.ticket?.referencePoint}</span>
                        </p>  
                        <p className="mb-2 font-medium text-blue-400">Rua: 
                            <span className="leading-5 font-bold text-gray-700">&nbsp;{chamado?.ticket?.street}</span>
                        </p>  
                        <p className="mb-2 font-medium text-blue-400">Bairro: 
                            <span className="leading-5 font-bold text-gray-700">&nbsp;{chamado?.ticket?.block}</span>
                        </p>       
                        <p className="mb-2 font-medium text-blue-400">Descrição: 
                            <span className="leading-5 font-bold text-gray-700">&nbsp;{chamado?.ticket?.description}</span>
                        </p> 
                        {
                            chamado?.imageURI != null && (
                                <div className="flex justify-center sm:px-20 mt-10">
                                    <img className="w-full rounded-xl" src={`${url}${chamado?.imageURI}`}/>
                                </div>
                            )
                        }
                        <div className="mt-15 mb-20">
                            <p className="leading-5 text-lg font-bold text-gray-700 pb-3">
                                Alterações: 
                            </p>  
                            <div className="px-6 sm:px-10 py-6 sm:py-10 space-y-1 bg-gray-100 mb-15 rounded-3xl text-sm sm:text-md">
                                {
                                    chamado.ticket.ticketMessageList.map((update, index) => {
                                        return (
                                            <>
                                                {
                                                    update?.ticketStatus == "PENDENT" && (
                                                        <p className="text-gray-700">Atualizado para: <span className="font-bold text-gray-700">Em Aberto</span></p>
                                                    )
                                                }
                                                {
                                                    update?.ticketStatus == "RECEIVED" && (
                                                        <p className="text-gray-700">Atualizado para: <span className="font-bold text-gray-700">Em Análise</span></p>
                                                    )
                                                }
                                                {
                                                    update?.ticketStatus == "WORKING" && (
                                                        <p className="text-gray-700">Atualizado para: <span className="font-bold text-gray-700">Em Trabalho</span></p>
                                                    )
                                                }
                                                {
                                                    update?.ticketStatus == "FINISHED" && (
                                                        <p className="text-gray-700">Atualizado para: <span className="font-bold text-gray-700">Finalizado</span></p>
                                                    )
                                                }
                                                <p className="text-gray-700">Comentário Geral: <span className="font-bold text-gray-700">{update.generalDescription}</span></p>
                                                <p className="text-gray-700">Usuário Responsável: <span className="font-bold text-gray-700">{update.internalUser.userName}</span></p>
                                                <p className="text-gray-700">Data: <span className="font-bold text-gray-700">{update.createdAt[2]}/{update.createdAt[1]}/{update.createdAt[0]}</span></p>
                                                {
                                                    index != chamado.ticket.ticketMessageList.length-1 && (
                                                        <hr className="border-gray-200 border-2 my-3 "/>
                                                    )
                                                }
                                            </>
                                        )
                                    })
                                }    
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )

}

export default BuscarChamado