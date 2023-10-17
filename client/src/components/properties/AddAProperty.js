import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { getPropertyTypes } from "../../managers/propertyTypeManager";
import {
  getAllProperties,
  postAProperty,
} from "../../managers/propertyManager";

export const AddAProperty = ({
  loggedInUser,
  getAllProperties,
  setAllProperties,
}) => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [newProperty, setNewProperty] = useState({
    address: "",
    userProfileId: loggedInUser.id,
    sqFt: "",
    description: "",
    propertyTypeId: "",
    isActive: false,
  });

  useEffect(() => {
    getPropertyTypes().then(setPropertyTypes);
  }, []);

  const handleSubmit = (newProperty) => {
    postAProperty(newProperty);
    getAllProperties().then(setAllProperties);
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setNewProperty((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }));
    } else {
      setNewProperty((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  return (
    <>
      <h2 className="container">Add a Property!</h2>
      <Form onSubmit={handleSubmit} className="container">
        <FormGroup>
          <Label>Address</Label>
          <Input
            type="text"
            htmlFor="address"
            name="address"
            placeholder="Please enter address here"
            onChange={handleChange}
          />

          <Label>Square Feet</Label>
          <Input
            type="number"
            placeholder="2000"
            name="sqFt"
            htmlFor="squarefeet"
            onChange={handleChange}
          />
          <Label>Description</Label>
          <Input
            type="text"
            htmlFor="Description"
            placeholder="Two bedroom two bath house in the Hollywood hills"
            name="description"
            onChange={handleChange}
          />
          <div className="container" style={{ padding: "8px" }}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret color="success">
                {propertyTypes.find(
                  (pt) => pt.id === newProperty.propertyTypeId
                )?.name || "Property Type"}
              </DropdownToggle>
              <DropdownMenu dark>
                <DropdownItem header>Property Type</DropdownItem>
                <DropdownItem divider />
                {propertyTypes.map((pt) => (
                  <DropdownItem
                    key={pt.id}
                    onClick={() =>
                      handleChange({
                        target: { name: "propertyTypeId", value: pt.id },
                      })
                    }
                  >
                    {pt.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <Label style={{ fontWeight: "bold" }}>Available to Clean?</Label>
          <Input
            style={{ padding: "7px", margin: "4px" }}
            type="checkbox"
            name="isActive"
            onChange={handleChange}
          />
          <div>
            <Label>Image URLs</Label>
            <Input
              type="text"
              name="image"
              htmlFor="image"
              placeholder="www.google.com"
            />
          </div>
          <Button className="btn btn-info">Add Another Image?</Button>
        </FormGroup>
        <Button
          className="btn btn-warning"
          onClick={() => handleSubmit(newProperty)}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};
