import React from 'react';
import MyPets from '../MyPets';
import PetForm from '../PetForm';

const Actions = ({userId}) => {
    return (
        <div>
            <h1>Actions Section</h1>

            <MyPets/> 
            <PetForm userId={userId}/>

        </div>
    );
}

export default Actions;
