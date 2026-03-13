"use client"

import { buscarStatus } from "@/app/action/buscar-status"

import { useEffect, useState } from "react"

const Status = () => {

    const [ status, setStatus ] = useState<{ status: string; count: number; }[] | undefined>([{status:"", count:0}])
    useEffect(() => {
        buscarStatus().then((resp) => {
            setStatus(resp)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <>
            {
                status && (
                    <div className="px-2">
                        <div className="flex flex-wrap">
                            <p className="my-3 mx-2 text-nowrap px-10 flex-1 text-center text-xl font-bold text-red-500 border-red-500 border-2 py-5 rounded-4xl bg-red-200">
                                <i className="bi bi-envelope-paper-fill mr-5"></i>
                                <span className="">{status[0]?.count ? status[0]?.count : 0} - </span>
                                EM ABERTO
                            </p>
                            <p className="my-3 mx-2 text-nowrap px-10 flex-1 text-center text-xl font-bold text-yellow-500 border-yellow-500 border-2 py-5 rounded-4xl bg-yellow-200">
                                <i className="bi bi-clipboard-data-fill mr-5"></i>
                                <span className="">{status[1]?.count ? status[1]?.count : 0} - </span>
                                EM ANÁLISE
                            </p>
                            <p className="my-3 mx-2 text-nowrap px-10 flex-1 text-center text-xl font-bold text-green-500 border-green-500 border-2 py-5 rounded-4xl bg-green-200">
                                <i className="bi bi-tools mr-5"></i>
                                <span className="">{status[2]?.count ? status[2]?.count : 0} - </span>
                                EM TRABALHO
                            </p>
                            <p className="my-3 mx-2 text-nowrap px-10 flex-1 text-center text-xl font-bold text-blue-500 border-blue-500 border-2 py-5 rounded-4xl bg-blue-200">
                                <i className="bi bi-lightbulb-fill mr-5"></i>
                                <span className="">{status[3]?.count ? status[3]?.count : 0} - </span>
                                FINALIZADOS
                            </p>
                        </div>
                    </div>        
                )
            }
            
        </>
    )
}

export default Status