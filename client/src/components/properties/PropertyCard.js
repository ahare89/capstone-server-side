import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardSubtitle,
    Button,
  } from "reactstrap";

  

export default function PropertyCard({property, setDetailsPropertyId}) {
    return (
        <Card color="dark" outline style={{ marginBottom: "4px"}}>
            <CardBody>
                <CardTitle tag="h5">{property.address}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Description: {property.description}
                </CardSubtitle>
                <CardText>Square Feet: {property.sqFt}</CardText>
                <Button color="dark"
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
            </CardBody>
        </Card>
    )
}