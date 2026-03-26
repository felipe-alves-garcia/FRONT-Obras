"use client"

import { redirect } from "next/navigation"

const VerifyToken = ({token}: {token: string}) => {
    if (token == "") redirect("/login")
    return <></>
}

export default VerifyToken