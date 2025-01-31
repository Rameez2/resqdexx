import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/userContext";
import { approveOrganization, getAllUsers, makeAdmin } from "../../../api/adminApi";
import styles from "../../../styles/adminPanel.module.css";

const OrgList = () => {
    const [orgDetails, setOrgDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [filter2, setFilter2] = useState("all");
    const [loadingStates, setLoadingStates] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

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
            setOrgDetails((prev) => prev.map((org) => org.$id === id ? { ...org, status } : org));
        } catch (error) {
            console.log("Error while approving:", error);
        } finally {
            setLoadingStates((prev) => ({ ...prev, [id]: null }));
        }
    }

    async function handleMakeAdmin(id, isAdmin) {
        setLoadingStates((prev) => ({ ...prev, [id]: "admin" }));
        try {
            await makeAdmin(id);
            setOrgDetails((prev) => prev.map((org) => org.$id === id ? { ...org, isAdmin: !isAdmin } : org));
        } catch (error) {
            console.log("Error while updating admin status:", error);
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
            <table className={styles.organizationTable} style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
                        <th style={tableHeaderStyle}>#</th>
                        <th style={tableHeaderStyle}>Name</th>
                        <th style={tableHeaderStyle}>Email</th>
                        <th style={tableHeaderStyle}>Status</th>
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
                                <td style={cellStyle}>{details.status}</td>
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
                                            <button
                                                onClick={() => handleMakeAdmin(details.$id, details.isAdmin)}
                                                disabled={loadingStates[details.$id] === "admin"}
                                                style={adminButtonStyle}
                                            >
                                                {loadingStates[details.$id] === "admin" ? "Updating..." : (details.isAdmin ? "Remove Admin" : "Make Admin")}
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center", padding: "10px", color: "#888" }}>
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
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

export default OrgList;
