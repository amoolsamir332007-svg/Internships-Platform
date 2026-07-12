// SearchBar.jsx حقل بحث بسيط (input + زر بحث أو debounce تلقائي) ApplicationsSection بيستدعيها عند تغير النص Props: onSearch(query)
//

import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // استدعاء دالة البحث مباشرة عند تغير النص (Debounce تلقائي)
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for internship titles or skills..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </div>
    </form>
  );
};

export default SearchBar;