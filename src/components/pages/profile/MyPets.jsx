import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteMyPet, getMyPets } from "../../../api/petsApi";
import styles from "../../../styles/profile/myPets.module.css"; // 🔹 Import CSS file
import { storage } from "../../../api/appwrite";

const MyPets = () => {
    const [pets, setPets] = useState();
    const [deletingPetId, setDeletingPetId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function showPets() {
        setLoading(true);
        setError(null);
        try {
            const petResponse = await getMyPets();
            if (petResponse.length === 0) {
                setError("No pets found.");
            }
            setPets(petResponse);
        } catch (error) {
            setError("Error fetching pets. Please try again.");
            console.log("Error Fetching my Pets:", error.message);
        } finally {
            setLoading(false);
        }
    }

    async function deletePet(petId) {
        setDeletingPetId(petId);
        try {
            await deleteMyPet(petId);
            setPets((prevPets) => prevPets.filter((pet) => pet.$id !== petId));
        } catch (error) {
            console.log("Error While Deleting Pet:", error.message);
        } finally {
            setDeletingPetId(null);
        }
    }


    return (
        <div className={styles.container}>
            <button className={styles.loadButton} onClick={showPets} disabled={loading}>
                {loading ? "Loading..." : "SEE MY PETS"}
            </button>

            {loading && <p className={styles.loading}>Loading pets...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {pets && pets.length > 0 && (
                <table className={styles.petTable}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img src={storage.getFileView('6799fb94000edc47b27d', pet.main_image)} style={{width:'100px'}} alt="" /></td>
                                <td>
                                <Link to={`/pet-details/${pet.$id}`} >{pet.name}</Link>
                                
                                </td>
                                <td>{pet.$id}</td>
                                <td className={styles.actions}>
                                    <Link to="/pet-form" state={{ formType: "update", petId: pet.$id }}>
                                        <button className={styles.updateButton}>Update</button>
                                    </Link>
                                    <button 
                                        className={styles.deleteButton} 
                                        onClick={() => deletePet(pet.$id)}
                                        disabled={deletingPetId === pet.$id}
                                    >
                                        {deletingPetId === pet.$id ? "Deleting..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyPets;