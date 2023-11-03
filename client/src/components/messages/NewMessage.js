import { useEffect, useState } from "react";
import { getUserProfiles } from "../../managers/userProfileManager";
import { createNewMessage } from "../../managers/messageManager";
import { useNavigate } from "react-router-dom";

export const NewMessage = ({ loggedInUser }) => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [message, setMessage] = useState({
    senderId: loggedInUser.id,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfiles().then(setUserProfiles);
  }, []);

  const handleChange = (e) => {
    setMessage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e, message) => {
    e.preventDefault();
    createNewMessage(message).then(() => navigate("/messages"));
    console.log("Message sent successfully");
  };

  const handleCancelButton = () => {
    navigate("/messages")
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2">
            <h4 className="text-xl font-semibold mb-4 text-center">Compose New Message</h4>
            <form onSubmit={(e) => handleSubmit(e, message)} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium text-gray-700">Subject</label>
                        <input type="text" name="subject" onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Content</label>
                        <textarea name="content" onChange={handleChange} className="mt-1 p-2 w-full border rounded-md h-32 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"></textarea>
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="font-medium text-gray-700">Recipient</label>
                        <select 
                        onChange={handleChange} name="recipientId"
                        className="mt-1 p-2 w-full border rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                            <option value="0">Choose a Recipient</option>
                            {userProfiles.map(up => <option key={up.id} value={up.id}>{up.firstName + " " + up.lastName}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 active:bg-green-700 transition duration-300">
                        Submit
                    </button>
                    <button onClick={handleCancelButton} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 active:bg-red-700 transition duration-300">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
);
  }
