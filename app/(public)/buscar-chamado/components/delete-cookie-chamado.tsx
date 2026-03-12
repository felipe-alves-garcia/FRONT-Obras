"use client"

import { deleteCookieChamado } from "@/app/action/cookies-chamados"

export default function DeleteCookieChamado({ id }: { id: string }) {

    return (
        <div className="flex-2 sm:flex-1 flex justify-center">
            <button onClick={() => {deleteCookieChamado({id})}} className="hover:text-red-500 cursor-pointer text-xl">
                <i className="bi bi-trash-fill"></i>
            </button>  
        </div>
    )
}