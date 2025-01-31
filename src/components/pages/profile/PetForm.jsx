import React, { useState } from 'react';
import { updatePetById, uploadPet } from '../../../api/petsApi';
import { useLocation } from 'react-router-dom';
import styles from '../../../styles/profile/petForm.module.css';

const PetForm = () => {
  const [petInfo, setPetInfo] = useState({
    name: 'Billy',
    age: 3,
    category: 'Cat',
    breed: 'Persian',
    size: 'Medium',
    temperament: 'Friendly',
    contact: '+92 384523432',
    gender: 'Male',
    location: 'Peshawar, Pakistan',
    bio: 'Billy is a friendly cat',
    main_image: 'main_image.jpg',
    images: ['image1', 'image2'],
  });

  const [loading, setLoading] = useState(false); // 🔹 Added loading state

  const location = useLocation();
  const { formType, petId } = location.state || { formType: 'upload' };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetInfo((prevInfo) => ({
      ...prevInfo,
      [name]: name === 'age' ? parseInt(value, 10) || '' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 🔹 Set loading to true when submitting

    try {
      formType === 'update' ? await updatePetById(petId, petInfo) : await uploadPet(petInfo);
      alert('Success!');
      setPetInfo({
        name: '',
        age: 1,
        category: 'Other',
        breed: '',
        size: '',
        temperament: '',
        contact: '',
        gender: 'Male',
        location: '',
        bio: '',
        main_image: '',
        images: [],
      });
    } catch (error) {
      console.log('Error:', error.message);
      alert('Failed to process pet information.');
    } finally {
      setLoading(false); // 🔹 Reset loading after completion
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.petForm}>
      <h2>{formType === 'update' ? 'Update Pet Information' : 'Upload Pet Information'}</h2>

      <div className={styles.petFormInputsContainer}>
        <div className={styles.inputRow}>
          <label>Name:</label>
          <input type="text" name="name" value={petInfo.name} onChange={handleChange} required />

          <label>Age:</label>
          <input type="number" name="age" value={petInfo.age} onChange={handleChange} required />
        </div>

        <div className={styles.inputRow}>
          <label>Category:</label>
          <select name="category" value={petInfo.category} onChange={handleChange} required>
            <option value="others">Others</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>

          <label>Breed:</label>
          <input type="text" name="breed" value={petInfo.breed} onChange={handleChange} required />
        </div>

        <div className={styles.inputRow}>
          <label>Size:</label>
          <input type="text" name="size" value={petInfo.size} onChange={handleChange} required />

          <label>Temperament:</label>
          <input type="text" name="temperament" value={petInfo.temperament} onChange={handleChange} required />
        </div>

        <div className={styles.inputRow}>
          <label>Location:</label>
          <input type="text" name="location" value={petInfo.location} onChange={handleChange} required />

          <label>Bio:</label>
          <textarea name="bio" value={petInfo.bio} onChange={handleChange} required />
        </div>

        <div className={styles.inputRow}>
          <label>Main Image URL:</label>
          <input type="text" name="main_image" value={petInfo.main_image} onChange={handleChange} required />

          <label>Photos (URLs, comma-separated):</label>
          <input type="text" name="images" value={petInfo.images} onChange={handleChange} placeholder="e.g. url1, url2" />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button type="submit" disabled={loading}>
          {loading ? (formType === 'update' ? 'Updating...' : 'Uploading...') : formType === 'update' ? 'Update Pet' : 'Upload Pet'}
        </button>
      </div>
    </form>
  );
};

export default PetForm;
