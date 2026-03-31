export default function HomePage() {
    return (
        <div className="flex flex-col items-center min-h-screen py-2 pt-20 px-5">
            <div className="">
                <img
                    src="/imagens/logo1.png"
                    alt="Prefeitura Municipal de Parobé"
                    className="w-77 h-auto"
                />  
            </div>
        

            <div className="pb-20 pt-10 sm:pb-25 pt-20 sm:flex sm:items-center sm:space-x-6">
                <a
                    className="block text-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 sm:px-10 rounded-2xl mt-4"
                    href="/buscar-chamado"
                    >Consultar Chamado<i className="ml-4 bi bi-search"></i>
                </a>
                <a
                    className="block text-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 sm:px-13 rounded-2xl mt-4"
                    href="/abrir-chamado"
                    >Abrir Chamado<i className="ml-4 bi bi-megaphone"></i>
                </a>  
            </div>

            <div className="text-justify max-w-3xl space-y-3 pb-10 text-gray-700 leading-5">
                <p>
                    Bem-vindo ao Sistema de Chamados de Postes da Secretaria de Obras.
                    Este portal foi criado para facilitar a comunicação entre os cidadãos e a 
                    equipe responsável pela manutenção da infraestrutura urbana, especialmente 
                    relacionada aos postes de iluminação pública.
                </p>
                <p>
                    Aqui, você pode registrar rapidamente ocorrências como lâmpadas queimadas, 
                    postes danificados, fios expostos, falhas de iluminação ou qualquer outro 
                    problema que afete a segurança e o bem-estar da comunidade.
                </p>
                <p>
                    Nosso objetivo é garantir que as demandas sejam recebidas, organizadas e 
                    encaminhadas da maneira mais eficiente possível, permitindo um acompanhamento 
                    mais ágil por parte da equipe técnica.
                </p>
                <p>
                    Ao enviar um chamado, você contribui diretamente para uma 
                    cidade mais iluminada, segura e bem cuidada. Obrigado por fazer parte dessa 
                    iniciativa e ajudar a melhorar os espaços públicos para todos.
                </p>   
            </div>
        </div>
    );
}
