import LoginForm from "./components/login-form"

const LoginPage = () => {

    return (
        <>
            <div className="min-h-screen px-5 pt-20 flex justify-center">
                <div className="sm:max-w-3xl w-full">
                    <div className="flex flex-col items-center py-2">
                        <div className="">
                            <img
                            src="/imagens/logo1.png"
                            alt="Prefeitura Municipal de Parobé"
                            className="w-77 h-auto"
                            />  
                        </div>
                    </div>    
                    <LoginForm/>
                </div>
            </div>
        </>
    )
}

export default LoginPage