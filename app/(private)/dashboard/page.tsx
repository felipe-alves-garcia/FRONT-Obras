import Status from "./components/status"
import FormBuscarChamado from "../../(public)/buscar-chamado/components/form-buscar-chamado"
import ListarChamados from "./components/listar-chamados"

const DashboardPage = () => {

    return (
        <>  
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
        </>
    )
}

export default DashboardPage