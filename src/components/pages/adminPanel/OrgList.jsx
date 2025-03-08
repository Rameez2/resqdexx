import React, { useState, useEffect } from 'react';
import { getAllUsers, approveOrganization } from '../../../api/adminApi';
import { useUser } from '../../../context/userContext';
import styles from '../../../styles/adminPanel.module.css';
import MoreDetails from './moreDetails/MoreDetails';

const OrgList = () => {
  const [orgDetails, setOrgDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [filter2, setFilter2] = useState("all");
  const [loadingStates, setLoadingStates] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [selectedMoreInfo, setSelectedMoreInfo] = useState(null);

  const { user } = useUser();

  useEffect(() => {
    (async () => {
      try {
        let orgResponse = await getAllUsers();
        let filteredOrgDetails = orgResponse;

        if (filter === "adopters") {
          filteredOrgDetails = filteredOrgDetails.filter(org => org.role === "Adopter");
        } else if (filter === "organizations") {
          filteredOrgDetails = filteredOrgDetails.filter(org => org.role === "Organization");
        }

        if (filter2 !== "all") {
          filteredOrgDetails = filteredOrgDetails.filter(org => org.status === filter2);
        }

        setOrgDetails(filteredOrgDetails);
      } catch (error) {
        console.log("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [filter, filter2]);

  async function changeStatus(id, status) {
    setLoadingStates((prev) => ({ ...prev, [id]: status }));
    try {
      await approveOrganization(id, status);
      setOrgDetails((prev) =>
        prev.map((org) => org.$id === id ? { ...org, status } : org)
      );
    } catch (error) {
      console.log("Error while approving:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: null }));
    }
  }

  // Search filter function
  const filteredOrganizations = orgDetails.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function showMoreInfoModel(moreInfoId) {
    setSelectedMoreInfo(moreInfoId);
    setShowMoreDetails(true);
  }

  function closeModal() {
    setShowMoreDetails(false);
    setSelectedMoreInfo(null);
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>User Management</h2>

      {/* Filters */}
      <div style={{ marginBottom: "15px" }}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "8px", marginRight: "10px", fontSize: "14px" }}
        >
          <option value="all">All</option>
          <option value="adopters">Adopters</option>
          <option value="organizations">Organizations</option>
        </select>

        <select
          value={filter2}
          onChange={(e) => setFilter2(e.target.value)}
          style={{ padding: "8px", fontSize: "14px" }}
        >
          <option value="all">All</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
        </select>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          width: "60%",
          maxWidth: "400px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={tableHeaderStyle}>#</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Status</th>
            <th style={tableHeaderStyle}>View</th>
            <th style={tableHeaderStyle}>Role</th>
            <th style={tableHeaderStyle}>Admin</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrganizations.length > 0 ? (
            filteredOrganizations.map((details, index) => (
              <tr key={details.$id} style={index % 2 === 0 ? rowStyleEven : rowStyleOdd}>
                <td style={cellStyle}>{index + 1}</td>
                <td style={cellStyle}>{details.name}</td>
                <td style={cellStyle}>{details.email}</td>
                <td style={cellStyle}>{details.status === "Apply" ? 'Not Applied' : details.status}</td>
                {details.status === "Apply" ?                 <td style={cellStyle}>
                    NO Application 
                </td>:
                <td style={cellStyle}>
                  <a href="#!" onClick={() => showMoreInfoModel(details)}>
                    View
                  </a>
                </td>}

                <td style={cellStyle}>{details.role}</td>
                <td style={cellStyle}>{details.isAdmin ? "Yes" : "No"}</td>
                <td style={cellStyle}>
                  {details.role === "adopter" ? (
                    <button style={blockButtonStyle}>Block</button>
                  ) : (
                    <>
                      <button
                        onClick={() => changeStatus(details.$id, "Approved")}
                        disabled={loadingStates[details.$id] === "Approved"}
                        style={approveButtonStyle}
                      >
                        {loadingStates[details.$id] === "Approved" ? "Approving..." : "Approve"}
                      </button>
                      <button
                        onClick={() => changeStatus(details.$id, "Rejected")}
                        disabled={loadingStates[details.$id] === "Rejected"}
                        style={rejectButtonStyle}
                      >
                        {loadingStates[details.$id] === "Rejected" ? "Rejecting..." : "Reject"}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "10px", color: "#888" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* More Details Modal */}
      {showMoreDetails && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <button onClick={closeModal} style={modalCloseButtonStyle}>
              &times;
            </button>
            <MoreDetails detailsProp={selectedMoreInfo} />
          </div>
        </div>
      )}
    </div>
  );
};

// Inline Styles
const tableHeaderStyle = { padding: "10px", fontWeight: "bold", borderBottom: "2px solid #ddd" };
const cellStyle = { padding: "10px", borderBottom: "1px solid #ddd" };
const rowStyleEven = { backgroundColor: "#f9f9f9" };
const rowStyleOdd = { backgroundColor: "#fff" };
const approveButtonStyle = { backgroundColor: "green", color: "white", padding: "5px 10px", margin: "5px" };
const rejectButtonStyle = { backgroundColor: "red", color: "white", padding: "5px 10px", margin: "5px" };
const adminButtonStyle = { backgroundColor: "#007bff", color: "white", padding: "5px 10px", margin: "5px" };
const blockButtonStyle = { backgroundColor: "#555", color: "white", padding: "5px 10px" };

// Modal Styles
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "5px",
  maxWidth: "600px",
  width: "90%",
  position: "relative",
};

const modalCloseButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "15px",
  fontSize: "1.5rem",
  background: "none",
  border: "none",
  cursor: "pointer",
};

export default OrgList;
