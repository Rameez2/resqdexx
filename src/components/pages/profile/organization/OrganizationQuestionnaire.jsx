// FILE: OrganizationQuestionnaire.jsx
import React, { useReducer, useEffect } from "react";
import { updateRecord } from "../../../../api/orgAdopterFORMApi";
import PersonalInformation from "../PersonalInformation";
import { useUser } from "../../../../context/userContext";

// ----------------- INITIAL STATE -----------------
const initialState = {
  // personal_info as 5 questions -> same approach
  personal_info: ["", "", "", "", ""],

  // Single fields
  operations_and_staffing: "",
  funding_and_financials: "",
  additional_info: "",

  // Multi-question fields
  mission_and_vision: ["", "", ""],      // 3 questions
  services: ["", "", ""],                // 3 questions
  legal_and_compliance: ["", "", ""],    // 3 questions
  partnership_and_collabs: ["", ""],     // 2 questions
  adoption_process: ["", ""],            // 2 questions
  feedback_and_impact: ["", ""],         // 2 questions
};

// ----------------- PLACEHOLDERS OBJECT -----------------
const placeholders = {
  personal_info: [
    "Enter your first name",
    "Enter your last name",
    "Enter your email",
    "Enter your phone number",
    "Enter your address",
  ],
  operations_and_staffing: "Describe your operations and staffing details...",
  funding_and_financials: "Provide funding and financial details...",
  additional_info: "Enter any additional information...",
  mission_and_vision: [
    "Enter your mission",
    "Enter your vision",
    "Enter your core values",
  ],
  services: [
    "Enter service detail 1",
    "Enter service detail 2",
    "Enter service detail 3",
  ],
  legal_and_compliance: [
    "Enter legal/compliance detail 1",
    "Enter legal/compliance detail 2",
    "Enter legal/compliance detail 3",
  ],
  partnership_and_collabs: [
    "Enter partnership detail 1",
    "Enter partnership detail 2",
  ],
  adoption_process: [
    "Enter adoption process detail 1",
    "Enter adoption process detail 2",
  ],
  feedback_and_impact: [
    "Enter feedback/impact detail 1",
    "Enter feedback/impact detail 2",
  ],
};

// ----------------- REDUCER -----------------
const orgReducer = (state, action) => {
  const { field, value, index } = action;

  if (Array.isArray(state[field])) {
    const updatedArray = [...state[field]];
    updatedArray[index] = value;
    return { ...state, [field]: updatedArray };
  }

  return { ...state, [field]: value };
};

// ----------------- COMPONENT -----------------
const OrganizationQuestionnaire = ({ existingDocId, onSubmit }) => {
  const [formData, dispatch] = useReducer(orgReducer, initialState);

  const { loading, user } = useUser();

  const handleChange = (field, value, index = null) => {
    dispatch({ field, value, index });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    
    try {
      const updatedDoc = await updateRecord(user.more_info, formData, "organization");
      console.log("Organization record updated:", updatedDoc);

      if (onSubmit) onSubmit(updatedDoc);
    } catch (error) {
      console.error("Error updating organization record:", error);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!(user.status === "Rejected" || user.status === "Apply")) {
    return <h1>New application can only be submitted after Rejection.</h1>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Organization Application</h2>

      {/* PERSONAL INFO -> 5 inputs (shared) */}
      <PersonalInformation
        data={formData.personal_info}
        placeholders={placeholders.personal_info}
        onChange={(idx, newVal) => handleChange("personal_info", newVal, idx)}
      />

      {/* operations_and_staffing (single textarea) */}
      <FormSection title="Operations and Staffing">
        <TextArea
          value={formData.operations_and_staffing}
          onChange={(e) => handleChange("operations_and_staffing", e.target.value)}
          placeholder={placeholders.operations_and_staffing}
        />
      </FormSection>

      {/* funding_and_financials (single textarea) */}
      <FormSection title="Funding and Financials">
        <TextArea
          value={formData.funding_and_financials}
          onChange={(e) => handleChange("funding_and_financials", e.target.value)}
          placeholder={placeholders.funding_and_financials}
        />
      </FormSection>

      {/* additional_info (single textarea) */}
      <FormSection title="Additional Info">
        <TextArea
          value={formData.additional_info}
          onChange={(e) => handleChange("additional_info", e.target.value)}
          placeholder={placeholders.additional_info}
        />
      </FormSection>

      {/* mission_and_vision */}
      <FormSection title="Mission and Vision">
        {formData.mission_and_vision.map((val, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-700">
            </label>
            <TextField
              value={val}
              onChange={(e) => handleChange("mission_and_vision", e.target.value, idx)}
              placeholder={placeholders.mission_and_vision[idx]}
            />
          </div>
        ))}
      </FormSection>

      {/* services  */}
      <FormSection title="Services">
        {formData.services.map((val, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-700">
            </label>
            <TextField
              value={val}
              onChange={(e) => handleChange("services", e.target.value, idx)}
              placeholder={placeholders.services[idx]}
            />
          </div>
        ))}
      </FormSection>

      {/* legal_and_compliance */}
      <FormSection title="Legal and Compliance">
        {formData.legal_and_compliance.map((val, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-700">
            </label>
            <TextField
              value={val}
              onChange={(e) => handleChange("legal_and_compliance", e.target.value, idx)}
              placeholder={placeholders.legal_and_compliance[idx]}
            />
          </div>
        ))}
      </FormSection>

      {/* partnership_and_collabs */}
      <FormSection title="Partnership and Collabs">
        {formData.partnership_and_collabs.map((val, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-700">
            </label>
            <TextField
              value={val}
              onChange={(e) => handleChange("partnership_and_collabs", e.target.value, idx)}
              placeholder={placeholders.partnership_and_collabs[idx]}
            />
          </div>
        ))}
      </FormSection>

      {/* adoption_process  */}
      <FormSection title="Adoption Process">
        {formData.adoption_process.map((val, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-700">
            </label>
            <TextField
              value={val}
              onChange={(e) => handleChange("adoption_process", e.target.value, idx)}
              placeholder={placeholders.adoption_process[idx]}
            />
          </div>
        ))}
      </FormSection>

      {/* feedback_and_impact*/}
      <FormSection title="Feedback and Impact">
        {formData.feedback_and_impact.map((val, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-700">
            </label>
            <TextField
              value={val}
              onChange={(e) => handleChange("feedback_and_impact", e.target.value, idx)}
              placeholder={placeholders.feedback_and_impact[idx]}
            />
          </div>
        ))}
      </FormSection>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="w-full py-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Update Organization Application
      </button>
    </form>
  );
};

// ----------------- HELPER COMPONENTS -----------------
const FormSection = ({ title, children }) => (
  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <div className="mt-2 space-y-2">{children}</div>
  </div>
);

const TextField = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 transition"
    value={value}
    onChange={onChange}
    required
  />
);

const TextArea = ({ value, onChange, placeholder }) => (
  <textarea
    rows={3}
    placeholder={placeholder}
    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 transition"
    value={value}
    onChange={onChange}
    required
  />
);

export default OrganizationQuestionnaire;
