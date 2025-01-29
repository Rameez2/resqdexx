import { useEffect, useState } from 'react';
import styles from '../styles/adminPanel.module.css';
import { approveOrganization, getAllUsers, makeAdmin } from '../api/adminApi';
import { useUser } from '../context/userContext';

const AdminPanle = () => {

    const [orgDetails,setOrgDetails] = useState(null);
    const [loading,setLoading] = useState(true);
    const [filter,setFilter] = useState("all");

    const {user} = useUser();

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
                        <th>isAdmin</th>
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
                        <td>{details.isAdmin ? 'True':'False'}</td>
                        {details.role === "adopter" ?
                        <>
                            <td><button>Block</button></td>
                        </>:
                        <>
                            <td>
                                <button style={{backgroundColor:"blue",color:"white"}} onClick={() => changeStatus(details.$id,"Approved")}>Approve</button>
                                <button style={{backgroundColor:"red",color:"white"}} onClick={() => changeStatus(details.$id,"Rejected")}>Reject</button>
                                <button onClick={() => makeAdmin(details.$id)}>{details.isAdmin ? 'Remove Admin':'Make Admin'}</button>
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
