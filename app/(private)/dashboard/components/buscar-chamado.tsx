"use client"

import { useState, useEffect } from "react"

import { updateStatusChamado } from "@/app/action/update-status-chamado"
import { buscarChamado } from "@/app/action/buscar-chamado"
import { urlApi } from "@/app/action/url-api"

import L from "leaflet"
import "leaflet/dist/leaflet.css"

const BuscarChamado = ({id}:{id:string}) => {

    const createMap = (latitude:number, longitude:number) => {
       const map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup("Local do chamado")
        .openPopup();  
    }

    //---

    const [ url, setUrl ] = useState("")
    const [ chamado, setChamado ] = useState({
        ticket:{
            citizen: {
                email:"",
                name:"",
                phoneNumber:""
            },
            description:"",
            referencePoint:"",
            ticketClassification:"",
            ticketStatus:"",
            hashCode:"",
            latitude:0,
            longitude:0,
            id:"",
        },
        imageURI:""
    })

    const carregarChamado = async () => {
        buscarChamado(id).then((resp) => {
            setChamado(resp)
            createMap(resp.ticket.latitude, resp.ticket.longitude)
            console.log(resp)
        }).catch((error) => {
            console.log("Erro --> ", error)
        })
    }

    useEffect(() => {
        urlApi().then((resp) => {
            setUrl(resp)
        }).catch((error) => [
            console.log("Erro --> ", error)
        ])
        carregarChamado()
    }, [])    

    return (
        <div className="pt-10 sm:pt-20 flex flex-col lg:flex-row w-full">
            <div className="flex-1 lg:pr-10">
                <p className="leading-5 text-lg font-bold text-gray-700 pb-3">
                    Andamento do Chamado: 
                </p> 
                <div className="flex flex-col rounded-xl bg-gray-100 p-7 mb-10 space-y-px">
                    <button onClick={() => {if(chamado?.ticket?.ticketStatus != "PENDENT") {
                            updateStatusChamado(chamado?.ticket?.id, "PENDENT")
                            carregarChamado()
                        }}} className={
                            chamado?.ticket?.ticketStatus == "PENDENT"
                            ? "flex justify-center text-red-500 border-1 border-red-400 rounded-sm py-3 bg-red-200"
                            : "flex justify-center cursor-pointer text-gray-500 hover:bg-gray-300 border-1 border-gray-400 rounded-sm py-3 bg-gray-200"
                        }>
                        <i className="font-bold bi bi-envelope-paper-fill mr-5"></i>
                        <p className="font-bold">Em Aberto</p>
                    </button>
                    <button onClick={() => {if(chamado?.ticket?.ticketStatus != "RECIEVED"){ 
                            updateStatusChamado(chamado?.ticket?.id, "RECIEVED")
                            carregarChamado()
                        }}} className={
                            chamado?.ticket?.ticketStatus == "RECIEVED"
                            ? "flex justify-center text-yellow-500 border-1 border-yellow-400 rounded-sm py-3 bg-yellow-200"
                            : "flex justify-center cursor-pointer text-gray-500 hover:bg-gray-300 border-1 border-gray-400 rounded-sm py-3 bg-gray-200"
                        }>
                        <i className="font-bold bi-clipboard-data-fill mr-5"></i>
                        <p className="font-bold">Em Análise</p>
                    </button>
                    <button onClick={() => {if(chamado?.ticket?.ticketStatus != "WORKING"){
                            updateStatusChamado(chamado?.ticket?.id, "WORKING")
                            carregarChamado()
                        }}} className={
                            chamado?.ticket?.ticketStatus == "WORKING"
                            ? "flex justify-center text-green-500 border-1 border-green-400 rounded-sm py-3 bg-green-200"
                            : "flex justify-center cursor-pointer text-gray-500 hover:bg-gray-300 border-1 border-gray-400 rounded-sm py-3 bg-gray-200"
                        }>
                        <i className="font-bold bi bi-tools mr-5"></i>
                        <p className="font-bold">Em Trabalho</p>
                    </button>
                    <button onClick={() => {if(chamado?.ticket?.ticketStatus != "FINISHED"){
                            updateStatusChamado(chamado?.ticket?.id, "FINISHED")
                            carregarChamado()
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
                <p className="mb-2 font-medium text-blue-400">Descrição: 
                    <span className="leading-5 text-lg font-bold text-gray-700">&nbsp;{chamado?.ticket?.description}</span>
                </p>         
                <p className="mb-2 font-medium text-blue-400">Ponto de Referência: 
                    <span className="leading-5 text-lg font-bold text-gray-700">&nbsp;{chamado?.ticket?.referencePoint}</span>
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
                <div className="mb-15">
                    <div id="map" className=" rounded-sm px-10 lg:px-0 w-full h-100"></div>     
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
                {
                    chamado?.imageURI != null && (
                        <div className="flex justify-center">
                            <img className="w-full rounded-xl max-h-500 object-cover" src={`${url}${chamado?.imageURI}`}/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default BuscarChamado