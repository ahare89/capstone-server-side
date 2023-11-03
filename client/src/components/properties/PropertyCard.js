import { useState } from "react";
import { deleteAProperty, getAllProperties } from "../../managers/propertyManager";
import { useNavigate, useParams } from "react-router-dom";
import "./PropertyCard.css"

export default function PropertyCard({ property, getPropertiesForUser, setMyProperties, loggedInUser, setAllProperties, getAllProperties }) {
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    const handleDeleteButton = async (id) => {
        try {
        const res = await deleteAProperty(id);
        if (res.status === 204) {
            const properties = await getPropertiesForUser(loggedInUser.id)
            setMyProperties(properties)
        } else {
            console.error("Failed to delete property", res.status)
        }
    } catch (error){
        console.error("Error while deleting property", error)
    }
}
      
      
return (
    <div className="border bg-gray-800 p-2 mb-4 w-60 rounded-lg shadow-lg mx-2 my-2 flex flex-col justify-between">
        {property?.images.slice(0,2).map(pi =>
            <div key={pi.id} className="w-full h-32 bg-cover bg-center mb-2 rounded-b-lg rounded-t-lg" style={{ backgroundImage: `url(${pi.url})` }}></div>
        )}
        <div className="p-2 flex-grow">
            <h5 className="text-white font-bold text-sm mb-2">{property?.address}</h5>
            <p className="text-white text-xs mb-1">Square Feet: {property?.sqFt}</p>
            <p className="text-white text-xs mb-1">Cleaning Payment: ${property?.cleaningCost}</p>
        </div>
        <div className="flex justify-between items-center px-2 pb-2">
            <button className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 text-xs rounded"
                onClick={() => {
                    navigate(`property/${property.id}`)
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    })
                }}>
                Details
            </button>
            {(loggedInUser.roles.includes("Host") || loggedInUser.roles.includes("Admin")) && (
                <button onClick={() => handleDeleteButton(property.id)} className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 text-xs rounded">
                    Delete
                </button>
            )}
        </div>
    </div>
)
}