import { useState, useEffect } from "react";
import { Card, CardTitle, CardSubtitle, CardBody, CardText, Button, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { editAProperty, getPropertyById } from "../../managers/propertyManager";
import { useParams } from "react-router-dom";
import { DeleteAnImage, PostAnImage } from "../../managers/ImageManager";
import Calendar from "../Calendar";
import { postAJob } from "../../managers/cleaningJobManager";


export default function PropertyDetails({ loggedInUser}) {
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
  const [editedCleaningFee, setEditedCleaningFee] = useState(0.00)
  const [editCostButton, setEditCostButton] = useState(false)
  const [newCleaningJob, setNewCleaningJob] = useState(null)
  const [date, setDate] = useState(new Date());


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [checked, setChecked] = useState(false)

  console.log(loggedInUser.id)


  useEffect(() => {
    if (editAddressButton === false)
    {
        editAProperty(id, property)
    }
  },[property])

  useEffect(() => {
    console.log(date)
    setNewCleaningJob({
        propertyId: parseInt(id),
        userProfileId: loggedInUser.id,
        date: date
    })
  },[date])

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

const handleEditCostButton = () => {
    setEditedCleaningFee(property.cleaningCost)
    setEditCostButton(true)
}

const handleCancelEditCostButton = () => {
    setEditCostButton(false)
}

const handleSaveCostButton = () => {
    setProperty((prev) => ({
        ...prev,
        cleaningCost: editedCleaningFee
    }))
    setEditCostButton(false);
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

const handleDateSubmitButton = (newCleaningJob) => {
    
    postAJob(newCleaningJob)
}

const handleCalendarClick = (id, userProfileId) => {
    console.log("You clicked the calendar")
    setNewCleaningJob({
        propertyId: parseInt(id),
        userProfileId: userProfileId,
        date: date
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
            {
        (loggedInUser.roles.includes("Host") || loggedInUser.roles.includes("Admin"))
        ? (
          !editAddressButton ? ( 
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
         )) : property.address}
        </CardTitle>
        {
        (loggedInUser.roles.includes("Host") || loggedInUser.roles.includes("Admin"))
        ? (   
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
           </div> ) : null}
           {
        (loggedInUser.roles.includes("Host") || loggedInUser.roles.includes("Admin"))
        ? (
           !editDescriptionButton ?
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
         ) : <p>{property.description}</p>}
         {
        (loggedInUser.roles.includes("Host") || loggedInUser.roles.includes("Admin"))
        ? (
          !editSqFtButton ? 
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
          ) : <p>Square Feet: {property.sqFt}</p>}
          {
        (loggedInUser.roles.includes("Host") || loggedInUser.roles.includes("Admin"))
        ? (
          !editCostButton ? 
          <>
          <p>Cleaning Payment: ${property?.cleaningCost}
          <Button onClick={handleEditCostButton} className="btn btn-info btn btn-sm">Edit</Button>
          </p>
          </>
          :
          <>
          <Input
          type="number"
          value={editedCleaningFee}
          onChange={(e) => setEditedCleaningFee(parseInt(e.target.value))}
          />
          <Button onClick={handleCancelEditCostButton} className="btn btn-danger btn btn-sm">Cancel</Button>
          <Button onClick={handleSaveCostButton} className="btn btn-success btn btn-sm">Save</Button>
          </>
            ) : <p>Cleaning Payment: ${property?.cleaningCost}</p>}     
          <p>Host: {property?.userProfile?.firstName + " " + property?.userProfile?.lastName}</p>
          {property?.images?.map(i => (
          <> <img key={i.index} className="img" style={{width: '200px', height: '200px'}} src={i.url}/> 
          {
        (loggedInUser.roles.includes("Host") || loggedInUser.roles.includes("Admin"))
        ?         
          <Button onClick={() => handleDeleteButton(i.id, id)} className="btn btn-danger btn btn-sm">Delete</Button>
           : null
          }
          </> 
          ))}
        </CardBody>
        {
        (loggedInUser.roles.includes("Host") || loggedInUser.roles.includes("Admin"))
        ? (
        addImageButton ? (
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
            ) 
            : <Button onClick={handleAddImageButton} className="btn btn-success">Add Image</Button>
            ) : null
        }
        <>
        <p>
            <Calendar onClick={handleCalendarClick} handleDateSubmitButton={handleDateSubmitButton} propertyId={id} userProfileId={property.userProfileId} 
            newCleaningJob={newCleaningJob} date={date} setDate={setDate} loggedInUser={loggedInUser}/>
        </p>
        </>
      </Card>
            
    </>
  );
}
