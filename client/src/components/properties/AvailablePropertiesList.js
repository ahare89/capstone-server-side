import { useEffect, useState } from "react"
import { getAvailableProperties } from "../../managers/propertyManager";
import PropertyCard from "./PropertyCard";

export const AvailablePropertiesList = ({ setDetailsPropertyId, loggedInUser}) => {

    const [availableProperties, setAvailableProperties] = useState([]);

    useEffect(() => {
        getAvailableProperties().then(setAvailableProperties);
    },[])

    return (
        <>
        <h2 className="text-lg font-bold mb-4">Properties Available For Cleaning</h2>
        <div className="flex flex-wrap">
        {availableProperties.map(property => (<PropertyCard
        property={property}
        setDetailsPropertyId={setDetailsPropertyId}
        loggedInUser={loggedInUser}
        key={`property-${property.id}`}/>
        ))}
        </div>
        </>

    )

}