"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { redirect } from "next/navigation";

import { verifyBuscarChamado } from "@/app/action/verify-buscar-chamado";

const FormBuscarChamado = () => {

    const [ state, action, pending ] = useActionState(verifyBuscarChamado, null)

    useEffect(() => {
        if(state?.status){
            redirect(`/buscar-chamado/chamado/${state.hashcode}`)
        }
    }, [state])

    return (
        <form className="sm:max-w-3xl w-full mx-5" action={action}>
            <fieldset className="mt-20">
                <Label htmlFor="codigo">Código de Chamado</Label>
                <Input 
                    id="codigo" 
                    name="codigo"
                    type="text" 
                    placeholder="Digite o código do chamado" 
                    required
                />
            </fieldset>
            <div className="pt-10 flex flex-col sm:flex-row items-center sm:justify-center sm:space-x-6">
                <button
                disabled={pending}
                className="disabled:bg-gray-400 disabled:opacity-50 max-w-70 sm:max-w-3xl w-full sm:w-auto block text-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 sm:px-10 rounded-2xl mt-4"
                type="submit"
                >Buscar Chamado<i className="ml-4 bi bi-search"></i></button>
                <a
                className="max-w-70 sm:max-w-3xl w-full sm:w-auto block text-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 sm:px-13 rounded-2xl mt-4"
                href="/"
                >Voltar<i className="ml-4 bi bi-box-arrow-left"></i></a>  
            </div>
        </form>
    )
}

export default FormBuscarChamado;