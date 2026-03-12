"use client"

import { useEffect } from "react"
import { setCookiesChamados } from "@/app/action/cookies-chamados"

export default function SalvarChamado({ id }: { id: string }) {

    useEffect(() => {
        setCookiesChamados(id)
    }, [])

    return null
}