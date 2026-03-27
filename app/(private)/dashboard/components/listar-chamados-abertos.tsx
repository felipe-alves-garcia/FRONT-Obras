"use client"

import { listarChamadosFiltros } from "@/app/action/listar-chamados-filtros"
import { listarChamadosAtivos } from "@/app/action/listar-chamados-ativos"
import { urlApi } from "@/app/action/url-api"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"

const ListarChamados = () => {

    const [ pendent, setPendent ] = useState(false)
    const [ recieved, setRecieved ] = useState(false)
    const [ working, setWorking ] = useState(false)
    const [ finished, setFinished ] = useState(false)

    //---

    const [ url, setUrl ] = useState("")
    const [ chamadosFiltrados, setChamadosFiltrados ] = useState([{
        ticket: {
            id:"",
            hashCode:"",
            chamadoStatus:"",    
            description:"",
            ticketClassification:"",
            ticketStatus:"",   
            createdAt:[],
            updatedAt:[]
        },
        imageURI:""
    }])
    const [ chamadosAtivos, setChamadosAtivos ] = useState([{
        ticket: {
            id:"",
            hashCode:"",
            chamadoStatus:"",    
            description:"",
            ticketClassification:"",
            ticketStatus:"",   
            createdAt:[],
            updatedAt:[]
        },
        imageURI:""
    }])

    useEffect(() => {
        urlApi().then((resp) => {
            setUrl(resp)
        }).catch((error) => {
            console.log("Erro --> ", error)
        })
    }, [])

    useEffect(() => {
        const dados = () => {
            listarChamadosAtivos().then((resp) => {
                setChamadosAtivos(resp.data)
            }).catch((error) => {
                console.log("Erro --> ", error)
            })
        }
        dados()
        
        let interval = setInterval(dados, 600000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        listarChamadosFiltros(
            pendent,
            recieved, 
            working,
            finished
        ).then((resp) => {
            setChamadosFiltrados(resp.data)
        }).catch((error) => {
            console.log("Erro --> ", error)
        })
    }, [pendent, recieved, working, finished])

    return (
        <div>
            <h2 className="text-xl text-gray-700 font-bold mb-5 pl-5">Buscar Chamados por Filtro</h2>
            <div className="flex items-center px-5">
                <Input
                    className="w-5 ml-5"
                    name="pendent" 
                    type="checkbox"
                    checked={pendent}
                    onChange={(e) => {setPendent(e.target.checked)}}
                />
                <Label htmlFor="pendent" className="inline m-0 text-lg ps-3">Em Aberto</Label>
            </div>
            <div className="flex items-center px-5">
                <Input
                    className="w-5 ml-5"
                    name="recieved" 
                    type="checkbox"
                    checked={recieved}
                    onChange={(e) => {setRecieved(e.target.checked)}}
                />
                <Label htmlFor="recieved" className="inline m-0 text-lg ps-3">Em Análise</Label>
            </div>
            <div className="flex items-center px-5">
                <Input
                    className="w-5 ml-5"
                    name="working" 
                    type="checkbox"
                    checked={working}
                    onChange={(e) => {setWorking(e.target.checked)}}
                />
                <Label htmlFor="working" className="inline m-0 text-lg ps-3">Em Trabalho</Label>
            </div>
            <div className="flex items-center px-5">
                <Input
                    className="w-5 ml-5"
                    name="finished" 
                    type="checkbox"
                    checked={finished}
                    onChange={(e) => {setFinished(e.target.checked)}}
                />
                <Label htmlFor="finished" className="inline m-0 text-lg ps-3">Finalizados</Label>
            </div>
            <div className="flex flex-wrap justify-center pb-30 pt-5">
                {
                    chamadosFiltrados.map((chamado) => {
                        return (
                            <a key={chamado?.ticket?.id} href={`/dashboard/chamado/${chamado?.ticket?.hashCode}`} className="relative mx-3 my-3 block bg-gray-100 w-full sm:w-90 rounded-xl p-3 border-1 hover:border-blue-400 hover:bg-blue-100 hover:opacity-90 cursor-pointer shadow">
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
                                <div className="px-2 py-5 ">
                                    <div className="font-medium text-blue-400 pb-4">
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
                                <p className="absolute left-0 bottom-0 text-gray-400 text-sm font-normal pb-3 pl-3">Atualizado em {chamado?.ticket?.updatedAt[2]}/{chamado?.ticket?.updatedAt[1]}/{chamado?.ticket?.updatedAt[0]}</p>
                                <p className="absolute right-0 bottom-0 text-gray-400 text-sm font-normal pb-3 pr-3">Criado em {chamado?.ticket?.createdAt[2]}/{chamado?.ticket?.createdAt[1]}/{chamado?.ticket?.createdAt[0]}</p>
                            </a>    
                        )
                    })
                }    
            </div>
            <h2 className="text-xl text-gray-700 font-bold mb-5 pl-5">Chamados Não Finalizados</h2>
            <div className="flex flex-wrap justify-center pb-30">
                {
                    chamadosAtivos.map((chamado) => {
                        return (
                            <a key={chamado?.ticket?.id} href={`/dashboard/chamado/${chamado?.ticket?.hashCode}`} className="relative mx-3 my-3 block bg-gray-100 w-full sm:w-90 rounded-xl p-3 border-1 hover:border-blue-400 hover:bg-blue-100 hover:opacity-90 cursor-pointer shadow">
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
                                <div className="px-2 py-5 ">
                                    <div className="font-medium text-blue-400 pb-4">
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
                                <p className="absolute left-0 bottom-0 text-gray-400 text-sm font-normal pb-3 pl-3">Atualizado em {chamado?.ticket?.updatedAt[2]}/{chamado?.ticket?.updatedAt[1]}/{chamado?.ticket?.updatedAt[0]}</p>
                                <p className="absolute right-0 bottom-0 text-gray-400 text-sm font-normal pb-3 pr-3">Criado em {chamado?.ticket?.createdAt[2]}/{chamado?.ticket?.createdAt[1]}/{chamado?.ticket?.createdAt[0]}</p>
                            </a>    
                        )
                    })
                }    
            </div>
        </div>
    )
}

export default ListarChamados