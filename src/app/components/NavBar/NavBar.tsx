'use client';
import Logo from "../../../../public/assets/icons/Logo.svg";
import Image from "next/image";
import "./navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import Text from "../Text/Text";
import { useRouter, usePathname } from "next/navigation";
import Button from "../Button/Button";
import React, { useState, useEffect } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Sair from "../../../../public/assets/icons/Sair.svg";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Cookies from "js-cookie";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [showLoginSquare, setShowLoginSquare] = useState(false);
  const [showRegisterSquare, setShowRegisterSquare] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/user/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token })
      });

      if (response.ok) {
        const data = await response.json();
        setUserName(data.userName); // Corrigido para refletir a propriedade correta
        setUserLastName(data.lastName);
        setUserImage(data.imageUrl ? `http://localhost:3001${data.imageUrl}` : null); // Corrigido para garantir URL completa
        console.log('User Image URL:', data.imageUrl); // Verifica a URL da imagem
      } else {
        console.error("Failed to fetch user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleUserLogin = (name: string, lastName: string, imageUrl: string | null) => {
    setUserName(name);
    setUserLastName(lastName);
    setUserImage(imageUrl ? `http://localhost:3001${imageUrl}` : null); // Corrigido para garantir URL completa
    console.log('User Image URL:', imageUrl); // Verifica a URL da imagem
    setShowLoginSquare(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const scrollToTop = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    if (pathname === '/') {
      window.requestAnimationFrame(smoothScrollToTop);
    } else {
      router.push('/');
    }
  };

  const smoothScrollToTop = () => {
    const scrollDuration = 400;
    const scrollStep = -window.scrollY / (scrollDuration / 16.66);

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 16.66);
  };

  const handleCloseLoginSquare = () => {
    setAnimationClass('hide');
    setTimeout(() => {
      setShowLoginSquare(false);
      setAnimationClass('');
    }, 300);
  };

  const handleCloseRegisterSquare = () => {
    setAnimationClass('hide');
    setTimeout(() => {
      setShowRegisterSquare(false);
      setAnimationClass('');
    }, 300);
  };

  const handleShowLoginSquare = () => {
    setShowLoginSquare(true);
    setShowRegisterSquare(false);
  };

  const handleShowRegisterSquare = () => {
    setShowRegisterSquare(true);
    setShowLoginSquare(false);
  };

  const handleRegister = () => {
    console.log('Usuário registrado com sucesso');
    setShowRegisterSquare(false);
  };

  useEffect(() => {
    if (showLoginSquare || showRegisterSquare) {
      setAnimationClass('show');
    }
  }, [showLoginSquare, showRegisterSquare]);

  const handleSignOut = () => {
    Cookies.remove('token');
    setUserName('');
    setUserLastName('');
    setUserImage(null); // Limpa a imagem ao sair
  };

  return (
    <nav className="navbar">
      <div className="backgroundNavbar">
        <div className="navbarArea">
          <HamburgerMenu />
          <a className="navbarLogo" href="#" onClick={scrollToTop}>
            <Image src={Logo} alt="Logo" className="styleImgLogo" />
            <Text className="textNavbarOnlipinion">onlipinion</Text>
          </a>
          <Text className="textNavbarCategories">categorias</Text>
          <Text className="textNavbarRecommendations">recomendações</Text>
          <Text className="textNavbarAbout">sobre</Text>
          <Text className="textNavbarContact">contato</Text>
          <SearchBar />
          {!userName && (
            <Button className="buttonLogin textButtonLogin" onClick={handleShowLoginSquare}>
              login
            </Button>
          )}
          {userName && (
            <div className="buttonUserWrapper">
              <Button className="buttonUser" onClick={toggleDropdown}>
                <div className="areaLogin">
                  <div className="imageLogin">
                    {userImage ? (
                      <>
                        <Image
                          src={userImage}
                          alt="User Image"
                          className="userImage"
                          width={35}
                          height={35}
                          quality={100}
                          objectFit="cover"
                        />
                      </>
                    ) : null}
                  </div>
                  <div className="informationLogin">
                    <span id="name">{userName} {userLastName}</span>
                  </div>
                </div>
              </Button>
              {showDropdown && (
                <div className="dropdownMenu">
                  <ul>
                    <li>Perfil</li>
                    <li>Configurações</li>
                    <li onClick={handleSignOut}>Sair</li>
                  </ul>
                </div>
              )}
            </div>
          )}
          {showLoginSquare && (
            <>
              <div className={`background-full ${animationClass}`} onClick={handleCloseLoginSquare}></div>
              <div className={`squareLogin ${animationClass}`}>
                <div className="cowLogin1">
                  <div className="rowLogin2">
                    <div className="Logo">
                      <Image src={Logo} alt="Logo" className="styleImgLogo" />
                    </div>
                    <Button className="buttonClose" onClick={handleCloseLoginSquare}>
                      <Image src={Sair} alt="Sair" className="styleImgClose" />
                    </Button>
                  </div>
                  <Text className="titleLogin colorGreenDark">
                    Entre para ver o melhor do Onlipinion
                  </Text>
                  <div className="rowLogin3">
                    <Login onLogin={handleUserLogin} onRegister={handleShowRegisterSquare} />
                  </div>
                </div>
              </div>
            </>
          )}
          {showRegisterSquare && (
            <>
              <div className={`background-full ${animationClass}`} onClick={handleCloseRegisterSquare}></div>
              <div className={`squareRegister ${animationClass}`}>
                <div className="cowRegister1">
                  <div className="rowRegister1">
                    <div className="Logo">
                      <Image src={Logo} alt="Logo" className="styleImgLogo" />
                    </div>
                    <Button className="buttonClose" onClick={handleCloseRegisterSquare}>
                      <Image src={Sair} alt="Sair" className="styleImgClose" />
                    </Button>
                  </div>
                  <Text className="titleRegister colorGreenDark">
                    Abra uma conta para aproveitar o melhor da Onlipinion
                  </Text>
                  <div className="rowRegister2">
                    <Register onRegister={handleRegister} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;