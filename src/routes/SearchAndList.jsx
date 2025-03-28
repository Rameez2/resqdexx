import React, { useEffect, useState } from "react";
import PetCard from "../components/pages/homePage/PetCard";
import styles from "../styles/searchAndList.module.css";
import { useUser } from "../context/userContext";
import { getPetsByFilter } from "../api/petsApi";
import { searchPetByName } from "../api/searchingApi";

const SearchAndList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters,setFilters] = useState({
    numberOfPets:10,
    // offset:1
  });
  const { user } = useUser();

  // Initial load: fetch pets (using filters: for example 10 pets starting from offset 1)
  useEffect(() => {
    (async () => {
      try {
        const petsResponse = await getPetsByFilter(10,1);
        setPets(petsResponse);
      } catch (error) {
        console.log("Error while fetching pets", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Handler for search
  const handleSearch = async () => {
    try {
        if(searchTerm.trim() === "") {
            return;
        }
      setLoading(true);
      let petsResponse;
      if (searchTerm.trim() === "") {
        // If search is empty, fetch a default list of pets
        petsResponse = await getPetsByFilter({ numberOfPets: 10, offset: 1 });
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
      <div className={styles.filters}>
        <h2>Filters</h2>
        <div className={styles.filtersContainer}>
          <div className={styles.filterGroup}>
            <label htmlFor="breed">Breed</label>
            <select id="breed">
              <option value="">All Breeds</option>
              {/* Add breed options here */}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="specie">Specie</label>
            <select id="specie">
              <option value="">All Species</option>
              {/* Add color options here */}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="age">Age</label>
            <select id="age">
              <option value="">All Ages</option>
              {/* Add age options here */}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="size">Size</label>
            <select id="size">
              <option value="">All Sizes</option>
              {/* Add size options here */}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="gender">Gender</label>
            <select id="gender">
              <option value="">All Genders</option>
              {/* Add gender options here */}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="shelter-rescue">Shelter Or Rescue</label>
            <select id="shelter-rescue">
              <option value="">All Shelters</option>
              {/* Add shelter/rescue options here */}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.listingSide}>
        <h1>Listing Of Animal Nearby</h1>
        <div className={styles.sortBy}>
          <span>Sort By:</span>
          <select name="sort" id="sort">
            <option value="newest">Newest</option>
          </select>
          {/* SEARCH */}
          <div>
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
          </div>
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
