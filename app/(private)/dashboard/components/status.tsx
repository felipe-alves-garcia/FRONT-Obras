"use client"

import { buscarStatus } from "@/app/action/buscar-status"

import { useEffect, useState } from "react"

const Status = () => {

    const [ status, setStatus ] = useState([{status:"", count:0}])
    useEffect(() => {
        buscarStatus().then((resp) => {
            console.log(resp)
            setStatus(resp)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <>
            {
                status && (
                    <div className="">
                        <div className="flex">
                            <p className="font-bold bg-red-400">
                                <span>{status[0]?.count}</span>
                                EM ABERTO
                            </p>
                        </div>
                    </div>        
                )
            }
            
        </>
    )
}

export default Status