import React, { useEffect, useState } from "react";
import { adminDeletePetById } from "../../../api/adminApi";
import { getAllPets } from "../../../api/petsApi";

const PetsList = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingPetId, setDeletingPetId] = useState(null); // Track deleting pet
    const [searchTerm, setSearchTerm] = useState(""); // Search input state

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const data = await getAllPets();
                setPets(data);
            } catch (err) {
                setError("Failed to fetch pets.");
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    async function deletePet(petId) {
        setDeletingPetId(petId);
        try {
            await adminDeletePetById(petId);
            setPets((prevPets) => prevPets.filter((pet) => pet.$id !== petId));
        } catch (error) {
            console.log("Pet delete Error:", error);
            alert("Failed to delete pet.");
        } finally {
            setDeletingPetId(null);
        }
    }

    // Filter pets based on search term (name or ID)
    const filteredPets = pets.filter(
        (pet) =>
            pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pet.$id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p style={{ textAlign: "center", fontSize: "18px" }}>Loading pets...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2 style={{ marginBottom: "15px", color: "#333" }}>Pets List</h2>

            {/* Search Bar */}
            <input
                type="text"
                name="search"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: "10px",
                    width: "60%",
                    maxWidth: "400px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginBottom: "20px",
                    fontSize: "16px"
                }}
            />

            {/* Pets List */}
            {filteredPets.length > 0 ? (
                <ul style={{ listStyleType: "none", padding: "0", maxWidth: "600px", margin: "0 auto" }}>
                    {filteredPets.map((pet, index) => (
                        <li 
                            key={pet.$id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "10px",
                                borderBottom: "1px solid #ddd",
                                fontSize: "16px",
                                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff"
                            }}
                        >
                            <span>{index + 1}. {pet.name} (ID: {pet.$id})</span>

                            {/* Delete Button */}
                            <button
                                onClick={() => deletePet(pet.$id)}
                                disabled={deletingPetId === pet.$id}
                                style={{
                                    padding: "8px 12px",
                                    backgroundColor: deletingPetId === pet.$id ? "#ccc" : "#ff4d4d",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: deletingPetId === pet.$id ? "not-allowed" : "pointer",
                                    fontSize: "14px"
                                }}
                            >
                                {deletingPetId === pet.$id ? "Deleting..." : "Delete"}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ color: "#888", marginTop: "10px" }}>No pets found.</p>
            )}
        </div>
    );
};

export default PetsList;
