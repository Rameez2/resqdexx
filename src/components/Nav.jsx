import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/nav.module.css';
import { useUser } from '../context/userContext';

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

    return (
    <nav>
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
            {user? <button style={{"backgroundColor":"blue","color":"white"}} onClick={handleLogOut}>Log Out</button> :
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
            <button className='primary-btn' style={{"color":"white","border":"1px solid white",}} >Join as organization</button>

            </div>
        </div>
    </nav>
    );
}

export default Nav;
