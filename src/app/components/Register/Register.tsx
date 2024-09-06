import React, { useState } from 'react';
import "./register.css";
import Button from "../Button/Button";
import Text from '../Text/Text';
interface RegisterProps {
    onRegister: () => void;
}

function Register({ onRegister }: RegisterProps) {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [error, setError] = useState("");

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleButtonClick = () => {
        const fileInput = document.getElementById('hidden-file-input');
        if (fileInput) {
            fileInput.click();
        }
    };

    async function handleRegister() {
        const formData = new FormData();
        formData.append("name", nome);
        formData.append("lastName", sobrenome);
        formData.append("email", email);
        formData.append("password", senha);
        formData.append("dateOfBirth", nascimento);

        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        try {
            const response = await fetch("http://localhost:3001/api/auth/user/signup", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                onRegister();
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
            <div className="row0">
                <div className="row1">
                    <div className="row2">
                        <div className="row4">
                            <input
                                type="text"
                                name="nome"
                                className="fillBarNameRegister marginFillBarName"
                                placeholder="Nome"
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <input
                                type="text"
                                name="sobrenome"
                                className="fillBarLastnameRegister marginFillBarLastname"
                                placeholder="Sobrenome"
                                id="sobrenome"
                                value={sobrenome}
                                onChange={(e) => setSobrenome(e.target.value)}
                            />
                        </div>
                        <div className="row5">
                            <input
                                type="text"
                                name="email"
                                className="fillBarEmailRegister marginFillBarEmail"
                                placeholder="Email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="row6">
                            <input
                                type="password"
                                name="senha"
                                className="fillBarPasswordRegister marginFillBarPassword"
                                placeholder="Senha"
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <input
                                type="date"
                                name="nascimento"
                                className="fillBarDateOfBirthRegister marginFillBarDateOfBirth"
                                placeholder="Data de Nascimento"
                                id="nascimento"
                                value={nascimento}
                                onChange={(e) => setNascimento(e.target.value)}
                            />
                        </div>
                        <div className="row7">
                            <Button className="buttonRegister marginFillBarRegister" onClick={handleRegister}>
                                Cadastrar
                            </Button>
                        </div>
                    </div>
                    <div className="row3">
                        <div className="image-preview-container marginFillBar">
                            {previewImage ? (
                                <img src={previewImage} alt="Pré-visualização" className="image-preview" />
                            ) : (
                                <p className="image-preview-placeholder"></p>
                            )}
                        </div>
                        <Text className="textInformationRegister colorGreenLight marginFillBarTextInformation">Recomendamos fotos de qualidade e grande tamanho</Text>

                        <Button className="buttonImage marginFillBarImage" onClick={handleButtonClick}>
                            Foto
                        </Button>

                    </div>
                </div>
                {error && <p className="error-message">{error}</p>}
            </div>
            <input
                type="file"
                id="hidden-file-input"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageChange}
            />
        </div>
    );
}

export default Register;