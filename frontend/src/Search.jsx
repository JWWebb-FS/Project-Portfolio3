import { useState } from 'react';

const placeholderImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%231db954"/><circle cx="150" cy="120" r="54" fill="%23ffffff" opacity="0.92"/><path d="M63 262c15-53 49-82 87-82s72 29 87 82" fill="%23ffffff" opacity="0.92"/></svg>';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleSearch = async (event) => {
    event?.preventDefault();

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

  const getArtistImage = (artist) => artist.images?.[0]?.url || placeholderImage;
  const getFollowerCount = (artist) => (artist.followers?.total || 0).toLocaleString();
  const getGenres = (artist) => artist.genres?.slice(0, 3).join(', ') || 'No genres listed';

  return (
    <div className="search-page">
      <header className="search-header">
        <h2>Spotify Artist Search</h2>
        <button 
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </header>
      
      <form className="search-controls" onSubmit={handleSearch}>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search for an artist..." 
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </form>

      <div className="artist-grid">
        {results.map((artist) => (
          <div
            key={artist.id}
            className="artist-card"
          >
            <img
              className="artist-card__image"
              src={getArtistImage(artist)}
              alt={artist.name}
            />
            <div className="artist-card__details">
              <h3>{artist.name}</h3>
              <p>{getFollowerCount(artist)} followers</p>
              <p>{getGenres(artist)}</p>
            </div>
            {artist.external_urls?.spotify && (
              <a
                className="artist-card__link"
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Spotify
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
