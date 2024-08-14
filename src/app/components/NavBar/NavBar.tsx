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
import Box from "../Box/box";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [showSquare, setShowSquare] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [userName, setUserName] = useState('');
  const [showUserSquare, setShowUserSquare] = useState(false); // Estado para controle do quadrado abaixo do botão

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

  const handleCloseSquare = () => {
    setAnimationClass('hide');
    setTimeout(() => {
      setShowSquare(false);
      setAnimationClass('');
    }, 300); // Tempo deve ser igual ao tempo da animação no CSS
  };

  const handleShowSquare = () => {
    setShowSquare(true);
  };

  const handleUserButtonClick = () => {
    setShowUserSquare(!showUserSquare); // Alterna a visibilidade do quadrado
  };

  useEffect(() => {
    if (showSquare) {
      setAnimationClass('show');
    }
  }, [showSquare]);

  return (
    <>
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
          <Button className="buttonLogin textButtonLogin" onClick={handleShowSquare}>login</Button>
          <Button className="buttonUser" onClick={handleUserButtonClick}>
            {userName && <div id="name">{userName}</div>}
            {showUserSquare && (
              <div className="userSquare">
                {/* Adicione o conteúdo do quadrado aqui, se necessário */}
              </div>
            )}
          </Button>

          {/* Exibir o fundo com desfoque e o quadrado central se showSquare for true */}
          {showSquare && (
            <>
              <div className={`background-full ${animationClass}`} onClick={handleCloseSquare}></div>
              <div className={`square ${animationClass}`}>
                <div className="cowLogin1">
                  <div className="rowLogin2">
                    <div className="Logo">
                      <Image src={Logo} alt="Logo" className="styleImgLogo" />
                    </div>
                    <Button className="buttonClose" onClick={handleCloseSquare}>
                      <Image src={Sair} alt="Sair" className="styleImgClose" />
                    </Button>
                  </div>
                  <Text className="titleLogin colorGreenDark">Entre para ver o melhor do Onlipinion</Text>
                  <div className="rowLogin3">
                    <Login setUserName={setUserName} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Quadrado que aparece abaixo do botão */}
        </div>
        <Box className="boxTest" />
      </div>
    </nav>
    </>
  );
}

export default Navbar;
