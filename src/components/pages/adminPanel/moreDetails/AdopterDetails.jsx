import React from 'react';

const AdopterDetails = ({ Info }) => {
  if (!Info) {
    return <div>No adopter details available.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Adopter Details</h1>

      {/* Personal Information */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <ul className="list-disc ml-5">
          {Info.personal_info.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Additional Information */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Additional Information</h2>
        <p>{Info.additional_info}</p>
      </div>

      {/* Household Information */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Household Information</h2>
        <ul className="list-disc ml-5">
          {Info.household_info.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Experience with Pets */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Experience with Pets</h2>
        <ul className="list-disc ml-5">
          {Info.experience_with_pets.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Adoption Intentions */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Adoption Intentions</h2>
        <ul className="list-disc ml-5">
          {Info.adoption_intentions.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Lifestyle Commitment */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Lifestyle Commitment</h2>
        <ul className="list-disc ml-5">
          {Info.lifestyle_commitment.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Financial Considerations */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Financial Considerations</h2>
        <ul className="list-disc ml-5">
          {Info.financial_considerations.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* References */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">References</h2>
        <ul className="list-disc ml-5">
          {Info.references.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdopterDetails;
