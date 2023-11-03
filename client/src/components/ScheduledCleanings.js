import { useEffect, useState } from "react";
import { getJobsForProperty } from "../managers/cleaningJobManager";
import { getPropertiesForUser } from "../managers/propertyManager";
import PropertyDetails from "./properties/PropertyDetails";
import { div, divTitle } from "reactstrap";

export const ScheduledCleanings = ({ loggedInUser }) => {
  const [myProperties, setMyProperties] = useState([]);

  useEffect(() => {
    getPropertiesForUser(loggedInUser.id).then(setMyProperties);
  }, []);

 
  return (
    <>
      <h4 className="font-bold m-2">Scheduled Cleanings</h4>
      <div className="flex flex-row flex-wrap p-4">
      {myProperties.map((p) => (
        <div className="m-2 max-w-sm p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={p.id}>
          <div>
            <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{p.address}</h6>
            {p.cleaningJobs.length > 0 ? (
              <p>
                {p?.cleaningJobs?.map((cj) => (
                  <div key={cj.id}>
                    <div className="font-normal text-gray-700 dark:text-gray-400">Date: {cj.date.slice(0,10)}</div>
                    <ul>
                    <li className="mb-3">
                      Cleaner:{" "}
                      {cj.userProfile.firstName + " " + cj.userProfile.lastName}
                    </li>
                    </ul>
                  </div>
                ))}
              </p>
            ) : (
              <p>No cleanings scheduled</p>
            )}
          </div>
        </div>
      ))}
      </div>
    </>
  );
};
