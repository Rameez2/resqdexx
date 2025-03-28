import React, { useState } from 'react';
import { updatePetById, uploadPet } from '../../../api/petsApi';
import { useLocation } from 'react-router-dom';
import styles from '../../../styles/profile/petForm.module.css';
import { storage } from '../../../api/appwrite';
import { ID } from 'appwrite';

const PetForm = ({ user, userId }) => {
  const [petInfo, setPetInfo] = useState({
    name: '',
    age: '',
    species: 'Others',
    breed: '',
    size: '',
    temperament: '',
    contact: '',
    gender: 'Male',
    location: '',
    bio: '',
    rescue_story: '', // New field added
    images: [],
  });

  const [mainImageFile, setMainImageFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]); // State for multiple images
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const location = useLocation();
  const { formType, petId } = location.state || { formType: 'upload' };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      if (name === 'main_image') {
        setMainImageFile(files[0]); // Store the main image
      } else {
        setImageFiles([...files]); // Store multiple images
      }
    } else {
      setPetInfo((prevInfo) => ({
        ...prevInfo,
        [name]: name === 'age' ? parseInt(value, 10) || '' : value,
      }));
    }
  };

  async function uploadImage(file) {
    try {
      let uploadedImage = await storage.createFile('6799fb94000edc47b27d', ID.unique(), file);
      return uploadedImage.$id;
    } catch (error) {
      console.error('File Upload Error:', error);
      return null;
    }
  }

  async function uploadMultipleImages(files) {
    const uploadedIds = [];
    for (let file of files) {
      const imageId = await uploadImage(file);
      if (imageId) uploadedIds.push(imageId);
    }
    return uploadedIds;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.role !== 'Organization') {
      return alert('Only Organizations can upload pets.');
    }

    setLoading(true);

    try {
      let mainImgId = await uploadImage(mainImageFile);
      let imageIds = await uploadMultipleImages(imageFiles);

      const petData = { ...petInfo, main_image: mainImgId, images: imageIds, organization_id: userId };

      formType === 'update'
        ? await updatePetById(petId, petData)
        : await uploadPet(petData);

      alert('Pet uploaded successfully!');

      setPetInfo({
        name: '',
        age: '',
        species: 'Others',
        breed: '',
        size: '',
        temperament: '',
        contact: '',
        gender: 'Male',
        location: '',
        bio: '',
        rescue_story: '',
        images: [],
      });

      setMainImageFile(null);
      setImageFiles([]);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to upload pet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.petFormContainer}>
      <button className={styles.showFormBtn} onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Upload a Pet'}
      </button>

      {showForm && (
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
              <select name="species" value={petInfo.species} onChange={handleChange} required>
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
              <label>Contact:</label>
              <input type="text" name="contact" value={petInfo.contact} onChange={handleChange} required />

              <label>Location:</label>
              <input type="text" name="location" value={petInfo.location} onChange={handleChange} required />
            </div>

            <div className={styles.inputRow}>
              <label>Bio:</label>
              <textarea name="bio" value={petInfo.bio} onChange={handleChange} required />
            </div>

            <div className={styles.inputRow}>
              <label>Rescue Story:</label> {/* New Field */}
              <textarea name="rescue_story" value={petInfo.rescue_story} onChange={handleChange} required />
            </div>

            <div className={styles.inputRow}>
              <label>Gender:</label>
              <select name="gender" value={petInfo.gender} onChange={handleChange} required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className={styles.inputRow}>
              <label>Main Image:</label>
              <input type="file" name="main_image" onChange={handleChange} required />

              <label>Additional Images:</label>
              <input type="file" name="images" multiple onChange={handleChange} />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button className="primary-btn" type="submit" disabled={loading}>
              {loading ? (formType === 'update' ? 'Updating...' : 'Uploading...') : formType === 'update' ? 'Update Pet' : 'Upload Pet'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PetForm;
