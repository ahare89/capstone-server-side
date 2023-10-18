import { useEffect, useState } from "react"
import { getAllProperties, getPropertiesForUser } from "../../managers/propertyManager";
import PropertyCard from "./PropertyCard";
import { Button } from "reactstrap";
import { AddAProperty } from "./AddAProperty";

export const MyPropertiesList = ({ setDetailsPropertyId, loggedInUser }) => {

    const [myProperties, setMyProperties] = useState([]);
    const [addPropertyButton, setAddPropertyButton] = useState(false);
    const [allProperties, setAllProperties] = useState([]);

       useEffect(() => {
        getPropertiesForUser(loggedInUser.id).then(setMyProperties);
    },[])


    const handleAddButton = (e) => {
        e.preventDefault();
        setAddPropertyButton(true)
    }

    const handleCancelButton = (e) => {
        e.preventDefault();
        setAddPropertyButton(false)
    }

    return (
        <>
        <h2>Properties</h2>
        {myProperties.length > 0 ? (
        myProperties.map((property) => (<PropertyCard
        property={property}
        setDetailsPropertyId={setDetailsPropertyId}
        key={`property-${property.id}`}/>
        )))
        : (
        <p>No properties found</p>)}
        {addPropertyButton ? 
        <>
        <AddAProperty getAllProperties={getAllProperties} setAllProperties={setAllProperties} loggedInUser={loggedInUser}/>
        <Button onClick={handleCancelButton} className="btn btn-danger">Cancel</Button>
        </>
        :
        <Button onClick={handleAddButton} className="btn btn-success">Add Property</Button>
        }
        </>

    )

}