import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/nav.module.css';
import { useUser } from '../context/userContext';
import { getCurrentUserData, uploadPet,getMyPets, deleteMyPet, updatePetById } from '../api/apiCalls';

const Nav = () => {

    let {user,logout} = useUser();

    async function handleLogOut() {
        try {
            let response = await logout();
            console.log('logout success', response);
        } catch (error) {
            console.log(error);
        }
    }

    const petData = {
        name: "Luna",
        breed: "Maine Coon",
        age: 4,
        size: "Large",
        temperament: "Calm",
        location: "San Francisco",
        bio: "A playful Maine Coon cat that loves to explore and cuddle.",
        photos: ["photo1_url", "photo2_url", "photo3_url"],
        category: "cat"  // Category set to 'cat'
      };
      

      const petId = "67975aa200038644a50f"; // Replace with the pet's document ID
      const updatedData = {
        name: "by rehan2",       // Example of fields to update
        age: 5,
        bio: "Updated bio of the pet.",
      };

    return (
    <nav>
        <div className="crudActions">
            <button onClick={getCurrentUserData}>GET CURRENT USER</button>
            <button onClick={() => {uploadPet(petData)}}>UPLOAD PET</button>
            <button onClick={getMyPets}>SEE MY PETS</button>
            <button onClick={() => deleteMyPet("6797525b000991e79ff4")}>DELETE MY PET</button>
            <button onClick={() => updatePetById(petId,updatedData)}>UPDATE MY PET</button>

        </div>


        <div className={styles.navTop}>
            <div className={styles.navLogo}>
                <img src="https://i0.wp.com/onegroupnetwork.com/wp-content/uploads/2020/09/dummy-logo-5b.png" alt="" />
            </div>
            <div className={styles.navLinks}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/animal-listing">Animal Listing</Link>
                <Link to="/contact">Contact Us</Link>
            </div>
            <div className={styles.navButtons}>
            {user? <button className='primary-btn' style={{"backgroundColor":"red","color":"white"}} onClick={handleLogOut}>Log Out</button> :
            <>
                <Link to="/login">
                    <button className='primary-btn'>Login</button>
                </Link>
                <Link to="/register">
                    <button className='secondary-btn' >Sign Up</button>
                </Link>

            </>
            }
            </div>
        </div>
        <div className={styles.navBottom}>
            <div className={styles.navBottomLinks}>

            <select className={styles.navSelect} name="dogs" id="dogs">
                <option value="dogs">Dogs</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
            </select>

            <select className={styles.navSelect} name="dogs" id="dogs">
                <option value="dogs">Cats & Kittens</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
            </select>

            <select className={styles.navSelect} name="dogs" id="dogs">
                <option value="dogs">Other Pets</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
            </select>

            <select className={styles.navSelect} name="dogs" id="dogs">
                <option value="dogs">Pet Shelters</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
            </select>

            </div>
            <div className="navBottomBtn">
            <Link to="/register?role=organization">
                <button className='primary-btn' style={{"color":"white","border":"1px solid white",}} >Join as organization</button>
            </Link>
            </div>
        </div>
    </nav>
    );
}

export default Nav;
