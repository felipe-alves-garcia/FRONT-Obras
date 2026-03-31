"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useState } from "react";
import { redirect } from "next/navigation";

import LoadErros from "@/components/global/load-erros"

import { verifyBuscarChamado } from "@/app/action/verify-buscar-chamado";

const FormBuscarChamado = ({path}:{path:string}) => {

    const [ erro, setErro ] = useState("")
    const [ state, action, pending ] = useActionState(verifyBuscarChamado, null)
    const [ errosAPI, setErrosAPI ] = useState<string[]>([])

    useEffect(() => {
        if(state?.status){
            setErro("")
            redirect(`/${path}/${state.hashcode}`)
        }
        else if(state?.status != null){
            setErro("Chamado não encontrado")
            setErrosAPI(state.errosAPI)
        }
    }, [state])

    return (
        <>
            <LoadErros erros={errosAPI}/>
            <form className={`sm:max-w-3xl w-full sm:px-5`} action={action}>
                <fieldset className="mt-20">
                    <Label htmlFor="codigo">Código de Chamado</Label>
                    <Input 
                        id="codigo" 
                        name="codigo"
                        type="text" 
                        placeholder="Digite o código do chamado" 
                        required
                    />
                    {
                        erro != "" && (
                            <p className="ml-1 mt-1 text-xs text-red-500">{erro}</p>
                        )
                    }
                </fieldset>
                <div className="py-5 flex flex-col sm:flex-row items-center sm:justify-center sm:space-x-6">
                    <button
                    disabled={pending}
                    className="disabled:bg-gray-400 disabled:opacity-50 max-w-70 sm:max-w-3xl w-full sm:w-auto block text-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 sm:px-10 rounded-2xl mt-4"
                    type="submit"
                    >Buscar Chamado<i className="ml-4 bi bi-search"></i></button>
                    {
                        path == "buscar-chamado/chamado" && (
                            <a
                            className="max-w-70 sm:max-w-3xl w-full sm:w-auto block text-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 sm:px-13 rounded-2xl mt-4"
                            href="/"
                            >Voltar<i className="ml-4 bi bi-box-arrow-left"></i></a>     
                        )    
                    } 
                </div>
            </form>
        </>
    )
}

export default FormBuscarChamado;