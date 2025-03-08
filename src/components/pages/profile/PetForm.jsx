import React, { useState } from 'react';
import { updatePetById, uploadPet } from '../../../api/petsApi';
import { useLocation } from 'react-router-dom';
import styles from '../../../styles/profile/petForm.module.css';
import { storage } from '../../../api/appwrite';
import { ID } from 'appwrite';

const PetForm = ({userId}) => {
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
    images: ['image1', 'image2'],
  });

  const [mainImageFile, setMainImageFile] = useState(null); // 🔹 Separate state for the file
  const [loading, setLoading] = useState(false);
  const [showForm,setShowForm] = useState(false);

  const location = useLocation();
  const { formType, petId } = location.state || { formType: 'upload' };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === "file") {
      setMainImageFile(files[0]); // 🔹 Store file in state
    } else {
      setPetInfo((prevInfo) => ({
        ...prevInfo,
        [name]: name === 'age' ? parseInt(value, 10) || '' : value,
      }));
    }
  };


//  async function getFileUrl(bucketId, fileId) {
//     try {
//         let filePreview = await storage.getFilePreview(bucketId, fileId);
//         console.log('pppppppp',filePreview);
        
//         return filePreview; // 🔹 Return the file preview URL
//     } catch (error) {
//         console.error("File Preview Error:", error);
//         return null;
//     }
// }

  async function uploadImage() {
    try {
      console.log('uploading image....');
      
      let uploadedImage = await storage.createFile('6799fb94000edc47b27d', ID.unique(), mainImageFile);
      
      return uploadedImage.$id;
    } catch (error) {
      console.error("File Upload Error:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('org_id before upload',userId);
    
    let img = await uploadImage();
    setLoading(true);

    try {
      const petData = { ...petInfo, main_image: img }; // 🔹 Attach the file
      petData.organization_id = userId;
      formType === 'update' ? await updatePetById(petId, petData) : await uploadPet(petData);
      
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
        images: [],
      });
      setMainImageFile(null); // 🔹 Reset file state
    } catch (error) {
      console.log('Error:', error.message);
      alert('Failed to process pet information.');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className={styles.petFormContainer}>
    <button className={styles.showFormBtn} onClick={() => setShowForm(!showForm)}>Upload a Pet</button>

    {showForm ? 
    

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
            <option value="Others">Others</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
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
          <label>Main Image:</label>
          <input type="file" name="main_image" onChange={handleChange} required />

          <label>Photos (URLs, comma-separated):</label>
          <input type="text" name="images" value={petInfo.images} onChange={handleChange} placeholder="e.g. url1, url2" />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className='primary-btn' type="submit" disabled={loading}>
          {loading ? (formType === 'update' ? 'Updating...' : 'Uploading...') : formType === 'update' ? 'Update Pet' : 'Upload Pet'}
        </button>
      </div>
    </form>
      :
      <></>
    }
    </div>
  );
};

export default PetForm;
