import { useState } from "react";
import { AvailablePropertiesList } from "./AvailablePropertiesList";

export default function Properties(){
    
    
    
    const [detailsPropertyId, setDetailsPropertyId] = useState(null);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <AvailablePropertiesList setDetailsPropertyId={setDetailsPropertyId}/>
                </div>
                <div>
                    <PropertDetails detailsPropertyId={detailsPropertyId}/>
                </div>
            </div>
        </div>
    )




}