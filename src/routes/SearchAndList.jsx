import React, { useEffect, useState } from "react";
import PetCard from "../components/pages/homePage/PetCard";
import styles from "../styles/searchAndList.module.css";
import { useUser } from "../context/userContext";
import { getPetsByFilter } from "../api/petsApi";
import { searchPetByName } from "../api/searchingApi";
import PetFilters from "../components/pages/searchAndList/PetFilters";

const SearchAndList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    breed: "",
    specie: "",
    age: "",
    size: "",
    gender: ""
  });
  
  const { user } = useUser();

  useEffect(() => {
    (async () => {
      try {
        const petsResponse = await getPetsByFilter(3,1); // limit,offset
        setPets(petsResponse);
      } catch (error) {
        console.log("Error while fetching pets", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateFilter = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value
    }));
  };

  // Handler for search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
        if(searchTerm.trim() === "") {
            return;
        }
      setLoading(true);
      let petsResponse;
      if (searchTerm.trim() === "") {
        // If search is empty, fetch a default list of pets
        petsResponse = await getPetsByFilter({ numberOfPets: 3, offset: 1 });
      } else {
        // Otherwise, search pets by name
        petsResponse = await searchPetByName(searchTerm);
      }
      setPets(petsResponse);
    } catch (error) {
      console.log("Error during search:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.searchListContainer}>

      <PetFilters styles={styles} updateFilter={updateFilter}/>

      <div className={styles.listingSide}>
        <h1>Listing Of Animal Nearby</h1>
        <div className={styles.sortBy}>
          <span>Sort By:</span>
          <select name="sort" id="sort">
            <option value="newest">Newest</option>
          </select>
          {/* SEARCH */}
          <form onSubmit={handleSearch}>
            <input
                type="text"
                name="search"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "16px",
                width: "200px",
                marginLeft: "10px",
                }}
            />
            <i className="fa-solid fa-magnifying-glass" style={{"cursor":"pointer"}} onClick={handleSearch}></i>
          </form>
        </div>

        <div className={styles.petsListing}>
          {loading ? (
            <h1>Loading....</h1>
          ) : error ? (
            <h1>Error: {error}</h1>
          ) : (
            <>
              {pets && pets.length > 0 ? (
                pets.map((pet, index) => (
                  <PetCard
                    key={pet.$id || index}
                    petName={pet.name}
                    breedName={pet.breed}
                    petId={pet.$id}
                    isFav={true}
                    imageId={pet.main_image}
                  />
                ))
              ) : (
                <h1>No pets available at the moment!</h1>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndList;
