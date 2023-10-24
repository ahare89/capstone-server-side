import { useState, useEffect } from "react";
import { Card, CardTitle, CardSubtitle, CardBody, CardText, Button, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { editAProperty, getPropertyById } from "../../managers/propertyManager";
import { useParams } from "react-router-dom";
import { DeleteAnImage, PostAnImage } from "../../managers/ImageManager";
import Calendar from "../Calendar";


export default function PropertyDetails() {
    const {id} = useParams();
  const [property, setProperty] = useState(null);
  const [newImage, setNewImage] = useState({
    url: "",
    propertyId: id
  })
  const [addImageButton, setAddImageButton] = useState(false)
  const [editAddressButton, setEditAddressButton] = useState(false)
  const [editButton, setEditButton] = useState(false)
  const [editAvailableButton, setEditAvailableButton] = useState(false)
  const [editSqFtButton, setEditSqFtButton] = useState(false)
  const [editDescriptionButton, setEditDescriptionButton] = useState(false)
  const [editedAddress, setEditedAddress] = useState("")
  const [editedDescription, setEditedDescription] = useState("")
  const [editedSqFt, setEditedSqFt] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [checked, setChecked] = useState(false)


  useEffect(() => {
    if (editAddressButton === false)
    {
        editAProperty(id, property)
    }
  },[property])

  console.log(property)

  const getPropertyDetails = (id) => {
    getPropertyById(id).then(setProperty);
  };

  const handleDeleteButton = (id, propertyId) => {
    DeleteAnImage(id)
    .then(() => getPropertyById(propertyId))
    .then((updatedProperty) => {
    if (updatedProperty && updatedProperty.images) {
        setProperty(updatedProperty);
    }
  })
}

const handleAddImageButton = () => {
    setAddImageButton(true)
}

const handleCancelButton = () => {
    setAddImageButton(false)
}

const handleEditAvailableButton = () => {
    setEditAvailableButton(true)
}

const handleCancelEditAvailableButton = () => [
    setEditAvailableButton(false)
]

const handleEditDescriptionButton = () => {
    setEditedDescription(property.description)
    setEditDescriptionButton(true)
}

const handleCancelEditDescriptionButton = () => {
    setEditDescriptionButton(false)
}

const handleEditSqFtButton = () => {
    setEditedSqFt(property.sqFt)
    setEditSqFtButton(true)
}

const handleCancelEditSqFtButton = () => {
    setEditSqFtButton(false)
}

const handleEditAddressButton = () => {
    setEditedAddress(property.address)
    setEditAddressButton(true)
}

const handleCancelEditAddressButton = () => {
    setEditAddressButton(false)
}

const handleSaveAddressButton = () => {
    setProperty((prev) => ({
        ...prev, 
        address: editedAddress}))
    setEditAddressButton(false)
}

const handleSaveDescriptionButton = () => {
    setProperty((prev) => ({
        ...prev,
        description: editedDescription}))
        setEditDescriptionButton(false)
}

const handleSaveSqFtButton = () => {
    setProperty((prev) => ({
        ...prev,
        sqFt: editedSqFt
    }))
    setEditSqFtButton(false)
}


const handleChange = (e) => {
    setNewImage((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
    }))
}

const handleSubmitButton = (newImage, propertyId) => {
    PostAnImage(newImage)
    .then(() => getPropertyById(propertyId))
    .then((updatedProperty) => {
        setProperty(updatedProperty)
    })
    
}


  useEffect(() => {
    if (id) {
      getPropertyDetails(id);
    }
  }, [id]);

  if (!property) {
    return (
      <>
        <h2>Property Details</h2>
        <p>Please choose a property...</p>
      </>
    );
  }
  return (
    <>
      <h2>Property Details</h2>
      <Card color="dark" inverse>
        <CardBody>
        <CardTitle tag="h4">
          {!editAddressButton ? ( 
            <>
          {property.address}
          <Button onClick={handleEditAddressButton} className="btn btn-info btn btn-sm">Edit</Button>
          </> 
        ) : (
          <>
          <Input
          type="text"
          value={editedAddress}
          onChange={(e) => {setEditedAddress(e.target.value)}}
          />
          <Button onClick={handleCancelEditAddressButton} className="btn btn-danger btn btn-sm">Cancel</Button>
          <Button onClick={handleSaveAddressButton} className="btn btn-success btn btn-sm">Save</Button>
          </>
        )}
        </CardTitle>   
        <div>    
          <p>Make Listing Public?
          <Input
           type="checkbox"
           name="isActive"
           checked={property.isActive}
           onChange={(e) => setProperty(prev => ({
                ...prev,
                isActive: e.target.checked
           })
            )}
           />
           </p>
           </div> 
           {!editDescriptionButton ?
           <>  
          <p>{property.description}
          <Button onClick={handleEditDescriptionButton} className="btn btn-info btn btn-sm">Edit</Button>
          </p>
          </> 
          :
          <>
          <Input
          type="textarea"
          value={editedDescription}
          onChange={(e) => {setEditedDescription(e.target.value)}}
          />
          <Button onClick={handleCancelEditDescriptionButton} className="btn btn-danger btn btn-sm">Cancel</Button>
          <Button onClick={handleSaveDescriptionButton} className="btn btn-success btn btn-sm">Save</Button>
          </>
          }
          {!editSqFtButton ? 
          <>
            <p>Square Feet: {property.sqFt}
          <Button onClick={handleEditSqFtButton} className="btn btn-info btn btn-sm">Edit</Button>
          </p>
          </> 
          :
          <>
          <Input
          type="number"
          value={editedSqFt}
          onChange={(e) => setEditedSqFt(parseInt(e.target.value))}          
          />
          <Button onClick={handleCancelEditSqFtButton} className="btn btn-danger btn btn-sm">Cancel</Button>
          <Button onClick={handleSaveSqFtButton} className="btn btn-success btn btn-sm">Save</Button>
          </>
          }         
          <p>Host: {property.userProfile.firstName + " " + property.userProfile.lastName}</p>
          {property?.images?.map(i => <> <img key={i.index} className="img" style={{width: '200px', height: '200px'}} src={i.url}/> <Button onClick={() => handleDeleteButton(i.id, id)} className="btn btn-danger btn btn-sm">Delete</Button></>)}
        </CardBody>
        {addImageButton ? (
            <>
            <Label>Image URL</Label>
            <Input
            placeholder="http://google.com/images/41247aef9aefy"
            type="text"
            name="url"
            onChange={handleChange}
            />
            <Button onClick={() => {handleSubmitButton(newImage, id)}} className="btn btn-success">Submit</Button>
            <Button onClick={handleCancelButton} className="btn btn-danger">Cancel</Button>
            </>
            ) : 
            <Button onClick={handleAddImageButton} className="btn btn-success">Add Image</Button>}
      </Card>
            <Calendar/>
    </>
  );
}
