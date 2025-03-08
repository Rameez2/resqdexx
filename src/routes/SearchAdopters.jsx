import React, { useEffect, useState } from 'react';
import { useUser } from '../context/userContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { getRandomAdopters, searchAdopterByName } from '../api/searchingApi';

const SearchAdopters = () => {
  const { loading, user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        let usersResponse = await getRandomAdopters();
        setResults(usersResponse);
      } catch (error) {
        console.log('error fetching adopters', error);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm === '') {
      return;
    }
    setIsSearching(true);
    setError(null);
    try {
      // Call the search function using the current searchTerm
      const docs = await searchAdopterByName(searchTerm);
      setResults(docs);
    } catch (err) {
      console.error("Error during search:", err);
      setError("An error occurred during search.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleMessage = (doc) => {
    // Navigate to /profile with the adopter data in state
    navigate('/profile', { state: { adopterInfo: doc} });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (user.role === "Adopter") {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Search for Adopters</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter adopter name"
        />
        <button type="submit">Search</button>
      </form>
      
      {isSearching && <p>Searching...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {results && results.length > 0 && (
        <div>
          {results.map((doc) => (
            <div key={doc.$id}>
              <span>{doc.name}</span>
              <button onClick={() => handleMessage(doc)}>Message</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAdopters;
