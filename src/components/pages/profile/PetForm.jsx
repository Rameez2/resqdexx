import React, { useState } from 'react';
import { updatePetById, uploadPet } from '../../../api/petsApi';
import { useLocation } from 'react-router-dom';

const PetForm = () => {
  const [petInfo, setPetInfo] = useState({
    name: 'deummm',
    age: 1,
    category: 'Other', // Default category
    breed: 'asdasd',
    size: 'Small',
    temperament: 'Calm',
    contact: '+92 305106514',
    gender: 'Male',
    location: 'Peshawar',
    bio: 'this is',
    main_image:'main_img_url',
    images: [], // You can later extend this to handle file inputs for photos
  });

  const location = useLocation();

  const { formType,petId } = location.state || "upload";

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // If the field is 'age', convert the value to an integer
    if (name === 'age') {
      setPetInfo((prevInfo) => ({
        ...prevInfo,
        [name]: parseInt(value, 10) || '', // Use parseInt and fallback to empty string if invalid input
      }));
    } else {
      setPetInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        formType === "update" ? await updatePetById(petId,petInfo) : await uploadPet(petInfo);;
      // Reset the form after successful submission
      setPetInfo({
        name: '',
        age: 1,
        category: 'Other',
        breed: '',
        size: '',
        temperament: '',
        location: '',
        bio: '',
        gender:'Male',
        photos: [],
      });
    } catch (error) {
        console.log(error);
      alert('Failed to upload or update pet.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      {formType === "update" ? <h2>Update Pet Information</h2> : <h2>Upload Pet Information</h2>}

      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={petInfo.name}
        onChange={handleChange}
        required
      />
      
      <label>Age:</label>
      <input
        type="number"
        name="age"
        value={petInfo.age}
        onChange={handleChange}
        required
      />
      
      <label>Category:</label>
      <select
        name="category"
        value={petInfo.category}
        onChange={handleChange}
        required
      >
        <option value="others">Others</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
      </select>

      <label>Breed:</label>
      <input
        type="text"
        name="breed"
        value={petInfo.breed}
        onChange={handleChange}
        required
      />

      <label>Size:</label>
      <input
        type="text"
        name="size"
        value={petInfo.size}
        onChange={handleChange}
        required
      />

      <label>Temperament:</label>
      <input
        type="text"
        name="temperament"
        value={petInfo.temperament}
        onChange={handleChange}
        required
      />

      <label>Location:</label>
      <input
        type="text"
        name="location"
        value={petInfo.location}
        onChange={handleChange}
        required
      />

      <label>Bio:</label>
      <textarea
        name="bio"
        value={petInfo.bio}
        onChange={handleChange}
        required
      />

      <label>Photos (URLs):</label>
      <input
        type="text"
        name="photos"
        value={petInfo.photos}
        onChange={handleChange}
        placeholder="Comma separated URLs"
      />
      {formType === "update" ? <button type="submit">Update Pet</button> : <button type="submit">Upload Pet</button>}
        
      
    </form>
  );
};

export default PetForm;
