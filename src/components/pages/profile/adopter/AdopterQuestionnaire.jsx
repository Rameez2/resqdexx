// FILE: AdopterQuestionnaire.jsx

import React, { useReducer, useEffect, useState } from "react";
import { getOrgAdopDataById, updateRecord } from "../../../../api/orgAdopterFORMApi";
import PersonalInformation from "../PersonalInformation";

// ----------------- INITIAL STATE -----------------
const initialState = {
  personal_info: ["", "", "", "", ""],
  additional_info: "",
  household_info: ["", "", "", ""],
  experience_with_pets: ["", "", ""],
  adoption_intentions: ["", "", ""],
  lifestyle_commitment: ["", "", "", "", ""],
  financial_considerations: ["", ""],
  references: ["", ""],
};

// ----------------- REDUCER -----------------
const formReducer = (state, action) => {
  const { field, value, index } = action;

  if (Array.isArray(state[field])) {
    // It's an array field → update the specific index
    const updatedArray = [...state[field]];
    updatedArray[index] = value;
    return { ...state, [field]: updatedArray };
  }

  // Otherwise a single string field
  return { ...state, [field]: value };
};

// ----------------- MODAL COMPONENT -----------------
/**
 * AdopterQuestionnaire (Modal)
 * @param {boolean}  isOpen        - Whether to show or hide the modal
 * @param {Function} onClose       - Callback to close the modal
 * @param {string}   existingDocId - The Appwrite document ID to update
 * @param {Function} [onSubmit]    - Optional callback after updating
 */
const AdopterQuestionnaire = ({ isOpen, onClose, existingDocId, onSubmit }) => {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [submitLoading,submitFormLoading] = useState(false);
  // const [loading,setLoading] = useState(true);

  // 1. Populate form with existing doc data when modal opens
  // useEffect(() => {
  //   if (isOpen && existingDocId) {
  //     // Fetch the doc
  //     getOrgAdopDataById(existingDocId)
  //       .then((doc) => {
  //         // personal_info (array of 5)
  //         if (Array.isArray(doc.personal_info)) {
  //           doc.personal_info.forEach((val, i) => {
  //             dispatch({ field: "personal_info", value: val, index: i });
  //           });
  //         }
  //         // additional_info (single string)
  //         if (typeof doc.additional_info === "string") {
  //           dispatch({ field: "additional_info", value: doc.additional_info });
  //         }

  //         // household_info (4)
  //         if (Array.isArray(doc.household_info)) {
  //           doc.household_info.forEach((val, i) => {
  //             dispatch({ field: "household_info", value: val, index: i });
  //           });
  //         }

  //         // experience_with_pets (3)
  //         if (Array.isArray(doc.experience_with_pets)) {
  //           doc.experience_with_pets.forEach((val, i) => {
  //             dispatch({ field: "experience_with_pets", value: val, index: i });
  //           });
  //         }

  //         // adoption_intentions (3)
  //         if (Array.isArray(doc.adoption_intentions)) {
  //           doc.adoption_intentions.forEach((val, i) => {
  //             dispatch({ field: "adoption_intentions", value: val, index: i });
  //           });
  //         }

  //         // lifestyle_commitment (5)
  //         if (Array.isArray(doc.lifestyle_commitment)) {
  //           doc.lifestyle_commitment.forEach((val, i) => {
  //             dispatch({ field: "lifestyle_commitment", value: val, index: i });
  //           });
  //         }

  //         // financial_considerations (2)
  //         if (Array.isArray(doc.financial_considerations)) {
  //           doc.financial_considerations.forEach((val, i) => {
  //             dispatch({ field: "financial_considerations", value: val, index: i });
  //           });
  //         }

  //         // references (2)
  //         if (Array.isArray(doc.references)) {
  //           doc.references.forEach((val, i) => {
  //             dispatch({ field: "references", value: val, index: i });
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching doc:", err);
  //       }).finally(() => {
  //         setLoading(false)
  //       })
  //   }
  // }, [isOpen, existingDocId]);
  // 2. is not open dont render
  if (!isOpen) return null;

  // 3. Handler for updating fields
  const handleChange = (field, value, index = null) => {
    dispatch({ field, value, index });
  };

  // 4. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      submitFormLoading(true);
      const updatedDoc = await updateRecord(existingDocId, formData, "adopter");
      console.log("Adopter record updated:", updatedDoc);

      if (onSubmit) onSubmit(updatedDoc);
      // Optionally close modal on success:
      // onClose();
    } catch (error) {
      console.error("Error updating the record:", error);
    }
    finally {
      submitFormLoading(false);
    }
  };

  // 5. Inline style (optional)
  const styles = {
    mainContainer: {
      backgroundColor: "white",
      borderRadius: "10px",
      overflow: "hidden",
      padding: "5px",
      width: "-webkit-fill-available",
      height: "fit-content",
      margin: "10px",
    },
  };

  // if(loading) return <h1>Loading Form...</h1>;

  // ----------------- RENDER (MODAL) -----------------
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      style={styles.mainContainer}
    >
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-2xl p-6 rounded-md shadow-lg">
        {/* Close Button (top-right corner) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
          Adoption Application
        </h2>

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* personal_info → 5 inputs */}
          <PersonalInformation
            data={formData.personal_info}
            onChange={(idx, newValue) => handleChange("personal_info", newValue, idx)}
          />

          {/* additional_info → single textarea */}
          <FormSection title="Additional Info">
            <TextArea
              value={formData.additional_info}
              onChange={(e) => handleChange("additional_info", e.target.value)}
            />
          </FormSection>

          {/* household_info (4 inputs) */}
          <FormSection title="Household Info">
            {formData.household_info.map((val, idx) => (
              <TextField
                key={idx}
                value={val}
                onChange={(e) => handleChange("household_info", e.target.value, idx)}
              />
            ))}
          </FormSection>

          {/* experience_with_pets (3 inputs) */}
          <FormSection title="Experience with Pets">
            {formData.experience_with_pets.map((val, idx) => (
              <TextField
                key={idx}
                value={val}
                onChange={(e) => handleChange("experience_with_pets", e.target.value, idx)}
              />
            ))}
          </FormSection>

          {/* adoption_intentions (3 inputs) */}
          <FormSection title="Adoption Intentions">
            {formData.adoption_intentions.map((val, idx) => (
              <TextField
                key={idx}
                value={val}
                onChange={(e) => handleChange("adoption_intentions", e.target.value, idx)}
              />
            ))}
          </FormSection>

          {/* lifestyle_commitment (5 inputs) */}
          <FormSection title="Lifestyle Commitment">
            {formData.lifestyle_commitment.map((val, idx) => (
              <TextField
                key={idx}
                value={val}
                onChange={(e) => handleChange("lifestyle_commitment", e.target.value, idx)}
              />
            ))}
          </FormSection>

          {/* financial_considerations (2 inputs) */}
          <FormSection title="Financial Considerations">
            {formData.financial_considerations.map((val, idx) => (
              <TextField
                key={idx}
                value={val}
                onChange={(e) => handleChange("financial_considerations", e.target.value, idx)}
              />
            ))}
          </FormSection>

          {/* references (2 inputs) */}
          <FormSection title="References">
            {formData.references.map((val, idx) => (
              <TextField
                key={idx}
                value={val}
                onChange={(e) => handleChange("references", e.target.value, idx)}
              />
            ))}
          </FormSection>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            {submitLoading ? 'please wait...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

// -------------- HELPER COMPONENTS --------------
const FormSection = ({ title, children }) => (
  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4">
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <div className="mt-2 space-y-2">{children}</div>
  </div>
);

const TextField = ({ value, onChange }) => (
  <input
    type="text"
    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 transition"
    value={value}
    onChange={onChange}
  />
);

const TextArea = ({ value, onChange }) => (
  <textarea
    rows={3}
    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 transition"
    value={value}
    onChange={onChange}
  />
);

export default AdopterQuestionnaire;
