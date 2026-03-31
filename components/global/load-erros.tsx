import { useEffect, useState } from "react"

const LoadErros = ({erros}: {erros:string[]}) => {

    const [ listErros, setListErros ] = useState<string[]>([])

    useEffect(() => {
        setListErros(erros)
    }, [erros])

    return (
        <>
            {
                listErros.length > 0 && (
                    <div className={`fixed w-full h-full left-0 top-0 flex items-center justify-center`}>
                        <button onClick={() => {setListErros([])}} className={`absolute h-full top-0 opacity-60 bg-black w-full`}></button>
                        <div className="absolute py-7 px-8 bg-white opacity-100 rounded-xl md:min-w-120 flex items-center flex-col text-md leading-5 mx-2">
                            <div className="w-full">
                                <h2 className="font-bold mb-1"><span><i className="text-yellow-500 pr-3 bi bi-exclamation-triangle-fill"></i></span>Algo deu errado!</h2>
                                <h2 className="font-bold"><span><i className="text-gray-400 pr-3 bi bi-tools"></i></span>Tente fechar e abrir novamente o site!</h2>     
                            </div> 
                            <img
                                src="/imagens/erro.jpg"
                                className="w-60 m-5"
                            />
                            {
                                listErros.map((erro, index) => {

                                    return ( 
                                        <div key={index} className="text-center">
                                            <p>{erro}</p>
                                        </div>    
                                    )
                                })
                            }    
                        </div>
                    </div>
                )
            }
            
        </>
        
    )
}

export default LoadErros