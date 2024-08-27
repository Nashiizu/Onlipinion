import React, { useState } from 'react';
import "./register.css";
import Cookies from "js-cookie";

interface RegisterProps {
    onRegister: () => void; // Apenas a função para registrar
}

function Register({ onRegister }: RegisterProps) {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [error, setError] = useState("");

    // Função para lidar com o registro
    async function handleRegister() {
        const registerData = {
            name: nome,           // mapeia "nome" para "name"
            lastName: sobrenome,  // mapeia "sobrenome" para "lastName"
            email,
            password: senha,      // mapeia "senha" para "password"
            dateOfBirth: nascimento, // mapeia "nascimento" para "dateOfBirth"
        };
    
        try {
            const response = await fetch("http://localhost:3001/api/auth/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            });
    
            if (response.ok) {
                const data = await response.json();
                onRegister(); // Chama a função onRegister após o registro
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Erro desconhecido");
            }
        } catch (error) {
            if (error instanceof Error) {
                setError("Erro de rede: " + error.message);
            } else {
                setError("Erro de rede: desconhecido");
            }
        }
    }
    
    return (
        <div className="">
            <input
                type="text"
                name="nome"
                className="fillBar marginFillBar"
                placeholder="Nome"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <input
                type="text"
                name="sobrenome"
                className="fillBar marginFillBar"
                placeholder="Sobrenome"
                id="sobrenome"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
            />
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
            <input
                type="date"
                name="nascimento"
                className="fillBar marginFillBar"
                placeholder="Data de Nascimento"
                id="nascimento"
                value={nascimento}
                onChange={(e) => setNascimento(e.target.value)}
            />
            <button className="buttonRegister marginFillBar" onClick={handleRegister}>
                Cadastrar
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default Register;