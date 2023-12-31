import { useEffect, useState } from "react";
import { getAllProperties } from "../../managers/propertyManager";
import PropertyCard from "./PropertyCard";
import { Button } from "reactstrap";
import { AddAProperty } from "./AddAProperty";

export const AllPropertiesList = ({ setDetailsPropertyId, loggedInUser }) => {
  const [allProperties, setAllProperties] = useState([]);
  const [addPropertyButton, setAddPropertyButton] = useState(false);

  useEffect(() => {
    getAllProperties().then(setAllProperties);
  }, []);

  const handleAddButton = (e) => {
    e.preventDefault();
    setAddPropertyButton(true);
  };

  const handleCancelButton = (e) => {
    e.preventDefault();
    setAddPropertyButton(false);
  };

  return (
    <>
      <h2>Listings</h2>
      {allProperties.length > 0 ? (
      allProperties.map((property) => (<PropertyCard
          property={property}
          setDetailsPropertyId={setDetailsPropertyId}
          getAllProperties={getAllProperties}
          setAllProperties={setAllProperties}
          loggedInUser={loggedInUser}
          key={`property-${property.id}`}/>
      )))
          : (
            <p>No listings found</p>)}
      {addPropertyButton ? (
        <>
          <AddAProperty
            getAllProperties={getAllProperties}
            setAllProperties={setAllProperties}
            loggedInUser={loggedInUser}
          />
          <Button onClick={handleCancelButton} className="btn btn-danger">
            Cancel
          </Button>
        </>
      ) : (
        <Button onClick={handleAddButton} className="btn btn-success">
          Add Property
        </Button>
      )}
    </>
  );
};
