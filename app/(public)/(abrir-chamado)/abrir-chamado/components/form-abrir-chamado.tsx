"use client"

import { useActionState } from "react";
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { abrirChamado } from "@/app/action/abrir-chamado";

const FormAbrirChamado = () => {

    const [ state, action, pending ] = useActionState(abrirChamado, null)
    const [ form, setForm ] = useState("block")
    const [ problem, setProblem ] = useState("hidden")

    //---

    const [image, setImage] = useState<File | null>(null)

    //---

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ phoneNumber, setPhoneNumber ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ referencePoint, setReferencePoint ] = useState("")

    useEffect(() => {
        let nameTest = (state?.values?.citizen?.name) ? state?.values?.citizen?.name : ""
        let emailtest = (state?.values?.citizen?.email) ? state?.values?.citizen?.email : ""
        let phoneNumberTest = (state?.values?.citizen?.phoneNumber) ? state?.values?.citizen?.phoneNumber : ""
        let descriptionTest = (state?.values?.description) ? state?.values?.description : ""
        let referencePointTest = (state?.values?.referencePoint) ? state?.values?.referencePoint : ""

        setName(String(nameTest))
        setEmail(String(emailtest))
        setPhoneNumber(String(phoneNumberTest))
        setDescription(String(descriptionTest))
        setReferencePoint(String(referencePointTest))
    }, [state?.values])

    //---

    const [ coordsStatus, setCoordsStatus ] = useState(true)
    const [ coords, setCoords ] = useState({
        latitude: 0,
        longitude: 0
    })

    const getCoords = async () => {
        const permission = await navigator.permissions.query({ name: "geolocation" })
        if(permission.state == "granted"){
            setCoordsStatus(false)
            return
        }
        if (!navigator.geolocation){
            alert("Geolocalização não é suportada pelo seu navegador")
        }
        else {
            navigator.geolocation.getCurrentPosition((position) => {
                setCoords({
                    latitude: position?.coords?.latitude,
                    longitude: position?.coords?.longitude
                })
                setCoordsStatus(false)
            }, (error) => {
                alert("Não foi possível obter sua localização. Por favor, permita o acesso à geolocalização e tente novamente.")
            })
        }    
    }
    
    useEffect(() => {getCoords()}, [])

    return (
        <form className="sm:max-w-3xl w-full" action={action}>
            <div className={form}>
                <input required type="hidden" name="latitude" value={coords.latitude}/>
                <input required type="hidden" name="longitude" value={coords.longitude}/>
                <fieldset className="py-3">
                    <Label htmlFor="nome">Nome</Label>
                    <Input 
                        id="nome" 
                        name="nome"
                        type="text" 
                        placeholder="Digite seu nome" 
                        value={name}
                        required
                        onChange={(e) => {setName(e.target.value)}}
                    />
                    {
                        state?.error?.name && (
                            <p className="ml-1 mt-1 text-xs text-red-500">{state?.error?.name}</p>
                        )
                    }
                </fieldset>
                <fieldset className="py-3">
                    <Label htmlFor="email">E-mail</Label>
                    <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="Digite seu e-mail" 
                        required
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                    {
                        state?.error?.email && (
                            <p className="ml-1 mt-1 text-xs text-red-500">{state?.error?.email}</p>
                        )
                    }
                </fieldset>
                <fieldset className="py-3">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input 
                        id="telefone" 
                        name="telefone"
                        type="number" 
                        placeholder="Digite seu telefone" 
                        required
                        value={phoneNumber}
                        onChange={(e) => {setPhoneNumber(e.target.value)}}
                    />
                    {
                        state?.error?.phoneNumber && (
                            <p className="ml-1 mt-1 text-xs text-red-500">{state?.error?.phoneNumber}</p>
                        )
                    }
                </fieldset>
                {
                    coordsStatus && (
                        <div className="pt-3 flex justify-center">
                        <button
                        disabled={pending}
                        type="button"
                        onClick={getCoords}
                        className="disabled:bg-gray-400 disabled:opacity-50 cursor-pointer max-w-70 sm:max-w-3xl w-full sm:w-auto block text-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 sm:px-10 rounded-2xl"
                        >Permitir Localização<i className="ml-4 bi bi-geo-alt-fill"></i></button>
                    </div>     
                    )
                }
                 
                <fieldset className="py-3">
                    <Label htmlFor="rua">Rua</Label>
                    <Input 
                        id="rua" 
                        name="rua"
                        type="text" 
                        placeholder="Digite sua rua" 
                        required
                    />
                </fieldset>
                <fieldset className="py-3">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input 
                        id="bairro" 
                        name="bairro"
                        type="text" 
                        placeholder="Digite seu bairro" 
                        required
                    />
                </fieldset>
                <fieldset className="py-3">
                    <Label htmlFor="ponto">Ponto de Referência</Label>
                    <Input 
                        id="ponto" 
                        name="ponto"
                        type="text" 
                        placeholder="Digite seu ponto de referência" 
                        value={referencePoint}
                        onChange={(e) => {setReferencePoint(e.target.value)}}
                        required
                    />
                    {
                        state?.error?.referencePoint && (
                            <p className="ml-1 mt-1 text-xs text-red-500">{state?.error?.referencePoint}</p>
                        )
                    }
                </fieldset>
                <fieldset className="py-3">
                    <Label htmlFor="descricao">Descrição do chamado</Label>
                    <Input 
                        id="descricao" 
                        name="descricao"
                        type="text" 
                        placeholder="Digite a descrição do chamado" 
                        value={description}
                        onChange={(e) => {setDescription(e.target.value)}}
                        required
                    />
                    {
                        state?.error?.description && (
                            <p className="ml-1 mt-1 text-xs text-red-500">{state?.error?.description}</p>
                        )
                    }
                </fieldset>
                <fieldset className="py-3 flex justify-center flex-col items-center">
                    <p className="inline font-bold mb-3 mt-5">Adicionar Foto</p>
                    <div className="flex items-center space-x-10 mt-3">
                        <label className="mb-2 bg-blue-400 inline py-3 pb-4 px-6 rounded-[100px] font-bold text-3xl text-white cursor-pointer hover:bg-blue-600" htmlFor="foto">+
                            <input 
                                id="foto" 
                                name="foto"
                                type="file"
                                accept="image/*" 
                                className="hidden px-7 pb-10 py-5"
                                onChange={(e) => {
                                    if (!e.target.files) return
                                    setImage(e.target.files[0])
                                }}
                            />
                        </label>
                        {
                            image && (
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-24 h-24 rounded-xl relative">
                                        <button 
                                            className="font-bold opacity-30 cursor-pointer hover:opacity-70 bg-gray-400 w-full h-full absolute"
                                            type="button"
                                            onClick={() => {setImage(null)}}>x
                                        </button>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            className="w-full h-full object-cover"
                                        />    
                                    </div>
                                </div>    
                            )
                        }    
                    </div>
                </fieldset>
                

                
                <div className="pt-10 pb-20 flex justify-center">
                    <button
                    disabled={pending}
                    onClick={() => {setForm("hidden"); setProblem("block")}}
                    type="button"
                    className="disabled:bg-gray-400 disabled:opacity-50 cursor-pointer max-w-70 sm:max-w-3xl w-full sm:w-auto block text-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 sm:px-10 rounded-2xl mt-4"
                    >Próximo<i className="ml-4 bi bi-arrow-right-circle"></i></button>
                </div>    
            </div>

            <div className={problem}>
                <div className="flex itens-center pt-5">
                    <div className="flex-1">
                        <button 
                            type="button"
                            onClick={() => {setForm("block"); setProblem("hidden")}}
                            className="hover:opacity-50 cursor-pointer font-bold text-xl flex itens-center"
                        >
                            <i className="bi bi-arrow-left-circle"></i>
                        </button>
                    </div>
                    <div className="flex-4 text-center">
                        <h2 className="font-bold text-xl">Selecione o Problema</h2>
                    </div>
                    <div className="flex-1"></div>
                </div>

                <div className="mt-10 sm:px-20">
                    <label className="cursor-pointer">
                        <input type="radio" required name="tipo" value="LIGHT_FIXTURE_INSTALLATION" className="hidden peer"/>
                        <div className="text-gray-500 bg-gray-200 mb-3 font-bold border p-4 rounded-xl text-center peer-checked:text-white peer-checked:bg-blue-400 peer-checked:opacity-90">
                            Instalação de Iluminária
                        </div>
                    </label>
                    <label className="cursor-pointer">
                        <input type="radio" required name="tipo" value="LIGHT_ON_DURING_DAYTIME" className="hidden peer"/>
                        <div className="text-gray-500 bg-gray-200 mb-3 font-bold border p-4 rounded-xl text-center peer-checked:text-white peer-checked:bg-blue-400 peer-checked:opacity-90">
                            Lâmpada Acessa ao Dia
                        </div>
                    </label>
                    <label className="cursor-pointer">
                        <input type="radio" required name="tipo" value="LOOSE_WIRE" className="hidden peer"/>
                        <div className="text-gray-500 bg-gray-200 mb-3 font-bold border p-4 rounded-xl text-center peer-checked:text-white peer-checked:bg-blue-400 peer-checked:opacity-90">
                            Fio Solto
                        </div>
                    </label>
                    <label className="cursor-pointer">
                        <input type="radio" required name="tipo" value="BLINKING_LIGHT" className="hidden peer"/>
                        <div className="text-gray-500 bg-gray-200 mb-3 font-bold border p-4 rounded-xl text-center peer-checked:text-white peer-checked:bg-blue-400 peer-checked:opacity-90">
                            Lâmpada Piscando
                        </div>
                    </label>
                    <label className="cursor-pointer">
                        <input type="radio" required name="tipo" value="LIGHT_BULB_OFF" className="hidden peer"/>
                        <div className="text-gray-500 bg-gray-200 mb-3 font-bold border p-4 rounded-xl text-center peer-checked:text-white peer-checked:bg-blue-400 peer-checked:opacity-90">
                            Lâmpada Apagada
                        </div>
                    </label>
                    <label className="cursor-pointer">
                        <input type="radio" required name="tipo" value="NO_LIGHT_BULB" className="hidden peer"/>
                        <div className="text-gray-500 bg-gray-200 mb-3 font-bold border p-4 rounded-xl text-center peer-checked:text-white peer-checked:bg-blue-400 peer-checked:opacity-90">
                            Sem Lâmpada
                        </div>
                    </label>
                    <label className="cursor-pointer">
                        <input type="radio" required name="tipo" value="VANDALISM" className="hidden peer"/>
                        <div className="text-gray-500 bg-gray-200 mb-3 font-bold border p-4 rounded-xl text-center peer-checked:text-white peer-checked:bg-blue-400 peer-checked:opacity-90">
                            Vandalismo
                        </div>
                    </label>
                </div>

                <div className="pt-10 pb-20 flex justify-center">
                    <button
                    disabled={pending}
                    type="submit"
                    onClick={() => {setForm("block"); setProblem("hidden")}}
                    className="disabled:bg-gray-400 disabled:opacity-50 cursor-pointer max-w-70 sm:max-w-3xl w-full sm:w-auto block text-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 sm:px-10 rounded-2xl mt-4"
                    >Abrir Chamado<i className="ml-4 bi bi-file-earmark-text"></i></button>
                </div>  
            </div>
        </form>
    )
}

export default FormAbrirChamado;