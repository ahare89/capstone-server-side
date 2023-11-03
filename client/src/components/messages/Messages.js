import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMessage, getMessagesForUser } from "../../managers/messageManager";

export const Messages = ({ loggedInUser }) => {
  const navigate = useNavigate();

  const [myMessages, setMyMessages] = useState([]);

  useEffect(() => {
    getMessagesForUser(loggedInUser.id).then(setMyMessages);
  }, []);

  const handleDeleteButton = (id) => {
    deleteMessage(id).then(() => getMessagesForUser(loggedInUser.id).then(setMyMessages))
  }

  return (
    <>
      <h4 className="text-lg font-bold mb-4">Messages</h4>
      {myMessages.length > 0 ? 
      myMessages.map((m) => (
        <div className="bg-white p-4 mb-4 rounded shadow-lg w-10/12 mx-auto" key={m.id}>
            <h5 className="mb-2">[Date:] {m.date.slice(0,19).split("T").join("---[Time:] ")} CST</h5>
            <h5 className="font-bold mb-2">[Subject]: {m.subject}</h5>
            <h6 className="text-gray-500 mb-2">[From]: {m.sender.firstName + " " + m.sender.lastName}</h6>
            <p className="mb-3">[Body]: {m.content}</p>
            <button 
                onClick={() => handleDeleteButton(m.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
                Delete
            </button>
        </div>
      ))
         : <p className="text-gray-600">You have no messages</p>
        }
      <button 
        onClick={() => navigate("/newmessage")}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mt-4"
      >
        Compose a Message
      </button>
    </>
  );
};
