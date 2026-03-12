import { cookies } from "next/headers";

import FormBuscarChamado from "./components/form-buscar-chamado";
import DeleteCookieChamado from "./components/delete-cookie-chamado";

export default async function BuscarChamadoPage() {

  const cookieStore = await cookies()
  const chamadosCookies = cookieStore.get("chamados")?.value
  const chamados = chamadosCookies ? JSON.parse(chamadosCookies) : []

  return (
    <div className="flex flex-col items-center min-h-screen py-2 pt-20 px-5">
      <div className="sm:max-w-3xl sm:w-full">
        <img
          src="/imagens/logo1.png"
          alt="Prefeitura Municipal de Parobé"
          className="w-77 h-auto"
        />  
      </div>

      <FormBuscarChamado path="buscar-chamado/chamado"/>
      
      <div className="w-full sm:max-w-3xl mt-10 mb-20">
        {chamados.length > 0 && (
          <div>
            <h2 className="font-bold text-xl">Chamados Passados</h2>
          </div>
        )}
        {
          chamados.map((chamado: string) => {

            return (
              <div key={chamado} className="flex mt-7 items-center">
                <a href={`/buscar-chamado/chamado/${chamado}`} className="flex-9 hover:bg-blue-100 hover:border-blue-400 block border p-5 sm:p-10 rounded-3xl border-3">
                  <p className="font-bold text-xl text-gray-600 text-center">
                    <span className="text-blue-400 font-bold">Chamado: </span>{chamado}
                  </p>
                </a>  
                <DeleteCookieChamado id={chamado}/>
              </div>
            )
          })
        }  
      </div>      

    </div>
  );
}
