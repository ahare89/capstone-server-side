import { useEffect, useState } from "react";
import { Button, Input, Table } from "reactstrap";
import { editUserProfile, getUserProfileById } from "../managers/userProfileManager";

export default function MyProfile({ loggedInUser }) {
  const [editMode, setEditMode] = useState(false);
  const [loggedInUserProfile, setLoggedInUserProfile] = useState({})
  const [userProfile, setUserProfile] = useState({
    firstName: loggedInUser.firstName,
    lastName: loggedInUser.lastName,
    email: loggedInUser.email,
    userName: loggedInUser.userName,
    address: loggedInUser.address,
    identityUser: loggedInUser.identityUser,
    identityUserId: loggedInUser.identityUserId,
    roles: loggedInUser.roles,
    
  });

  useEffect(() => {
    async function fetchUserProfile() {
      const userProfile = await getUserProfileById(loggedInUser.id);
      setLoggedInUserProfile(userProfile);
    }
    
    fetchUserProfile();
  }, [loggedInUser.id]);

  console.log(userProfile);

  const handleEditButton = () => {
    setEditMode(true);
  };

  const handleCancelButton = () => {
    setEditMode(false);
  };

  const handleSubmitButton = () => {
    editUserProfile(loggedInUser.id, userProfile);
    getUserProfileById(loggedInUser.id).then(setUserProfile)
    setEditMode(false)
  };

  const handleChange = (e) => {
    setUserProfile((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <h2 className="container">Your Profile: </h2>
      {!editMode ? (
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
              <td>{userProfile.firstName}</td>
              <td>{userProfile.lastName}</td>
              <td>{userProfile.email}</td>
              <td>{userProfile.userName}</td>
              <td>{userProfile.roles}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
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
              <td><Input
              type="text"
              name="firstName"
              value={userProfile.firstName}
              onChange={handleChange}
              /></td>
              <td><Input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={userProfile.lastName}/></td>
              <td><Input
              type="email"
              value={userProfile.email}
              name="email"
              onChange={handleChange}            
              /></td>
              <td><Input
              type="text"
              name="userName"
              value={userProfile.userName}
              onChange={handleChange}
              /></td>
              <td>{loggedInUser.roles}</td>
            </tr>
          </tbody>
        </Table>
      )}
      {editMode ? (
        <>
          <div className="container">
            <Button onClick={handleCancelButton} className="btn btn-danger">
              Cancel Edit
            </Button>
            <Button onClick={handleSubmitButton} className="btn btn-warning">
              Submit Changes
            </Button>
          </div>
        </>
      ) : (
        <>
          <Button
            onClick={handleEditButton}
            style={{ marginLeft: "6.6em" }}
            className="btn btn-success container"
          >
            Edit Profile
          </Button>
        </>
      )}
    </>
  );
}
