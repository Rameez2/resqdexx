import React, { useState, useEffect } from 'react';
import { approveOrganization, getMoreDetails } from '../../../../api/adminApi';
import OrganizationDetails from './OrganizationDetails';
import AdopterDetails from './AdopterDetails';

const MoreDetails = ({ detailsProp }) => {
  const [details, setDetails] = useState(null);
  const [status, setStatus] = useState(detailsProp.status);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // statusLoading will be null or a string ("Approved" or "Rejected")
  const [statusLoading, setStatusLoading] = useState(null);

  // Fetch the details when detailsProp.more_info changes
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const detailsResponse = await getMoreDetails(detailsProp.more_info);
        setDetails(detailsResponse);
        console.log(detailsResponse);
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Error fetching details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [detailsProp.more_info]);

  // Function to update the organization's status (approve or reject)
  const changeStatus = async (newStatus) => {
    try {
      setStatusLoading(newStatus);
      console.log('Changing status for', detailsProp.$id, 'to', newStatus);
      await approveOrganization(detailsProp.$id, newStatus);
      setStatus(newStatus);
      console.log('Status changed successfully!');
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setStatusLoading(null);
    }
  };

  // Inline styles
  const containerStyle = {
    maxHeight: "600px",
    overflowY: "auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    margin: "20px auto",
    maxWidth: "800px"
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
    textAlign: "center"
  };

  const subheadingStyle = {
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "20px",
    color: "#555",
    textAlign: "center"
  };

  const buttonContainerStyle = {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px"
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    minWidth: "120px"
  };

  const approveButtonStyle = {
    ...buttonStyle,
    backgroundColor: "green",
    color: "#fff"
  };

  const rejectButtonStyle = {
    ...buttonStyle,
    backgroundColor: "red",
    color: "#fff"
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "20px" }}>Loading details...</div>;
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center", padding: "20px" }}>{error}</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>More Details</h1>
      <h3 style={subheadingStyle}>Status: {status}</h3>
      {details ? (
        <>
          {detailsProp.role === "Organization" ? (
            <OrganizationDetails Info={details} />
          ) : (
            <AdopterDetails Info={details} />
          )}
          <div style={buttonContainerStyle}>
            <button 
              onClick={() => changeStatus("Approved")}
              disabled={statusLoading !== null}
              style={approveButtonStyle}
            >
              {statusLoading === "Approved" ? "Approving..." : "Approve"}
            </button>
            <button 
              onClick={() => changeStatus("Rejected")}
              disabled={statusLoading !== null}
              style={rejectButtonStyle}
            >
              {statusLoading === "Rejected" ? "Rejecting..." : "Reject"}
            </button>
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center" }}>No details available.</p>
      )}
    </div>
  );
};

export default MoreDetails;
