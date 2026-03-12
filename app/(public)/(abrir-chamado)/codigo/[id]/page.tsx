import SalvarChamado from "../../abrir-chamado/components/salvar-cookie-chamado";

interface CodigoProps {
    params: Promise<{ id: string }>
}

const CodigoPage = async ( {params}: CodigoProps ) => {

        const { id } = await params

    return (
        <>  
            <SalvarChamado id={id} />
            <h1 className="text-2xl font-bold text-gray-700 text-center my-10">Código do Chamado</h1>
            <p className="text-5xl font-bold text-gray-700 text-center mb-10 mt-15">{id}</p>
            <div className="sm:px-20 mb-15">
                <div className="border p-5 sm:p-10 mt-20 rounded-3xl border-3">
                    <p className="font-bold text-gray-600 text-center">
                        <span className="text-blue-400 font-bold">Importante </span>
                        Recomendamos que o código gerado para este chamado seja anotado e guardado em 
                        local seguro. Ele será utilizado para realizar o acompanhamento do andamento 
                        da solicitação, permitindo consultar informações, verificar atualizações e 
                        acompanhar o status do atendimento junto à Secretaria de Obras.
                    </p>
                </div>  
                <p className="font-bold text-2xl text-center text-gray-600 mt-15">
                    Você receberá um e-mail confirmando o chamado    
                </p>  
            </div>
            <div className="pb-15 flex justify-center">
                <a
                href={`/buscar-chamado/chamado/${id}`}
                className="disabled:bg-gray-400 disabled:opacity-50 cursor-pointer max-w-70 sm:max-w-3xl w-full sm:w-auto block text-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 sm:px-10 rounded-2xl mt-4"
                >Ver Chamado<i className="ml-4 bi bi-file-earmark-text"></i></a>
            </div>  
            
            
        </>
    )
}

export default CodigoPage;