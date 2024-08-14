import React, { useState } from "react";
import "./login.css";
import Button from "../Button/Button";

interface LoginProps {
    setUserName: (name: string) => void; // Tipo da prop
}

function Login({ setUserName }: LoginProps) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleLogin() {
        const loginData = {
            email: email,
            password: senha,
        };

        try {
            const response = await fetch("http://localhost:3001/user/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login bem-sucedido:", data);

                // Atualiza o estado com o nome do usuário, se disponível
                if (data.userName) {
                    setUserName(data.userName); // Atualiza o estado na Navbar
                } else {
                    console.error("'userName' não está definido");
                }

            } else {
                console.error("Erro ao fazer login:", response.statusText);
            }
        } catch (error) {
            console.error("Erro de rede:", error);
        }
    }

    return (
        <div className="">
            <input
                type="text"
                name="email"
                className="fillBar marginFillBar"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                name="senha"
                className="fillBar marginFillBar"
                placeholder="Senha"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <Button className="buttonEnter marginFillBar" onClick={handleLogin}>Entrar</Button>
            <Button className="buttonRegister marginFillBar">Cadastrar</Button>
        </div>
    );
}

export default Login;
