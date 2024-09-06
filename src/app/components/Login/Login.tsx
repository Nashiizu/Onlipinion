import React, { useState } from "react";
import Cookies from "js-cookie";
import "./login.css";
import Button from "../Button/Button";

interface LoginProps {
  onLogin: (name: string, lastName: string, imageUrl: string | null) => void;
  onRegister: () => void;
}

function Login({ onLogin, onRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    const loginData = {
      email: email,
      password: senha,
    };

    try {
      const response = await fetch("http://localhost:3001/api/auth/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login data:", data); // Verifica os dados retornados
        Cookies.set("token", data.token);
        onLogin(data.userName, data.lastName, data.imageUrl); // Passa os dados para o Navbar
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

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
        onKeyDown={handleKeyDown}
      />
      <input
        type="password"
        name="senha"
        className="fillBar marginFillBar"
        placeholder="Senha"
        id="senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button className="buttonEnter marginFillBar" onClick={handleLogin}>
        Entrar
      </Button>
      <Button className="buttonRegister marginFillBar" onClick={onRegister}>
        Cadastrar
      </Button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Login;