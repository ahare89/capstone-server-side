import { useEffect, useState } from "react";
import { getUserByIdWithChores, getUserProfileById } from "../managers/userProfileManager";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";

export const UserProfileDetails = () => {

const [user, setUser] = useState(null);

const { id } = useParams();

useEffect(() => {
    getUserProfileById(id).then(setUser);
},[id])

console.log(user)

if (!user)
{
    return (
        <>
        <h2>User Profile Details</h2>
        <p>Please choose a user...</p>
        </>
    )
}

return (
    <>
    <h2>User Profile Details</h2>
    <Table>
        <thead>
            <tr>
                <th>User Profile Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td>{user.id}</td>
            <td>{user?.firstName}</td>
            <td>{user?.lastName}</td>
            <td>{user?.address}</td>
            <td></td>
        </tr>
        </tbody>
        </Table>
    </>
    )

}