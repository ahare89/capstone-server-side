import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Table,
} from "reactstrap";
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
      <h4>Messages</h4>
      {myMessages.length > 0 ? 
      myMessages.map((m) => (
        <>
          <Card
            style={{
              width: "40rem",
            }}
            key={m.id}
          >
            <CardBody>
              <CardTitle tag="h5">[Subject]: {m.subject}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6" key={m.id}>
                [From]: {m.sender.firstName + " " + m.sender.lastName}
              </CardSubtitle>
              <CardText>[Body]: {m.content}</CardText>
          <Button onClick={() => handleDeleteButton(m.id)} className="btn btn-danger">Delete</Button>
            </CardBody>
          </Card>
          </>))
         : <p>You have no messages</p>
        }
      <Button
        onClick={() => {
          navigate("/newmessage");
        }}
        className="btn btn-success"
      >
        Compose a Message
      </Button>
    </>
  );
};
