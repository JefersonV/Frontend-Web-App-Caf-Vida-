import React, { useState, useRef, useEffect } from 'react';
import '../assets/styles/SearchBar.css';

const SearchBarDrop = ({ options, onInputChange }) => {
  const ulRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    //Evento para el buscador
    inputRef.current.addEventListener('click', (e) => {
      e.stopPropagation();
      ulRef.current.style.display = 'flex';
      onInputChange(e);
    });
    //Evento para que se desaparezca la lista de botones, al hacer click por fuera del elemento
    document.addEventListener('click', (event) => {
      ulRef.current.style.display = 'none';
    });
  }, []);
  
  return (
    <div className="search-bar-dropdown">
      <input
        id="search-bar"
        type="search"
        className="form-control"
        placeholder="Nombre del cliente ..."
        ref={inputRef}
        onChange={onInputChange}
      />
      <ul id="results" className="list-group" ref={ulRef}>
        {options.map((option, index) => {
          return (
            <button
              //Vamos a usar name para saber que número es el que está selccionando
              name={index}
              type="button"
              key={index}
              onClick={(e) => {
                // Aparece el nombre en el value del botón
                inputRef.current.value = option;
                // setItemSelected(option.id)  
                // console.log(itemSelected)
                // console.log(index)
                // capturarDatos()
              }}
              className="list-group-item list-group-item-action"
            >
              {option}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchBarDrop