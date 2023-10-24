import { useState } from "react";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardSubtitle,
    Button,
  } from "reactstrap";
import { deleteAProperty, getAllProperties } from "../../managers/propertyManager";
import { useNavigate, useParams } from "react-router-dom";
import "./PropertyCard.css"

  
  export default function PropertyCard({property, setDetailsPropertyId, getPropertiesForUser, setMyProperties, loggedInUser, setAllProperties, getAllProperties}) {
    const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate();

    const handleDeleteButton = async (id) => {
        try {
        const res = await deleteAProperty(id);
        if (res.status === 204) {
            const properties = await getPropertiesForUser(loggedInUser.id)
            // const allProperties = await getAllProperties
            // setAllProperties(allProperties)
            setMyProperties(properties)
        } else {
            console.error("Failed to delete property", res.status)
        }
    } catch (error){
        console.error("Error while deleting property", error)
    }
}
      
      
      return (
        <Card color="dark" outline style={{ marginBottom: "4px"}}>
            <CardBody>
                <CardTitle tag="h5">{property?.address}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                </CardSubtitle>
                <CardText>Square Feet: {property?.sqFt}</CardText>
                <CardText>
                {property?.images.map(pi => <img key={pi.id} style={{width: '200px', height: '200px'}} className="img" src={pi.url}/>)}
                </CardText>
                <Button className="btn btn-sm" color="info"
                onClick={() => {
                    navigate(`property/${property.id}`)
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    })
                }}>
                    Show Details
                </Button>
                {loggedInUser.roles.includes("Host") || loggedInUser.roles.includes("Admin") ? (
                <>
                <Button onClick={() => handleDeleteButton(property.id)} className="btn btn-danger btn btn-sm">Delete Listing</Button>
                </>
                ) : null}
            </CardBody>
        </Card>
    )
}