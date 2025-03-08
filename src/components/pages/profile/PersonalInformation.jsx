// FILE: PersonalInformation.jsx
import React from "react";

/**
 * PersonalInformation
 * @param {string[]} data      - An array of 5 strings (each representing one answer)
 * @param {Function} onChange  - A callback(index, newValue) to update the array
 */
const PersonalInformation = ({ data, onChange }) => {

  const questionsList = ["FullName", "Address", "Phone Number", "Email", "Date of Birth"];

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
      <p className="text-sm text-gray-500 mb-2">
        Please fill out all 5 questions below:
      </p>

      <div className="space-y-2">
        {data.map((value, index) => (
          <div key={index}>
            <label>{questionsList[index]}</label>
            <input

              type="text"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 transition"
              value={value}
              onChange={(e) => onChange(index, e.target.value)}
              placeholder={`Question ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInformation;
