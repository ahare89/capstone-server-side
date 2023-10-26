import { useEffect, useState } from "react";
import { getJobsForProperty } from "../managers/cleaningJobManager";
import { getPropertiesForUser } from "../managers/propertyManager";
import PropertyDetails from "./properties/PropertyDetails";
import { Card, CardTitle } from "reactstrap";

export const ScheduledCleanings = ({ loggedInUser }) => {
  const [myProperties, setMyProperties] = useState([]);

  useEffect(() => {
    getPropertiesForUser(loggedInUser.id).then(setMyProperties);
  }, []);

  console.log(myProperties);

  return (
    <>
      <h4>Scheduled Cleanings</h4>
      {myProperties.map((p) => (
        <div className="schedule-item" key={p.id}>
          <Card>
            <h6>{p.address}</h6>
            {p.cleaningJobs.length > 0 ? (
              <p>
                {p?.cleaningJobs?.map((cj) => (
                  <Card style={{width: "10rem"}} key={cj.id}>
                    <CardTitle tag="h6">Date: {cj.date.slice(0,10)}</CardTitle>
                    <li>
                      Cleaner:{" "}
                      {cj.userProfile.firstName + " " + cj.userProfile.lastName}
                    </li>
                  </Card>
                ))}
              </p>
            ) : (
              <p>No cleanings scheduled</p>
            )}
          </Card>
        </div>
      ))}
    </>
  );
};
