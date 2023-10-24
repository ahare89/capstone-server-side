import { useEffect, useState, useRef } from "react";
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
  getPropertiesForUser,
  postAProperty,
} from "../../managers/propertyManager";
import { PostAnImage } from "../../managers/ImageManager";

export const AddAProperty = ({
  loggedInUser,
  getAllProperties,
  setAllProperties,
  myProperties,
  setMyProperties,
  addPropertyRef,
  setAddPropertyButton
}) => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [newImage, setNewImage] = useState({
    url: "",
    propertyId: null
  })
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const inputRef = useRef(null);

  const [newProperty, setNewProperty] = useState({
    address: "",
    userProfileId: loggedInUser.id,
    sqFt: 0,
    cleaningCost: 0,
    description: "",
    propertyTypeId: "",
    isActive: false,
    images: []
  });

  useEffect(() => {
    getPropertyTypes().then(setPropertyTypes);
  }, []);

  const handleSubmit = async (e, newProperty, newImage) => {
    e.preventDefault();
    try {
        const response = await postAProperty(newProperty)
        console.log("response status", response.status)
        if (response.status === 201) {
            const propertyData = await response.json();
            const propertyId = propertyData.id;
            
            await PostAnImage({...newImage, propertyId})

            const properties = await getPropertiesForUser(loggedInUser.id);
            setMyProperties(properties);
            
        }   else {
            console.error("Failed to create property or image")
        }
        }
        catch (error) {
            console.error("Error", error)
    }
    setAddPropertyButton(false)
    
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setNewProperty((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }));
    } else if (e.target.name === "sqFt"){
        const sqFtValue = parseInt(e.target.value)
        setNewProperty((prev) => ({
            ...prev,
            [e.target.name]: sqFtValue,
    }))
     } else if (e.target.name === "cleaningCost") {
        const cleaningCostValue = parseInt(e.target.value)
        setNewProperty((prev) =>({
            ...prev,
            [e.target.name]: cleaningCostValue
        }))
     } else {
      setNewProperty((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleImageUpdate = (e) => {
    setNewImage((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }

  const handleCleaningCostUpdate = (e) => {
    setNewProperty((prev) =>({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }

  return (
    <>
    <div ref={addPropertyRef}>
      <h2 className="container">Add a Listing!</h2>
      <Form onSubmit={(e) => handleSubmit(e, newProperty, newImage)} className="container">
        <FormGroup>
          <Label>Address</Label>
          <Input
            autoFocus
            type="text"
            htmlFor="address"
            name="address"
            placeholder="Please enter address here"
            onChange={handleChange}
          />

          <Label>Square Feet</Label>
          <Input
            type="number"
            placeholder="Please enter square footage here"
            name="sqFt"
            htmlFor="squarefeet"
            onChange={handleChange}
          />
          <Label>Cleaning Payment</Label>
          <Input
          type="number"
          placeholder="$100.00"
          name="cleaningCost"
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
            <Label>Image URL</Label>
            <Input
              type="text"
              name="url"
              placeholder="www.google.com"
              onChange={handleImageUpdate}
            />
          </div>
        </FormGroup>
        <Button
          className="btn btn-warning"
          type="submit"
        >
          Submit
        </Button>
      </Form>
      </div>
    </>
  );
};
