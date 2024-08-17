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
import Cookies from "js-cookie";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [showSquare, setShowSquare] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchUserData = async () => {
    try {
      const token = Cookies.get('token');
  
      if (!token) {
        console.error("Token não encontrado nos cookies.");
        return;
      }
  
      const response = await fetch("http://localhost:3001/user/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token })
      });
  
      if (response.ok) {
        const data = await response.json();
        setUserName(data.name);
      } else {
        console.error("Failed to fetch user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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

  const handleCloseSquare = () => {
    setAnimationClass('hide');
    setTimeout(() => {
      setShowSquare(false);
      setAnimationClass('');
    }, 300);
  };

  const handleShowSquare = () => {
    setShowSquare(true);
  };

  useEffect(() => {
    if (showSquare) {
      setAnimationClass('show');
    }
  }, [showSquare]);

  const handleSignOut = () => {
    Cookies.remove('token');
    window.location.reload();
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
          {!userName && <Button className="buttonLogin textButtonLogin" onClick={handleShowSquare}>login</Button>}
          <div className="buttonUserWrapper">
            {userName && (
              <Button className="buttonUser">
                <span id="name" onClick={toggleDropdown}>{userName}</span>
              </Button>
            )}
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
                    <Login />
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