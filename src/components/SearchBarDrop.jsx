import React, { useState, useRef, useEffect } from 'react';
import '../assets/styles/SearchBar.css';

const SearchBarDrop = ({options, onInputChange}) => {
  // const { options, onInputChange } = props;
  const ulRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.addEventListener('click', (e) => {
      e.stopPropagation();
      ulRef.current.style.display = 'flex';
      onInputChange(e);
    });
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
        placeholder="Search"
        ref={inputRef}
        onChange={onInputChange}
      />
      <ul id="results" className="list-group" ref={ulRef}>
        {options.map((option, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={(e) => {
                inputRef.current.value = option;
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