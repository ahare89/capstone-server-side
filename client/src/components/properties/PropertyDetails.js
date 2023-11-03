import { useState, useEffect } from "react";
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardText,
  Button,
  Input,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { editAProperty, getPropertyById } from "../../managers/propertyManager";
import { useParams } from "react-router-dom";
import { DeleteAnImage, PostAnImage } from "../../managers/ImageManager";
import Calendar from "../Calendar";
import { postAJob } from "../../managers/cleaningJobManager";

export default function PropertyDetails({ loggedInUser }) {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [newImage, setNewImage] = useState({
    url: "",
    propertyId: id,
  });
  const [addImageButton, setAddImageButton] = useState(false);
  const [editAddressButton, setEditAddressButton] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const [editAvailableButton, setEditAvailableButton] = useState(false);
  const [editSqFtButton, setEditSqFtButton] = useState(false);
  const [editDescriptionButton, setEditDescriptionButton] = useState(false);
  const [editedAddress, setEditedAddress] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedSqFt, setEditedSqFt] = useState(0);
  const [editedCleaningFee, setEditedCleaningFee] = useState(0.0);
  const [editCostButton, setEditCostButton] = useState(false);
  const [newCleaningJob, setNewCleaningJob] = useState(null);
  const [date, setDate] = useState(new Date());

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (editAddressButton === false) {
      editAProperty(id, property);
    }
  }, [property]);

  useEffect(() => {
    setNewCleaningJob({
      propertyId: parseInt(id),
      userProfileId: loggedInUser.id,
      date: date,
    });
  }, [date]);

  const getPropertyDetails = (id) => {
    getPropertyById(id).then(setProperty);
  };

  const handleDeleteButton = (id, propertyId) => {
    DeleteAnImage(id)
      .then(() => getPropertyById(propertyId))
      .then((updatedProperty) => {
        if (updatedProperty && updatedProperty.images) {
          setProperty(updatedProperty);
        }
      });
  };

  const handleAddImageButton = () => {
    setAddImageButton(true);
  };

  const handleCancelButton = () => {
    setAddImageButton(false);
  };

  const handleEditAvailableButton = () => {
    setEditAvailableButton(true);
  };

  const handleCancelEditAvailableButton = () => [setEditAvailableButton(false)];

  const handleEditDescriptionButton = () => {
    setEditedDescription(property.description);
    setEditDescriptionButton(true);
  };

  const handleCancelEditDescriptionButton = () => {
    setEditDescriptionButton(false);
  };

  const handleEditSqFtButton = () => {
    setEditedSqFt(property.sqFt);
    setEditSqFtButton(true);
  };

  const handleCancelEditSqFtButton = () => {
    setEditSqFtButton(false);
  };

  const handleEditAddressButton = () => {
    setEditedAddress(property.address);
    setEditAddressButton(true);
  };

  const handleCancelEditAddressButton = () => {
    setEditAddressButton(false);
  };

  const handleSaveAddressButton = () => {
    setProperty((prev) => ({
      ...prev,
      address: editedAddress,
    }));
    setEditAddressButton(false);
  };

  const handleSaveDescriptionButton = () => {
    setProperty((prev) => ({
      ...prev,
      description: editedDescription,
    }));
    setEditDescriptionButton(false);
  };

  const handleSaveSqFtButton = () => {
    setProperty((prev) => ({
      ...prev,
      sqFt: editedSqFt,
    }));
    setEditSqFtButton(false);
  };

  const handleEditCostButton = () => {
    setEditedCleaningFee(property.cleaningCost);
    setEditCostButton(true);
  };

  const handleCancelEditCostButton = () => {
    setEditCostButton(false);
  };

  const handleSaveCostButton = () => {
    setProperty((prev) => ({
      ...prev,
      cleaningCost: editedCleaningFee,
    }));
    setEditCostButton(false);
  };

  const handleChange = (e) => {
    setNewImage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitButton = (newImage, propertyId) => {
    PostAnImage(newImage)
      .then(() => getPropertyById(propertyId))
      .then((updatedProperty) => {
        setProperty(updatedProperty);
      });
  };

  const handleDateSubmitButton = (newCleaningJob) => {
    postAJob(newCleaningJob);
  };

  const handleCalendarClick = (id, userProfileId) => {
    console.log("You clicked the calendar");
    setNewCleaningJob({
      propertyId: parseInt(id),
      userProfileId: userProfileId,
      date: date,
    });
  };

  useEffect(() => {
    if (id) {
      getPropertyDetails(id);
    }
  }, [id]);

  if (!property) {
    return (
      <>
        <h2 className="text-2xl font-bold mb-4">Property Details</h2>
        <p>Please choose a property...</p>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <h4 className="text-lg font-bold mb-4">Property Details</h4>
          <div>
            {loggedInUser.roles.includes("Host") ||
            loggedInUser.roles.includes("Admin") ? (
              !editAddressButton ? (
                <>
                  <p className="mb-4">
                    <div className="font-bold">Address: </div>{property.address}
                    <button
                      onClick={handleEditAddressButton}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 ml-1"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <Input
                    type="text"
                    value={editedAddress}
                    onChange={(e) => {
                      setEditedAddress(e.target.value);
                    }}
                  />
                  <button
                    onClick={handleCancelEditAddressButton}
                    className="btn btn-danger btn btn-sm"
                  >
                    Cancel
                  </button>
                  <button className="bg-green-500 text-white btn btn-sm hover:bg-green-600 transition duration-300" onClick={handleSaveAddressButton}>Save</button>
                </>
              )
            ) : (
              <div className="font-bold">{property.address}</div>
            )}
            {/* </div> */}
            {loggedInUser.roles.includes("Host") ||
            loggedInUser.roles.includes("Admin") ? (
              <div>
                <p className="font-bold">
                  Make Listing Public?
                  <Input
                    type="checkbox"
                    name="isActive"
                    checked={property.isActive}
                    onChange={(e) =>
                      setProperty((prev) => ({
                        ...prev,
                        isActive: e.target.checked,
                      }))
                    }
                  />
                </p>
              </div>
            ) : null}
            {loggedInUser.roles.includes("Host") ||
            loggedInUser.roles.includes("Admin") ? (
              !editDescriptionButton ? (
                <>
                  <p className="mt-4 mb-4">
                    <div className="font-bold">Description: </div>{property.description}
                    <button
                      onClick={handleEditDescriptionButton}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 ml-1"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <Input
                    type="textarea"
                    value={editedDescription}
                    onChange={(e) => {
                      setEditedDescription(e.target.value);
                    }}
                  />
                  <button
                    onClick={handleCancelEditDescriptionButton}
                    className="bg-red-500 text-white btn btn-sm hover:bg-red-600 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white btn btn-sm hover:bg-green-600 transition duration-300"
                    onClick={handleSaveDescriptionButton}
                  >
                    Save
                  </button>
                </>
              )
            ) : (
              <p className="italic">{property.description}</p>
            )}
            {loggedInUser.roles.includes("Host") ||
            loggedInUser.roles.includes("Admin") ? (
              !editSqFtButton ? (
                <>
                  <p className="mt-4 mb-4">
                    <div className="font-bold">Square Feet: </div>{property.sqFt}
                    <button onClick={handleEditSqFtButton}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 ml-1"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <Input
                    type="number"
                    value={editedSqFt}
                    onChange={(e) => setEditedSqFt(parseInt(e.target.value))}
                  />
                  <button
                    className="bg-red-500 text-white btn btn-sm hover:bg-red-600 transition duration-300"
                    onClick={handleCancelEditSqFtButton}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white btn btn-sm hover:bg-green-600 transition duration-300"
                    onClick={handleSaveSqFtButton}
                  >
                    Save
                  </button>
                </>
              )
            ) : (
              <p><div className="font-bold">Square Feet: </div>{property.sqFt}</p>
            )}
            {loggedInUser.roles.includes("Host") ||
            loggedInUser.roles.includes("Admin") ? (
              !editCostButton ? (
                <>
                  <p className="mb-4">
                    <div className="font-bold">Cleaning Payment: </div>${property?.cleaningCost}
                    <button
                      onClick={handleEditCostButton}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 ml-1"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <Input
                    type="number"
                    value={editedCleaningFee}
                    onChange={(e) =>
                      setEditedCleaningFee(parseInt(e.target.value))
                    }
                  />
                  <button
                    className="bg-red-500 text-white btn btn-sm hover:bg-red-600 transition duration-300"
                    onClick={handleCancelEditCostButton}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white btn btn-sm hover:bg-green-600 transition duration-300"
                    onClick={handleSaveCostButton}
                  >
                    Save
                  </button>
                </>
              )
            ) : (
              <p className="font-bold">
                Cleaning Payment:{" "}
                <p className="text-green-500">${property?.cleaningCost}</p>
              </p>
            )}
            <p className="mb-4">
              <div className="font-bold">Host:{" "}</div>
              {property?.userProfile?.firstName +
                " " +
                property?.userProfile?.lastName}
            </p>
            <div className="flex flex-row flex-wrap">
              {property?.images?.map((i, index) => (
                <>
                  {" "}
                  <img
                    key={index}
                    className="img h-40 w-40 rounded-3xl shadow-lg mb-4 m-3 hover:scale-125 transition-all duration-300 cursor-pointer"
                    src={i.url}
                  />
                  {loggedInUser.roles.includes("Host") ||
                  loggedInUser.roles.includes("Admin") ? (
                    <button onClick={() => handleDeleteButton(i.id, id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  ) : null}
                </>
              ))}
            </div>
            {loggedInUser.roles.includes("Host") ||
            loggedInUser.roles.includes("Admin") ? (
              addImageButton ? (
                <>
                  <Label>Image URL</Label>
                  <Input
                    placeholder="http://google.com/images/41247aef9aefy"
                    type="text"
                    name="url"
                    onChange={handleChange}
                  />
                  <button
                    className="bg-green-500 text-white btn btn-sm rounded hover:bg-green-600 transition duration-300 mt-2"
                    onClick={() => {
                      handleSubmitButton(newImage, id);
                    }}
                  >
                    Submit
                  </button>
                  <button
                    className="bg-red-500 text-white btn btn-sm hover:bg-red-600 transition duration-300 mt-2"
                    onClick={handleCancelButton}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                  onClick={handleAddImageButton}
                >
                  Add Image
                </button>
              )
            ) : null}
            <>
              <p className="mt-4">
                <Calendar
                  onClick={handleCalendarClick}
                  handleDateSubmitButton={handleDateSubmitButton}
                  propertyId={id}
                  userProfileId={property.userProfileId}
                  newCleaningJob={newCleaningJob}
                  date={date}
                  setDate={setDate}
                  loggedInUser={loggedInUser}
                />
              </p>
            </>
          </div>
        </div>
      </div>
    </>
  );
}
