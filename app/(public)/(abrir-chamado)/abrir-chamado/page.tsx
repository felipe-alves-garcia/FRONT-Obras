import FormAbrirChamado from "./components/form-abrir-chamado";

const AbrirChamadoPage = () => {

    return (
        <>
            <h1 className="font-bold text-3xl mb-5">Formulário de Abertura de Chamado</h1>
            <p className="text-md mb-5 text-justify text-gray-700 leading-5">
                Utilize este formulário para registrar um chamado relacionado a postes de 
                iluminação pública. Preencha as informações solicitadas com o 
                máximo de detalhes possível, como a localização e o tipo de problema 
                identificado. Esses dados ajudam a Secretaria de Obras a analisar a ocorrência 
                e encaminhar a equipe responsável para realizar a verificação e manutenção 
                necessárias.
            </p>
            <FormAbrirChamado />
        </>
    )
}

export default AbrirChamadoPage;