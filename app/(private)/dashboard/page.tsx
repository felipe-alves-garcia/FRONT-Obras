import Status from "./components/status"
import FormBuscarChamado from "../../(public)/buscar-chamado/components/form-buscar-chamado"
import ListarChamados from "./components/listar-chamados-abertos"

const DashboardPage = () => {

    return (
        <>  
            <main>
                <header className="py-4 px-4 sm:px-10 bg-blue-400 flex items-center">
                    <div className="flex-1">
                        <a className="text-white text-xl sm:text-2xl font-bold" href="/login">
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
                        <div className="flex items-center mt-15 mb-10 px-2">
                            <hr className="mt-2 flex-1 border-gray-600 border-1 rounded-xl mr-5"/>
                            <h2 className="inline text-2xl text-gray-600 font-bold">Análise de Dados</h2>
                            <hr className="mt-2 flex-1 border-gray-600 border-1 rounded-xl ml-5"/>
                        </div>
                        <Status/>
                        <div className="flex justify-center px-3 sm:px-0">
                            <FormBuscarChamado path="dashboard/chamado"/>
                        </div>
                        <div className="flex items-center mt-20 mb-10 px-2">
                            <hr className="mt-2 flex-1 border-gray-600 border-1 rounded-xl mr-5"/>
                            <h2 className="inline text-2xl text-gray-600 font-bold">Chamados</h2>
                            <hr className="mt-2 flex-1 border-gray-600 border-1 rounded-xl ml-5"/>
                        </div>
                        <ListarChamados/>
                    </div>
                </div>    
            </main>
        </>
    )
}

export default DashboardPage