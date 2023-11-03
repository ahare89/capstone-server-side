import { useState, useEffect } from "react";
import { Card, CardTitle, CardSubtitle, CardBody, CardText, Button, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { editAProperty, getAvailableProperties, getPropertiesForUser, getPropertyById } from "../../managers/propertyManager";
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
  const [editSqFtButton, setEditSqFtButton] = useState(false)
  const [editDescriptionButton, setEditDescriptionButton] = useState(false)
  const [editCostButton, setEditCostButton] = useState(false)
  const [newCleaningJob, setNewCleaningJob] = useState(null)
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
        address: "",
        description: "",
        sqFt: 0,
        cleaningCost: 0.00,
        isActive: null
  })

//   useEffect(() => {
//     editAProperty(id, formData)
//     .then(() => getPropertyById(id))
//     .then(updatedProperty => setProperty(updatedProperty))
//   },[formData.isActive])


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);


  useEffect(() => {
    if (property) {
        setFormData({
            address: property.address,
            description: property.description,
            sqFt: property.sqFt,
            cleaningCost: property.cleaningCost,
            propertyTypeId: property.propertyTypeId,
            isActive: property.isActive
        })
    }
  },[property])

//   useEffect(() => {
//     if (editAddressButton === false)
//     {
//         editAProperty(id, property)
//     }
//   },[property])

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

const handleEditDescriptionButton = () => {
    setEditDescriptionButton(true)
}

const handleCancelEditDescriptionButton = () => {
    setEditDescriptionButton(false)
}

const handleEditSqFtButton = () => {
    setEditSqFtButton(true)
}

const handleCancelEditSqFtButton = () => {
    setEditSqFtButton(false)
}

const handleEditAddressButton = () => {
    setEditAddressButton(true)
}

const handleCancelEditAddressButton = () => {
    setEditAddressButton(false)
}

const handleSaveAddressButton = (e) => {
    e.preventDefault();
    editAProperty(id, formData)
    .then(updatedProperty => {
        setProperty(updatedProperty) 
        setEditAddressButton(false);
    })

}

const handleSaveDescriptionButton = () => {
    editAProperty(id, formData)
    .then(updatedProperty => {
        setProperty(updatedProperty)
        setEditDescriptionButton(false);
    })
}

const handleSaveSqFtButton = (e) => {
    editAProperty(id, formData)
    .then(updatedProperty => {
        setProperty(updatedProperty)
        setEditSqFtButton(false);
    })
}

const handleEditCostButton = () => {
    setEditCostButton(true)
}

const handleCancelEditCostButton = () => {
    setEditCostButton(false)
}

const handleSaveCostButton = () => {
    editAProperty(id, formData)
    .then(updatedProperty => {
        setProperty(updatedProperty)
        setEditCostButton(false);
    })
    
}


const handleChange = (e) => {
    setNewImage((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
    }))
}

const propertyEditChangeHandler = (e) => {
    if (e.target.name === "isActive")
    {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.checked
        }))
    } else {    
    setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
}))
}
}


const handleSubmitImageButton = (newImage, propertyId) => {
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
          name="address"
          value={formData.address}
          onChange={(e) => propertyEditChangeHandler(e)}
          />
          <Button onClick={handleCancelEditAddressButton} className="btn btn-danger btn btn-sm">Cancel</Button>
          <Button type="button" onClick={(e) => handleSaveAddressButton(e)} className="btn btn-success btn btn-sm">Save</Button>
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
           checked={formData.isActive}
           onChange={(e) => propertyEditChangeHandler(e)}
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
          name="description"
          value={formData.description}
          onChange={(e) => {propertyEditChangeHandler(e)}}
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
          name="sqFt"
          value={formData.sqFt}
          onChange={(e) => propertyEditChangeHandler(e)}     
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
          name="cleaningCost"
          value={formData.cleaningCost}
          onChange={(e) => propertyEditChangeHandler(e)}
          />
          <Button onClick={handleCancelEditCostButton} className="btn btn-danger btn btn-sm">Cancel</Button>
          <Button onClick={handleSaveCostButton} className="btn btn-success btn btn-sm">Save</Button>
          </>
            ) : <p>Cleaning Payment: ${property?.cleaningCost}</p>}     
          <p>Host: {property?.userProfile?.firstName + " " + property?.userProfile?.lastName}</p>
          {property?.images?.map((i, index) => (
          <> <img key={index} className="img" style={{width: '200px', height: '200px'}} src={i.url}/> 
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
            <Button onClick={() => {handleSubmitImageButton(newImage, id)}} className="btn btn-success">Submit</Button>
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
