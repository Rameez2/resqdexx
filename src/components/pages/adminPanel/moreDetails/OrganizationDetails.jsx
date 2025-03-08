import React from 'react';

const OrganizationDetails = ({ Info }) => {
  if (!Info) {
    return <div>No details available.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Organization Details</h1>

      {/* Personal Information */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <ul className="list-disc ml-5">
          {Info.personal_info.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Single Fields */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Operations and Staffing</h2>
        <p>{Info.operations_and_staffing}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Funding and Financials</h2>
        <p>{Info.funding_and_financials}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Additional Info</h2>
        <p>{Info.additional_info}</p>
      </div>

      {/* Multi-Question Fields */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Mission and Vision</h2>
        <ul className="list-disc ml-5">
          {Info.mission_and_vision.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Services</h2>
        <ul className="list-disc ml-5">
          {Info.services.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Legal and Compliance</h2>
        <ul className="list-disc ml-5">
          {Info.legal_and_compliance.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Partnership and Collaborations</h2>
        <ul className="list-disc ml-5">
          {Info.partnership_and_collabs.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Adoption Process</h2>
        <ul className="list-disc ml-5">
          {Info.adoption_process.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Feedback and Impact</h2>
        <ul className="list-disc ml-5">
          {Info.feedback_and_impact.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrganizationDetails;
