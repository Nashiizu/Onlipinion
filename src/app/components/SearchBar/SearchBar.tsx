"use client"
import { useState } from 'react';
import Image from "next/image";
import Lupa from "../../../../public/assets/icons/Lupa.svg";
import "./searchbar.css"

interface SearchBarProps {
  className?: string; // Adiciona a prop className
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Pesquisar:', searchTerm);
    // Aqui você pode adicionar a lógica para pesquisar
  };

  return (
    <form onSubmit={handleSubmit} className={`pesquisarForm ${className}`}>
      <input
        type="text"
        placeholder='pesquisar'
        value={searchTerm}
        onChange={handleChange}
        className="pesquisarInput"
      />
      <div className="areaLupa">
        <Image className="lupa" src={Lupa} alt="Lupa" />
      </div>
    </form>
  );
};

export default SearchBar;
