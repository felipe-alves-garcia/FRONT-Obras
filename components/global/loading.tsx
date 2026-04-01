"use client"

import { useEffect, useState } from "react"

const Loading = (props: {status:boolean}) => {

    const [ hidden, setHidden ] = useState("hidden")

    useEffect(() => {
        if (props.status) setHidden("")
        else setHidden("hidden")
    }, [props.status])

    return (
        <div className={`z-50 fixed flex justify-center items-center top-0 left-0 w-full h-full ${hidden}`}>
            <div className={`absolute h-full top-0 opacity-5 bg-black w-full`}></div>
            <img
                className="z-50 rounded-[100px] w-25 border"
                src="/imagens/loading.gif"
            />
        </div>
    )
}

export default Loading