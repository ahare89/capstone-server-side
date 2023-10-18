import { useState, useEffect } from "react";
import { Card, CardTitle, CardSubtitle, CardBody, CardText } from "reactstrap";
import { getPropertyById } from "../../managers/propertyManager";

export default function PropertyDetails({ detailsPropertyId }) {
  const [property, setProperty] = useState(null);

  const getPropertyDetails = (id) => {
    getPropertyById(id).then(setProperty);
  };

  useEffect(() => {
    if (detailsPropertyId) {
      getPropertyDetails(detailsPropertyId);
    }
  }, [detailsPropertyId]);

console.log(property)

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
          <CardTitle tag="h4">{property.id}</CardTitle>
          <p>Id: {property.id}</p>
          <p>Address: {property.address}</p>
          <p>Square Feet: {property.sqFt}</p>
          <p>UserProfileId: {property.userProfileId}</p>
        </CardBody>
      </Card>
    </>
  );
}
