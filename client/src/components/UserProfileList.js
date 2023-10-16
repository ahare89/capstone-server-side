import { useEffect, useState } from "react"
import { getUserProfiles } from "../managers/userProfileManager";
import { Table } from "reactstrap";
import { UserProfileDetails } from "./UserProfileDetails";
import { Link } from "react-router-dom";

export const UserProfileList = () => {

const [userProfiles, setUserProfiles] = useState([]);

useEffect(() => {
    getUserProfiles().then(setUserProfiles);
},[])

return (
    <Table>
        <thead>
            <tr>
            <th>User Profile Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Details</th>
            </tr>
        </thead>
        <tbody>
            {userProfiles.map(up => <tr key={up.id}><td>{up.id}</td>
            <td>{up.firstName}</td>
            <td>{up.lastName}</td>
            <td>{up.email}</td> 
            <td><Link to={`/userprofiles/${up.id}`} className="btn btn-success">Details</Link></td> 
            </tr>)}
        </tbody>
    </Table>
)

}