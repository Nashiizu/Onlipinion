import React, { useState } from "react";
import Cookies from "js-cookie";
import "./login.css";
import Button from "../Button/Button";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState(""); // Estado para armazenar mensagens de erro

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
                Cookies.set("token", data.token);
                window.location.reload(); // Recarrega a página
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Erro desconhecido"); // Define a mensagem de erro
                console.error("Erro ao fazer login:", errorData.error);
            }
        } catch (error) {
            if (error instanceof Error) {
                setError("Erro de rede: " + error.message); // Define a mensagem de erro
                console.error("Erro de rede:", error.message);
            } else {
                setError("Erro de rede: desconhecido"); // Mensagem padrão para erro desconhecido
                console.error("Erro de rede desconhecido:", error);
            }
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
            {error && <p className="error-message">{error}</p>} {/* Exibe a mensagem de erro */}
        </div>
    );
}

export default Login;