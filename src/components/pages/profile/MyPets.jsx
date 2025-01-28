import { useState } from "react";
import { deleteMyPet, getMyPets } from "../../../api/apiCalls";
import { Link } from "react-router-dom";
const MyPets = () => {

    const [pets,setPets] = useState();

    async function showPets() {
        try {
            const petResponse = await getMyPets();
            setPets(petResponse);
        } catch (error) {
            console.log('Error Fetching my Pets:',error.message);
        }
    }

    async function deletePet(petId) {
        try {
            await deleteMyPet(petId);
            setPets((prevPets) => prevPets.filter((pet) => pet.$id !== petId));
        } catch (error) {
            console.log('Error While Deleting Pet:',error.message);
            
        }
    }

    return (
        <div>
            <button onClick={showPets}>SEE MY PETS</button>
            {pets ? 
                pets.map((pet,index) => {
                    return (
                        <div key={index}>
                            <span style={{color:"blue"}}>{index+1}. {pet.name}</span>
                            <Link to="/pet-form" state={{ formType: 'update',petId:pet.$id }}>
                                <button>Update</button>
                            </Link>
                            <button onClick={() => deletePet(pet.$id)}>Delete</button>
                        </div>
                    )
                })
             : <></>}
        </div>
    );
}

export default MyPets;
