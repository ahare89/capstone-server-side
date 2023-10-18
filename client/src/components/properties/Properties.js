import { useState } from "react";
import { AvailablePropertiesList } from "./AvailablePropertiesList";
import { AllPropertiesList } from "./AllPropertiesList";
import { MyPropertiesList } from "./MyPropertiesList";
import PropertyDetails from "./PropertyDetails";

export default function Properties() {
  const [detailsPropertyId, setDetailsPropertyId] = useState(null);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <AllPropertiesList setDetailsPropertyId={setDetailsPropertyId} />
        </div>
        <div className="col-sm-8">
          <AvailablePropertiesList
            setDetailsPropertyId={setDetailsPropertyId}
          />
        </div>
        <div className="col-sm-8">
          <MyPropertiesList setDetailsPropertyId={setDetailsPropertyId} />
        </div>
        <div className="col-sm-4">
          <PropertyDetails detailsPropertyId={detailsPropertyId} />
        </div>
      </div>
    </div>
  );
}
