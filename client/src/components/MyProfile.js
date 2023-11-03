import { useEffect, useState } from "react";
import { editUserProfile, getUserProfileById } from "../managers/userProfileManager";
import { Calendar } from "./Calendar";

export default function MyProfile({ loggedInUser }) {
  const [editMode, setEditMode] = useState(false);
  const [loggedInUserProfile, setLoggedInUserProfile] = useState({})
  const [userProfile, setUserProfile] = useState({
   
  });

  useEffect(() => {
    async function fetchUserProfile() {
      const userProfile = await getUserProfileById(loggedInUser.id);
      setUserProfile(userProfile);
    }
    
    fetchUserProfile();
  }, []);


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

  if (!userProfile)
  {
    return <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
  }
  
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Your Profile:</h2>
      <table className="min-w-full bg-white border rounded-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 border-b">First Name</th>
            <th className="px-6 py-3 border-b">Last Name</th>
            <th className="px-6 py-3 border-b">E-mail</th>
            <th className="px-6 py-3 border-b">Username</th>
            <th className="px-6 py-3 border-b">Host or Cleaner?</th>
          </tr>
        </thead>
        <tbody>
          {!editMode ? (
            <tr>
              <td className="px-6 py-4 border-b">{userProfile.firstName}</td>
              <td className="px-6 py-4 border-b">{userProfile.lastName}</td>
              <td className="px-6 py-4 border-b">{userProfile.email}</td>
              <td className="px-6 py-4 border-b">{userProfile.userName}</td>
              <td className="px-6 py-4 border-b">{userProfile.roles}</td>
            </tr>
          ) : (
            <tr>
              <td className="px-6 py-4 border-b">
                <input type="text" name="firstName" value={userProfile.firstName} onChange={handleChange} className="px-3 py-2 border rounded-md"/>
              </td>
              <td className="px-6 py-4 border-b">
                <input type="text" name="lastName" onChange={handleChange} value={userProfile.lastName} className="px-3 py-2 border rounded-md"/>
              </td>
              <td className="px-6 py-4 border-b">
                <input type="email" value={userProfile.email} name="email" onChange={handleChange} className="px-3 py-2 border rounded-md"/>  
              </td>
              <td className="px-6 py-4 border-b">
                <input type="text" name="userName" value={userProfile.userName} onChange={handleChange} className="px-3 py-2 border rounded-md"/>
              </td>
              <td className="px-6 py-4 border-b">{loggedInUser.roles}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-6 flex space-x-4">
        {editMode ? (
          <>
            <button onClick={handleCancelButton} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
              Cancel Edit
            </button>
            <button onClick={handleSubmitButton} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300">
              Submit Changes
            </button>
          </>
        ) : (
          <button onClick={handleEditButton} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
