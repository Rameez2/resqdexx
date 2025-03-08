import { Link } from 'react-router-dom';
import styles from '../styles/nav.module.css';
import { useUser } from '../context/userContext';
import { Client, Functions, ID } from "appwrite";
import { useState } from 'react';
import { storage } from '../api/appwrite';
import { generateJWT } from '../api/authApi';
import { sendMessage } from '../api/messagesApi';



const Nav = () => {

    let { user, logout } = useUser();
    // const [pic,setPic] = useState(null);

    async function handleLogOut() {
        try {
            let response = await logout();
            console.log('logout success', response);
        } catch (error) {
            console.log(error);
        }
    }


    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     if(pic != null) {
    //         try {
    //             console.log('upload start');
    //             // REACT_APP_BUCKET_ID
    //             let x = await storage.createFile(
    //                 process.env.REACT_APP_BUCKET_ID,
    //                 ID.unique(),
    //                 pic
    //             );
    //             console.log(x);
                
    //         } catch (error) {
    //             console.log('error while upload:',error.message);
                
    //         }
    //     }
    // }


 
    return (
        <nav>
            <button onClick={generateJWT}>Get JWT</button>
            <button onClick={sendMessage}>Send Message</button>

            <div className={styles.navTop}>
                <div className={styles.navLogo}>
                    <img src="https://i0.wp.com/onegroupnetwork.com/wp-content/uploads/2020/09/dummy-logo-5b.png" alt="" />
                </div>
                <div className={styles.navLinks}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/animals-list">Animal Listing</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>
                <div className={styles.navButtons}>
                    {user ?
                        <>
                            <Link to="/profile">        <i
                                className="fa-solid fa-user"
                                style={{
                                    fontSize: '35px',
                                    backgroundColor: 'orange',
                                    color: 'white',
                                    borderRadius: '8px',
                                    padding: '5px',
                                    cursor: 'pointer',
                                }}
                            ></i></Link>
                            <button className='primary-btn' style={{ "backgroundColor": "red", "color": "white" }} onClick={handleLogOut}>Log Out</button>
                        </>
                        :
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
                        <option value="audi">cat</option>
                    </select>

                    <select className={styles.navSelect} name="dogs" id="dogs">
                        <option value="dogs">Cats & Kittens</option>
                        <option value="audi">others</option>
                    </select>

                    <select className={styles.navSelect} name="dogs" id="dogs">
                        <option value="dogs">Other Pets</option>
                        <option value="opel">rabbits</option>
                        <option value="audi">snakes</option>
                    </select>

                    <select className={styles.navSelect} name="dogs" id="dogs">
                        <option value="dogs">Pet Shelters</option>
                        <option value="opel">Peshawr</option>
                        <option value="audi">Islamabad</option>
                    </select>

                </div>
                <div className="navBottomBtn">
                    {user ? user.role === "Organization" ? 
                        <Link to="/search-adopters">
                        <button className='primary-btn no-hover' style={{ "color": "white", "border": "1px solid white" }} >Search for Adopters</button>
                    </Link>
                    :<></>
                    :                    
                    <Link to="/register?role=organization">
                        <button className='primary-btn no-hover' style={{ "color": "white", "border": "1px solid white" }} >Join as organization</button>
                    </Link>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Nav;
