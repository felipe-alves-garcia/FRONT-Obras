"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { useActionState, useState, useEffect } from "react"

import { loginUser } from "@/app/action/login"

import LoadErros from "@/components/global/load-erros"

const LoginForm = () => {

    const [ errosAPI, setErrosAPI ] = useState<string[]>([])
    const [ state, action, pending ] = useActionState(loginUser, null)

    //---

    const [ cpf, setCpf ] = useState("")
    const [ password, setPassword ] = useState("")

    useEffect(() => {
        const cpfTest = state?.values?.cpf ? state.values.cpf : ""
        const passwordTest = state?.values?.password ? state.values.password : ""

        setCpf(String(cpfTest))
        setPassword(String(passwordTest))
        setErrosAPI(state?.errosAPI || [])
    }, [state])

    //---

    return (
        <>
            <LoadErros erros={errosAPI} />  
            <form className="mt-20" action={action}>
                <fieldset className="mb-5">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                        name="cpf"
                        type="text"
                        inputMode="numeric"
                        placeholder="Digite seu CPF"
                        required
                        value={cpf}
                        onChange={(e) => {setCpf(e.target.value)}}
                    />
                    {
                        state?.error?.cpf && (
                            <p className="ml-1 mt-1 text-xs text-red-500">{state?.error?.cpf}</p>
                        )
                    }
                </fieldset>
                <fieldset>
                    <Label htmlFor="password">Senha</Label>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Digite sua senha"
                        required
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    {
                        state?.error?.password && (
                            <p className="ml-1 mt-1 text-xs text-red-500">{state?.error?.password}</p>
                        )
                    }
                </fieldset>
                <div className="pt-10 pb-20 flex justify-center">
                    <button
                    disabled={pending}
                    type="submit"
                    className="disabled:bg-gray-400 disabled:opacity-50 cursor-pointer max-w-70 sm:max-w-3xl w-full sm:w-auto block text-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 sm:px-10 rounded-2xl mt-4"
                    >Entrar<i className="ml-4 bi bi-person-circle"></i></button>
                </div> 
            </form>
        </>
    )
}

export default LoginForm