import React, { useState } from 'react';
import MyPets from '../MyPets';
import PetForm from '../PetForm';

const Actions = ({ user }) => {
    const [activeTab, setActiveTab] = useState('myPets'); // Manage active tab

    const tabStyle = {
        flex: 1,
        padding: '10px 15px',
        background: '#FFE6C9',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'all 0.3s ease',
    };

    const activeTabStyle = {
        ...tabStyle,
        background: '#FFC785',
        color: 'white',
        fontWeight: 'bold',
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Actions Section</h1>
            <div style={{ display: 'flex', borderBottom: '2px solid #ddd' }}>
                <button 
                    style={activeTab === 'myPets' ? activeTabStyle : tabStyle} 
                    onClick={() => setActiveTab('myPets')}
                >
                    See My Pets
                </button>
                <button 
                    style={activeTab === 'uploadPet' ? activeTabStyle : tabStyle} 
                    onClick={() => setActiveTab('uploadPet')}
                >
                    Upload New Pet
                </button>
            </div>

            <div style={{
                padding: '20px',
                background: '#fff',
                borderRadius: '5px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                marginTop: '10px'
            }}>
                {activeTab === 'myPets' ? <MyPets /> : <PetForm user={user} userId={user.$id} />}
            </div>
        </div>
    );
};

export default Actions;
