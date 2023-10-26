import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getUserProfiles } from "../../managers/userProfileManager";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { createNewMessage } from "../../managers/messageManager";
import { useNavigate } from "react-router-dom";

export const NewMessage = ({ loggedInUser }) => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [message, setMessage] = useState({
    senderId: loggedInUser.id,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
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
    <>
      <h4 className="container">Compose New Message</h4>
      <Form onSubmit={(e) => handleSubmit(e, message)} className="container">
        <FormGroup>
          <Label>Subject</Label>
          <Input type="text" name="subject" onChange={handleChange} />
          <Label>Content</Label>
          <Input type="textarea" name="content" onChange={handleChange} />
          <div className="container" style={{ padding: "8px" }}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret color="success">
                {userProfiles.find((up) => up.id === message.recipientId)
                  ?.firstName || "Recipient"}
              </DropdownToggle>
              <DropdownMenu dark>
                <DropdownItem header>Recipient</DropdownItem>
                {userProfiles.map((up) => (
                  <DropdownItem
                    key={up.id}
                    onClick={() =>
                      setMessage((prev) => 
                      ({ ...prev, 
                        recipientId: up.id }))
                    }
                  >
                    {up.firstName + " " + up.lastName}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </FormGroup>
        <Button type="submit" className="btn btn-success">
          Submit
        </Button>
        <Button onClick={handleCancelButton} className="btn btn-danger">Cancel</Button>
      </Form>
    </>
  );
};
