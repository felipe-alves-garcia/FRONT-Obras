import BuscarChamado from "../../components/buscar-chamado"

interface ChamadoProps {
    params: Promise<{id:string}>
}

const ChamadoPage = async ({params}: ChamadoProps) => {

    const { id } = await params

    return (
        <>
            <main>
                <header className="py-4 px-4 sm:px-10 bg-blue-400 flex items-center">
                    <div className="flex-1">
                        <a className="text-white text-xl sm:text-2xl font-bold" href="/dashboard">
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
                <div className="flex flex-col items-center min-h-screen px-5 sm:px-10 relative">
                    <div className="sm:w-full relative">
                        <BuscarChamado id={id}/>
                    </div>
                </div>    
            </main>
        </>
    )
}

export default ChamadoPage