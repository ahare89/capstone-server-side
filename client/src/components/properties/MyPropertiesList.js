import { useEffect, useState, useRef } from "react"
import { getAllProperties, getPropertiesForUser } from "../../managers/propertyManager";
import PropertyCard from "./PropertyCard";
import { Button } from "reactstrap";
import { AddAProperty } from "./AddAProperty";



export const MyPropertiesList = ({ setDetailsPropertyId, loggedInUser }) => {

    const [myProperties, setMyProperties] = useState([]);
    const [addPropertyButton, setAddPropertyButton] = useState(false);
    const [allProperties, setAllProperties] = useState([]);
    const addPropertyRef = useRef(null)

       useEffect(() => {
        getPropertiesForUser(loggedInUser.id).then(setMyProperties);
    },[])


    const handleAddButton = (e) => {
        e.preventDefault();
        setAddPropertyButton(true);
    
        setTimeout(() => {
            if (addPropertyRef.current) {
                window.scrollTo({
                    top: addPropertyRef.current.offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);
    };

    const handleCancelButton = (e) => {
        e.preventDefault();
        setAddPropertyButton(false)
    }

    return (
        <>
        <h2>My Listings</h2>
        {myProperties.length > 0 ? (
        myProperties.map((property) => (<PropertyCard
        property={property}
        setDetailsPropertyId={setDetailsPropertyId}
        getPropertiesForUser={getPropertiesForUser}        
        setMyProperties={setMyProperties}
        loggedInUser={loggedInUser}
        key={`property-${property.id}`}/>
        )))
        : (
        <p>No listings found</p>)}
        {addPropertyButton ? 
        <>
        <AddAProperty addPropertyRef={addPropertyRef} getAllProperties={getAllProperties} setAllProperties={setAllProperties} 
        loggedInUser={loggedInUser} myProperties={myProperties} setMyProperties={setMyProperties} setAddPropertyButton={setAddPropertyButton}/>
        <Button onClick={handleCancelButton} className="btn btn-danger">Cancel</Button>
        </>
        :
        <Button onClick={handleAddButton} className="btn btn-success">Add Property</Button>
        }
        </>

    )

}