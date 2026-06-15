import React, { useState } from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleSearch = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://127.0.0.1:3001/search?q=${encodeURIComponent(searchTerm)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setResults(data.artists?.items || []);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Spotify Artist Search</h2>
        <button 
          onClick={handleLogout}
          style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Logout
        </button>
      </header>
      
      <div style={{ marginTop: '20px' }}>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search for an artist..." 
          style={{ padding: '10px', width: '300px', fontSize: '16px', marginRight: '10px' }}
        />
        <button onClick={handleSearch} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Search
        </button>
      </div>

      <div style={{ marginTop: '24px', display: 'grid', gap: '12px' }}>
        {results.map((artist) => (
          <div
            key={artist.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
            }}
          >
            {artist.images?.[0]?.url && (
              <img
                src={artist.images[0].url}
                alt={artist.name}
                style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '4px' }}
              />
            )}
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{artist.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
