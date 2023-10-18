import { useEffect, useState } from "react"
import { getUserProfiles, getUserProfilesWithRoles } from "../managers/userProfileManager";
import { Table } from "reactstrap";
import { UserProfileDetails } from "./UserProfileDetails";
import { Link } from "react-router-dom";

export const UserProfileList = () => {

const [userProfiles, setUserProfiles] = useState([]);

useEffect(() => {
    getUserProfilesWithRoles().then(setUserProfiles);
},[])

return (
    <Table>
        <thead>
            <tr>
            <th>User Profile Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Details</th>
            </tr>
        </thead>
        <tbody>
            {userProfiles.map(up => <tr key={up.id}><td>{up.id}</td>
            <td>{up.firstName}</td>
            <td>{up.lastName}</td>
            <td><Link userProfiles={userProfiles} to={`/userprofiles/${up.id}`} className="btn btn-success">Details</Link></td> 
            </tr>)}
        </tbody>
    </Table>
)

}