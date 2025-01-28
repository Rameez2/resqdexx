import { useEffect, useState } from 'react';
import styles from '../styles/adminPanel.module.css';
import { approveOrganization, getAllUsers } from '../api/adminApi';

const AdminPanle = () => {

    const [orgDetails,setOrgDetails] = useState(null);
    const [filter,setFilter] = useState("all");

    useEffect(() => {
        (async () => {
            try {
                let orgResponse = await getAllUsers();
                setOrgDetails(orgResponse);
                console.log(orgResponse);
                
            } catch (error) {
                console.log('erasrsa',error);
                
            }
        })()

    }, []);

    async function changeStatus(id,status) {
        try {
            await approveOrganization(id,status);
            alert("Status Update Success!");
        } catch (error) {
            console.log('Error while approving:',error.message);
        }
    }

    return (
        <div>
            <h1>Welcome to Admin Panel!</h1>
            <h2>Organizations Details</h2>

            <select name="filter" id="filter">
                <option value="all">All</option>
                <option value="user">Users</option>
                <option value="organizations">Organizations</option>
            </select>

            <table className={styles.organizationTable}>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {orgDetails ? 
                    orgDetails.map((details,index) => (
                    <tr key={index}>
                        <td>1</td>
                        <td>{details.name}</td>
                        <td>{details.email}</td>
                        <td>{details.status}</td>
                        <td>{details.role}</td>
                        {details.role === "adopter" ?
                        <>
                            <td><button>Block</button></td>
                        </>:
                        <>
                            <td>
                                <button onClick={() => changeStatus(details.$id,"approved")}>Approve</button>
                                <button onClick={() => changeStatus(details.$id,"rejected")}>Reject</button>
                            </td>
                        </>
                            }
                    </tr>
                    ))
                :<></>}
                </tbody>
            </table>

        </div>
    );
}

export default AdminPanle;
