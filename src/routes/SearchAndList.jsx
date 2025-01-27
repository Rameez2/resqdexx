import PetCard from '../components/pages/homePage/PetCard';
import styles from '../styles/searchAndList.module.css';

const SearchAndList = () => {
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
                        <label htmlFor="color">Color</label>
                        <select id="color">
                            <option value="">All Colors</option>
                            {/* Add color options here */}
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
                </div>
                <div className={styles.petsListing}>
                    <PetCard petName="Liza" breedName="persian" />
                    <PetCard petName="Liza" breedName="persian" />
                    <PetCard petName="Liza" breedName="persian" />
                    <PetCard petName="Liza" breedName="persian" />
                    <PetCard petName="Liza" breedName="persian" />

                </div>
            </div>
        </div>
    );
}

export default SearchAndList;
