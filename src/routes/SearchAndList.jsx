import React, { useEffect, useState } from "react";
import PetCard from "../components/pages/homePage/PetCard";
import styles from "../styles/searchAndList.module.css";
import { useUser } from "../context/userContext";
import { getPetsByFilter } from "../api/petsApi";
import { searchPetByName } from "../api/searchingApi";
import PetFilters from "../components/pages/searchAndList/PetFilters";
import PetCardSkeleton from "../components/loaders/PetCardSkeleton";

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
        const petsResponse = await getPetsByFilter(10, 0); // limit,offset
        setPets(petsResponse);
      } catch (error) {
        console.log("Error while fetching pets", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const petsResponse = await getPetsByFilter(10, 0, filters); // limit,offset,filters
        setPets(petsResponse);
      } catch (error) {
        console.log('filter error while fetching pets',error.message);
      } finally {
        setLoading(false);
      }
    })()
  }, [filters]);


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
      if (searchTerm.trim() === "") {
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

      <PetFilters styles={styles} updateFilter={updateFilter} />

      <div className={styles.listingSide}>
        <h1>Listing Of Animal Nearby</h1>
        <div className={styles.sortBy}>
          <span>Sort By:</span>
          <select name="sort" id="sort">
            <option value="newest">Newest</option>
          </select>
          {/* SEARCH */}
          <form onSubmit={handleSearch} className={styles.formSearch}>
            <input
              type="text"
              name="search"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass" style={{ "cursor": "pointer" }} onClick={handleSearch}></i>
          </form>
        </div>

        <div className={styles.petsListing}>
          {loading ? (
            <>
              <PetCardSkeleton/>
              <PetCardSkeleton/>
              <PetCardSkeleton/>
              <PetCardSkeleton/>
            </>
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
