"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect, useRef } from "react"

import { updateStatusChamado } from "@/app/action/update-status-chamado"
import { buscarChamadoAdmin } from "@/app/action/buscar-chamado-admin"
import { urlApi } from "@/app/action/url-api"

import LoadErros from "@/components/global/load-erros"
import Loading from "@/components/global/loading"
import { redirect } from "next/navigation"

//import L from "leaflet"
//import "leaflet/dist/leaflet.css"

const BuscarChamado = (props: {id: string, token: string}) => {
    const createMap = (latitude:number, longitude:number) => {
        import("leaflet").then((LModule) => {
            const L = LModule.default
            const map = L.map('map').setView([latitude, longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
            }).addTo(map);

            L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup("Local do chamado")
            .openPopup();  
        }).catch((error) => {
            console.log("Erro --> ", error)
            setErrosAPI(["Erro interno do site.", error] )
        })
    }

    //---

    const [ errosAPI, setErrosAPI ] = useState<string[]>([])
    const [ statusLoading, setStatusLoading ] = useState<boolean>(false)
    const [ url, setUrl ] = useState("")
    const [ erro, setErro ] = useState("")

    const [ modelStatus, setModelStatus ] = useState("hidden")
    const [ statusUpdate, setStatusUpdate ] = useState("")
    const [ generalDescription, setGeneralDescription ] = useState("")
    const [ internalDescription, setInternalDescription ] = useState("")

    const [ chamado, setChamado ] = useState({
        ticket:{
            citizen: {
                email:"",
                name:"",
                phoneNumber:""
            },
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
                internalDescription:"",
                createdAt:"",
                internalUser:{
                    userName:""
                }

            }]
        },
        imageURI:null
    })

    const carregarChamado = async () => {
        setStatusLoading(true)
        let invalido
        buscarChamadoAdmin(props.id, props.token).then((resp) => {
            invalido = resp.invalido
            if (resp.invalido) return
            setStatusLoading(false)
            setChamado(resp.data)
            setErrosAPI(resp.errosAPI)
            if (resp.errosAPI.length == 0)
                createMap(resp.data.ticket.latitude, resp.data.ticket.longitude)
        }).catch((error) => {
            setStatusLoading(false)
            console.log("Erro --> ", error)
            setErrosAPI(["Erro interno do site.", error] )
        })    
        if (invalido) redirect("/login")
    }

    const hasRun = useRef(false)
    useEffect(() => {
        if (hasRun.current) return
        hasRun.current = true

        urlApi().then((resp) => {
            setUrl(resp)
        }).catch((error) => {
            console.log("Erro --> ", error)
            setErrosAPI(["Erro interno do site.", error])
        })
        carregarChamado()
    }, [])    

    return (
        <>
            <Loading status={statusLoading}/>
            <LoadErros erros={errosAPI}/>
            {
                chamado?.ticket?.hashCode != "" && (
                    <>
                        <div className={`z-50 fixed w-full h-full left-0 top-0 flex items-center justify-center ${modelStatus}`}>
                            <button onClick={() => {
                                setModelStatus("hidden")
                                setGeneralDescription("")
                                setInternalDescription("")
                            }} className={`absolute h-full top-0 opacity-60 bg-black w-full`}></button>
                            <div className="absolute py-10 px-8 bg-white opacity-100 rounded-xl md:min-w-180 lg:min-w-200 flex items-center flex-col text-md leading-5 mx-2">
                                <div className="flex w-full sm:px-5 md:px-0 md:w-3/5 lg:w-1/2 justify-between items-center">
                                    <div className="text-[13px] sm:text-[16px]">
                                        {
                                            chamado?.ticket?.ticketStatus == "PENDENT" && (
                                                <div className="bg-red-100 px-5 text-center font-bold text-red-400 py-3 border-4 border-red-300 rounded-[100]">
                                                    <p>Em Aberto</p>
                                                </div>  
                                            )    
                                        }
                                        {
                                            chamado?.ticket?.ticketStatus == "RECEIVED" && (
                                                <div className="bg-yellow-100 px-5 text-center font-bold text-yellow-400 py-3 border-4 border-yellow-300 rounded-[100]">
                                                    <p>Em Análise</p>
                                                </div>  
                                            )    
                                        }
                                        {
                                            chamado?.ticket?.ticketStatus == "WORKING" && (
                                                <div className="bg-green-100 px-5 text-center font-bold text-green-400 py-3 border-4 border-green-300 rounded-[100]">
                                                    <p>Em Trabalho</p>
                                                </div>  
                                            )    
                                        }
                                        {
                                            chamado?.ticket?.ticketStatus == "FINISHED" && (
                                                <div className="bg-blue-100 px-5 text-center font-bold text-blue-400 py-3 border-4 border-blue-300 rounded-[100]">
                                                    <p>Finalisado</p>
                                                </div>  
                                            )    
                                        }
                                    </div>
                                    
                                    <div className="text-xl sm:text-3xl text-gray-500 px-3">
                                        <i className="bi bi-arrow-right-square"></i>
                                    </div>

                                    <div className="text-[13px] sm:text-[16px]">
                                        {
                                            statusUpdate == "PENDENT" && (
                                                <div className="bg-red-100 px-5 text-center font-bold text-red-400 py-3 border-4 border-red-300 rounded-[100]">
                                                    <p>Em Aberto</p>
                                                </div>  
                                            )    
                                        }
                                        {
                                            statusUpdate == "RECEIVED" && (
                                                <div className="bg-yellow-100 px-5 text-center font-bold text-yellow-400 py-3 border-4 border-yellow-300 rounded-[100]">
                                                    <p>Em Análise</p>
                                                </div>  
                                            )    
                                        }
                                        {
                                            statusUpdate == "WORKING" && (
                                                <div className="bg-green-100 px-5 text-center font-bold text-green-400 py-3 border-4 border-green-300 rounded-[100]">
                                                    <p>Em Trabalho</p>
                                                </div>  
                                            )    
                                        }
                                        {
                                            statusUpdate == "FINISHED" && (
                                                <div className="bg-blue-100 px-5 text-center font-bold text-blue-400 py-3 border-4 border-blue-300 rounded-[100]">
                                                    <p>Finalisado</p>
                                                </div>  
                                            )    
                                        }     
                                    </div>
                                </div>

                                <div className="w-full md:px-10 mt-4">
                                    <Label htmlFor="generalDescription">*Comentário Geral:</Label>
                                    <textarea 
                                        placeholder="Comentário OBRIGATÓRIO sendo público, ou seja, para a população e para Secretária de Obras..."
                                        value={generalDescription} 
                                        name="generalDescription" 
                                        className="border-3 w-full p-5 text-sm max-h-30"
                                        onChange={(e) => {setGeneralDescription(e.target.value)}}
                                    ></textarea> 
                                    {
                                        erro != "" && (
                                            <p className="ml-1 mt-1 text-xs text-red-500">{erro}</p>
                                        )
                                    }   
                                </div>
                                <div className="w-full md:px-10 mt-4">
                                    <Label htmlFor="internalDescription">Comentário Interno (Equipe):</Label>
                                    <textarea 
                                        placeholder="Comentário facultativo sendo privado, ou seja, somente para a Secretaria de Obras..."
                                        value={internalDescription} 
                                        name="internalDescription" 
                                        className="border-3 w-full p-5 text-sm max-h-30"
                                        onChange={(e) => {setInternalDescription(e.target.value)}}
                                    ></textarea>    
                                </div>
                                <div className="mt-5 sm:space-x-5 flex flex-col sm:flex-row w-full justify-center">
                                    <button
                                        className="text-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 sm:px-10 rounded-2xl mt-4"
                                        onClick={() => {
                                            let invalido
                                            setStatusLoading(true)
                                            updateStatusChamado(chamado?.ticket?.id, statusUpdate, props.token, generalDescription, internalDescription).then((resp) => {
                                                invalido = resp.invalido
                                                if (resp.invalido) return
                                                setErro(resp.erro)
                                                if(resp.erro == ""){
                                                    setStatusLoading(false)
                                                    setModelStatus("hidden")
                                                    setGeneralDescription("")
                                                    setInternalDescription("")
                                                    setChamado({
                                                        ticket:resp.data,
                                                        imageURI:chamado.imageURI || null,

                                                    })
                                                    setErrosAPI(resp.errosAPI)    
                                                }  
                                            }).catch((error) => {
                                                setStatusLoading(false)
                                                setModelStatus("hidden")
                                                setGeneralDescription("")
                                                setInternalDescription("")
                                                console.log("Erro --> ", error)
                                                setErrosAPI(["Erro interno do site.", error])
                                            })
                                            if (invalido) redirect("/login")
                                        }}
                                    >Alterar Estado<i className="ml-4 bi bi-pencil-square"></i>
                                    </button>
                                    <button
                                        className="text-center bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 sm:px-10 rounded-2xl mt-4"
                                        onClick={() => {
                                            setModelStatus("hidden")
                                            setGeneralDescription("")
                                            setInternalDescription("")
                                        }}
                                        >Cancelar<i className="ml-4 bi bi-pencil-square"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="pt-10 sm:pt-20 flex flex-col lg:flex-row w-full">
                            <div className="flex-1 lg:pr-10">
                                <p className="leading-5 text-lg font-bold text-gray-700 pb-3">
                                    Andamento do Chamado: 
                                </p> 
                                <div className="flex flex-col rounded-xl bg-gray-100 p-7 mb-10 space-y-px">
                                    <button onClick={() => {if(chamado?.ticket?.ticketStatus != "PENDENT") {
                                            setModelStatus("block")
                                            setStatusUpdate("PENDENT")
                                        }}} className={
                                            chamado?.ticket?.ticketStatus == "PENDENT"
                                            ? "flex justify-center text-red-500 border-1 border-red-400 rounded-sm py-3 bg-red-200"
                                            : "flex justify-center cursor-pointer text-gray-500 hover:bg-gray-300 border-1 border-gray-400 rounded-sm py-3 bg-gray-200"
                                        }>
                                        <i className="font-bold bi bi-envelope-paper-fill mr-5"></i>
                                        <p className="font-bold">Em Aberto</p>
                                    </button>
                                    <button onClick={() => {if(chamado?.ticket?.ticketStatus != "RECEIVED"){ 
                                            setModelStatus("block")
                                            setStatusUpdate("RECEIVED")
                                        }}} className={
                                            chamado?.ticket?.ticketStatus == "RECEIVED"
                                            ? "flex justify-center text-yellow-500 border-1 border-yellow-400 rounded-sm py-3 bg-yellow-200"
                                            : "flex justify-center cursor-pointer text-gray-500 hover:bg-gray-300 border-1 border-gray-400 rounded-sm py-3 bg-gray-200"
                                        }>
                                        <i className="font-bold bi-clipboard-data-fill mr-5"></i>
                                        <p className="font-bold">Em Análise</p>
                                    </button>
                                    <button onClick={() => {if(chamado?.ticket?.ticketStatus != "WORKING"){
                                            setModelStatus("block")
                                            setStatusUpdate("WORKING")
                                        }}} className={
                                            chamado?.ticket?.ticketStatus == "WORKING"
                                            ? "flex justify-center text-green-500 border-1 border-green-400 rounded-sm py-3 bg-green-200"
                                            : "flex justify-center cursor-pointer text-gray-500 hover:bg-gray-300 border-1 border-gray-400 rounded-sm py-3 bg-gray-200"
                                        }>
                                        <i className="font-bold bi bi-tools mr-5"></i>
                                        <p className="font-bold">Em Trabalho</p>
                                    </button>
                                    <button onClick={() => {if(chamado?.ticket?.ticketStatus != "FINISHED"){
                                            setModelStatus("block")
                                            setStatusUpdate("FINISHED")
                                        }}} className={
                                            chamado?.ticket?.ticketStatus == "FINISHED"
                                            ? "flex justify-center text-blue-500 border-1 border-blue-400 rounded-sm py-3 bg-blue-200"
                                            : "flex justify-center cursor-pointer text-gray-500 hover:bg-gray-300 border-1 border-gray-400 rounded-sm py-3 bg-gray-200"
                                        }>
                                        <i className="font-bold bi bi-lightbulb-fill mr-5"></i>
                                        <p className="font-bold">Finalizado</p>
                                    </button>
                                </div>
                                <h1 className="mb-2 font-medium text-blue-400">Chamado: 
                                    <span className="leading-5 text-lg font-bold text-gray-700">&nbsp;{chamado?.ticket?.hashCode}</span>
                                </h1>
                                <p className="mb-2 font-medium text-blue-400">Criado em: 
                                    <span className="leading-5 text-lg font-bold text-gray-700">&nbsp;{chamado?.ticket?.createdAt[2]}/{chamado?.ticket?.createdAt[1]}/{chamado?.ticket?.createdAt[0]}</span>
                                </p> 
                                <p className="mb-2 font-medium text-blue-400">Última Atualização em: 
                                    <span className="leading-5 text-lg font-bold text-gray-700">&nbsp;{chamado?.ticket?.updatedAt[2]}/{chamado?.ticket?.updatedAt[1]}/{chamado?.ticket?.updatedAt[0]}</span>
                                </p>         
                                <p className="mb-2 font-medium text-blue-400">Ponto de Referência: 
                                    <span className="leading-5 text-lg font-bold text-gray-700">&nbsp;{chamado?.ticket?.referencePoint}</span>
                                </p>  
                                <p className="mb-2 font-medium text-blue-400">Rua: 
                                    <span className="leading-5 text-lg font-bold text-gray-700">&nbsp;{chamado?.ticket?.street}</span>
                                </p> 
                                <p className="mb-2 font-medium text-blue-400">Bairro: 
                                    <span className="leading-5 text-lg font-bold text-gray-700">&nbsp;{chamado?.ticket?.block}</span>
                                </p> 
                                <p className="mb-2 font-medium text-blue-400">Descrição: 
                                    <span className="leading-5 text-lg font-bold text-gray-700">&nbsp;{chamado?.ticket?.description}</span>
                                </p>   
                                <div className="flex justify-center my-20">
                                    <div className="bg-blue-100 w-80 sm:px-10 text-center font-bold text-blue-400 py-5 border-4 border-blue-300 rounded-[100]">
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

                                <div className="flex-1 mb-20">
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
                                                        {
                                                            update.internalDescription != "" && (
                                                                <p className="text-gray-700">Comentário Interno: <span className="font-bold text-gray-700">{update.internalDescription}</span></p>
                                                            )
                                                        }
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
                            </div>
                            <div className="flex-1 mb-20">
                                <p className="leading-5 text-lg font-bold text-gray-700 pb-3">
                                    Remetente: 
                                </p> 
                                <div className="p-10 space-y-1 bg-gray-100 mb-15 rounded-3xl sm:text-xl">
                                    <p className="text-gray-700">Nome: <span className="font-bold text-gray-700">{chamado?.ticket?.citizen?.name}</span></p>
                                    <p className="text-gray-700">Email: <span className="font-bold text-gray-700">{chamado?.ticket?.citizen?.email}</span></p>
                                    <p className="text-gray-700">Telefone: <span className="font-bold text-gray-700">{chamado?.ticket?.citizen?.phoneNumber}</span></p>
                                </div>
                                <div className="mb-15 z-10">
                                    <div id="map" className="z-10 rounded-sm px-10 lg:px-0 w-full h-100"></div>     
                                </div>
                                {
                                    chamado?.imageURI != null && (
                                        <div className="flex justify-center">
                                            <img className="w-full rounded-xl max-h-500 object-cover" src={`${url}${chamado?.imageURI}`}/>
                                        </div>
                                    )
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