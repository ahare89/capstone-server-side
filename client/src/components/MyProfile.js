import { Table } from "reactstrap"

export default function MyProfile({ loggedInUser }){

console.log(loggedInUser)

return (
    <>
    <h2 className="container">Your Profile: </h2>
    <Table className="container">
        <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>Username</th>
            <th>Host or Cleaner?</th>
            </tr>    
        </thead>
        <tbody>
            <tr>
                <td>{loggedInUser.firstName}</td>
                <td>{loggedInUser.lastName}</td>
                <td>{loggedInUser.email}</td>
                <td>{loggedInUser.userName}</td>
                <td>{loggedInUser.roles}</td>

            </tr>
        </tbody>
    </Table>
    </>
)



}