const PetFilters = ({ styles, updateFilter }) => {
    return (
      <div className={styles.filters}>
        <h2>Filters</h2>
        <div className={styles.filtersContainer}>
          <div className={styles.filterGroup}>
            <label htmlFor="breed">Breed</label>
            <select id="breed" onChange={(e) => updateFilter("breed", e.target.value)}>
              <option value="">All Breeds</option>
              <option value="persian">Persian</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="specie">Specie</label>
            <select id="specie" onChange={(e) => updateFilter("specie", e.target.value)}>
              <option value="">All Species</option>
              <option value="Cat">Cat</option>
              <option value="Dog">Dog</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="size">Size</label>
            <select id="size" onChange={(e) => updateFilter("size", e.target.value)}>
              <option value="">All Sizes</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="gender">Gender</label>
            <select id="gender" onChange={(e) => updateFilter("gender", e.target.value)}>
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </div>
    );
  };
  
  export default PetFilters;
  