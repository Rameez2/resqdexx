import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteMyPet, getMyPets } from "../../../api/petsApi";
import styles from "../../../styles/profile/myPets.module.css"; // 🔹 Import CSS file

const MyPets = () => {
    const [pets, setPets] = useState();
    const [deletingPetId, setDeletingPetId] = useState(null);

    async function showPets() {
        try {
            const petResponse = await getMyPets();
            setPets(petResponse);
        } catch (error) {
            console.log("Error Fetching my Pets:", error.message);
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
            <button className={styles.loadButton} onClick={showPets}>SEE MY PETS</button>

            {pets && pets.length > 0 ? (
                <table className={styles.petTable}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{pet.name}</td>
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
            ) : (
                <p className={styles.noPets}>No pets found.</p>
            )}
        </div>
    );
};

export default MyPets;
