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

// ----------------- PLACEHOLDERS OBJECT -----------------
const placeholders = {
  personal_info: [
    "Enter your first name",
    "Enter your last name",
    "Enter your email address",
    "Enter your phone number",
    "Enter your residential address",
  ],
  additional_info: "Enter any additional information about yourself",
  household_info: [
    "Enter household detail 1",
    "Enter household detail 2",
    "Enter household detail 3",
    "Enter household detail 4",
  ],
  experience_with_pets: [
    "Describe your experience with pets 1",
    "Describe your experience with pets 2",
    "Describe your experience with pets 3",
  ],
  adoption_intentions: [
    "What are your adoption intentions 1",
    "What are your adoption intentions 2",
    "What are your adoption intentions 3",
  ],
  lifestyle_commitment: [
    "Describe your lifestyle commitment 1",
    "Describe your lifestyle commitment 2",
    "Describe your lifestyle commitment 3",
    "Describe your lifestyle commitment 4",
    "Describe your lifestyle commitment 5",
  ],
  financial_considerations: [
    "Enter financial consideration 1",
    "Enter financial consideration 2",
  ],
  references: [
    "Enter reference detail 1",
    "Enter reference detail 2",
  ],
};

// ----------------- REDUCER -----------------
const formReducer = (state, action) => {
  const { field, value, index } = action;

  if (Array.isArray(state[field])) {
    const updatedArray = [...state[field]];
    updatedArray[index] = value;
    return { ...state, [field]: updatedArray };
  }

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
  const [submitLoading, setSubmitLoading] = useState(false);

  // If modal is not open, do not render
  if (!isOpen) return null;

  // Handler for updating fields
  const handleChange = (field, value, index = null) => {
    dispatch({ field, value, index });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      const updatedDoc = await updateRecord(existingDocId, formData, "adopter");
      console.log("Adopter record updated:", updatedDoc);
      alert('Form Submit Success');
      if (onSubmit) onSubmit(updatedDoc);
      // Optionally close modal on success:
      // onClose();
    } catch (error) {
      console.error("Error updating the record:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Inline style (optional)
  const modalContainerStyle = {
    backgroundColor: "white",
    borderRadius: "10px",
    overflow: "hidden",
    padding: "5px",
    width: "100%",
    maxWidth: "800px",
    height: "fit-content",
    margin: "10px",
  };

  // ----------------- RENDER (MODAL) -----------------
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      style={modalContainerStyle}
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
            placeholders={placeholders.personal_info}
            onChange={(idx, newValue) =>
              handleChange("personal_info", newValue, idx)
            }
          />

          {/* additional_info → single textarea */}
          <FormSection title="Additional Info">
            <TextArea
              value={formData.additional_info}
              onChange={(e) => handleChange("additional_info", e.target.value)}
              placeholder={placeholders.additional_info}
            />
          </FormSection>

          {/* household_info (4 inputs) */}
          <FormSection title="Household Info">
            {formData.household_info.map((val, idx) => (
              <TextField
                key={idx}
                value={val}
                onChange={(e) =>
                  handleChange("household_info", e.target.value, idx)
                }
                placeholder={placeholders.household_info[idx]}
              />
            ))}
          </FormSection>

          {/* experience_with_pets (3 inputs) */}
          <FormSection title="Experience with Pets">
            {formData.experience_with_pets.map((val, idx) => (
              <TextField
                key={idx}
                value={val}
                onChange={(e) =>
                  handleChange("experience_with_pets", e.target.value, idx)
                }
                placeholder={placeholders.experience_with_pets[idx]}
              />
            ))}
          </FormSection>

          {/* adoption_intentions (3 inputs) */}
          <FormSection title="Adoption Intentions">
            {formData.adoption_intentions.map((val, idx) => (
              <TextField
                key={idx}
                value={val}
                onChange={(e) =>
                  handleChange("adoption_intentions", e.target.value, idx)
                }
                placeholder={placeholders.adoption_intentions[idx]}
              />
            ))}
          </FormSection>

          {/* lifestyle_commitment (5 inputs) */}
          <FormSection title="Lifestyle Commitment">
            {formData.lifestyle_commitment.map((val, idx) => (
              <TextField
                key={idx}
                value={val}
                onChange={(e) =>
                  handleChange("lifestyle_commitment", e.target.value, idx)
                }
                placeholder={placeholders.lifestyle_commitment[idx]}
              />
            ))}
          </FormSection>

          {/* financial_considerations (2 inputs) */}
          <FormSection title="Financial Considerations">
            {formData.financial_considerations.map((val, idx) => (
              <TextField
                key={idx}
                value={val}
                onChange={(e) =>
                  handleChange("financial_considerations", e.target.value, idx)
                }
                placeholder={placeholders.financial_considerations[idx]}
              />
            ))}
          </FormSection>

          {/* references (2 inputs) */}
          <FormSection title="References">
            {formData.references.map((val, idx) => (
              <TextField
                key={idx}
                value={val}
                onChange={(e) =>
                  handleChange("references", e.target.value, idx)
                }
                placeholder={placeholders.references[idx]}
              />
            ))}
          </FormSection>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            {submitLoading ? "please wait..." : "Submit"}
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

const TextField = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 transition"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

const TextArea = ({ value, onChange, placeholder }) => (
  <textarea
    rows={3}
    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 transition"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default AdopterQuestionnaire;
