import { useState } from "react";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardSubtitle,
    Button,
  } from "reactstrap";

  
  export default function PropertyCard({property, setDetailsPropertyId}) {
    console.log("setDetailsPropertyId prop:", setDetailsPropertyId);
    const [editMode, setEditMode] = useState(false);
    
    console.log(property)
      
      
      return (
        <Card color="dark" outline style={{ marginBottom: "4px"}}>
            <CardBody>
                <CardTitle tag="h5">{property.address}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Description: {property.description}
                </CardSubtitle>
                <CardText>Square Feet: {property.sqFt}</CardText>
                <CardText>
                {property.images.map(pi => <img key={pi.id} style={{width: '200px', height: '200px'}} className="img" src={pi.url}/>)}
                </CardText>
                <Button color="info"
                onClick={() => {
                    setDetailsPropertyId(property.id)
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    })
                }}>
                    Show Details
                </Button>
                <Button className="btn btn-danger">Delete</Button>
                <Button className="btn btn-warning">Edit Property</Button>
            </CardBody>
        </Card>
    )
}