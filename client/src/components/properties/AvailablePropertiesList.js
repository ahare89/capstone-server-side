import { useEffect, useState } from "react"
import { getAvailableProperties } from "../../managers/propertyManager";
import PropertyCard from "./PropertyCard";

export const AvailablePropertiesList = ({ setDetailsPropertyId }) => {

    const [availableProperties, setAvailableProperties] = useState([]);

    useEffect(() => {
        getAvailableProperties().then(setAvailableProperties);
    },[])

    return (
        <>
        <h2>Available Properties for Cleaning</h2>
        {availableProperties.map(property => (<PropertyCard
        property={property}
        setDetailsPropertyId={setDetailsPropertyId}
        key={`property-${property.id}`}/>
        ))}
        </>

    )

}