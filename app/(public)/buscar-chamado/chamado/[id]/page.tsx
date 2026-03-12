import SalvarChamado from "@/app/(public)/(abrir-chamado)/abrir-chamado/components/salvar-cookie-chamado"
import BuscarChamado from "../../components/buscar-chamado"

interface ChamadoProps {
    params: Promise <{id:string}>
}

const ChamadoPage = async ( {params}: ChamadoProps ) => {

    const { id } = await params

    return (
        <>
            <SalvarChamado id={id}/>
            <header className="py-4 px-4 sm:px-10 bg-blue-400 flex items-center mb-10">
                <div className="flex-1">
                    <a className="text-white text-xl sm:text-2xl font-bold" href="/buscar-chamado">
                        <i className="bi bi-box-arrow-left hover:text-red-500"></i>
                    </a>
                </div>
                <div className="flex-[3] flex justify-center">
                    <img
                        src="/imagens/logo2.png"
                        alt="Prefeitura Municipal de Parobé"
                        className="w-40 sm:w-55 h-auto"
                    />    
                </div>
                <div className="flex-1"></div>
            </header>
            <div className="flex flex-col items-center min-h-screen px-5 pb-15">
                <div className="sm:max-w-3xl w-full">
                    <BuscarChamado id={id}/>
                </div>
            </div>    
        </>
    )
}

export default ChamadoPage;