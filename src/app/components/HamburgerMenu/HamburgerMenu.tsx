import React, { useState } from 'react';
import './HamburgerMenu.css';

const HamburgerMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <button className={`menuButton ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </button>
            <div className={`overlay ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
            <nav className={`menu ${menuOpen ? 'open' : ''}`}>
                <button className={`menuButtonInside ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button>
                <a href="#categorias" className="textNavbarCategories">categorias</a>
                <a href="#recomendacoes" className="textNavbarRecommendations">recomendações</a>
                <a href="#sobre" className="textNavbarAbout">sobre</a>
                <a href="#contato" className="textNavbarContact">contato</a>
            </nav>
        </div>
    );
};

export default HamburgerMenu;
