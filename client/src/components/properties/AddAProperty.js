import { useEffect, useState, useRef } from "react";
import { Button, Form, FormGroup, input, label } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { getPropertyTypes } from "../../managers/propertyTypeManager";
import {
  getAllProperties,
  getPropertiesForUser,
  postAProperty,
} from "../../managers/propertyManager";
import { PostAnImage } from "../../managers/ImageManager";

export const AddAProperty = ({
  loggedInUser,
  getAllProperties,
  setAllProperties,
  myProperties,
  setMyProperties,
  addPropertyRef,
  setAddPropertyButton
}) => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [newImage, setNewImage] = useState({
    url: "",
    propertyId: null
  })
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const inputRef = useRef(null);

  const [newProperty, setNewProperty] = useState({
    address: "",
    userProfileId: loggedInUser.id,
    sqFt: 0,
    cleaningCost: 0,
    description: "",
    propertyTypeId: "",
    isActive: false,
    images: []
  });

  useEffect(() => {
    getPropertyTypes().then(setPropertyTypes);
  }, []);

  console.log(propertyTypes)

  const handleSubmit = async (e, newProperty, newImage) => {
    e.preventDefault();
    try {
        const response = await postAProperty(newProperty)
        console.log("response status", response.status)
        if (response.status === 201) {
            const propertyData = await response.json();
            const propertyId = propertyData.id;
            
            await PostAnImage({...newImage, propertyId})

            const properties = await getPropertiesForUser(loggedInUser.id);
            setMyProperties(properties);
            
        }   else {
            console.error("Failed to create property or image")
        }
        }
        catch (error) {
            console.error("Error", error)
    }
    setAddPropertyButton(false)
    
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setNewProperty((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }));
    } else if (e.target.name === "sqFt"){
        const sqFtValue = parseInt(e.target.value)
        setNewProperty((prev) => ({
            ...prev,
            [e.target.name]: sqFtValue,
    }))
     } else if (e.target.name === "cleaningCost") {
        const cleaningCostValue = parseInt(e.target.value)
        setNewProperty((prev) =>({
            ...prev,
            [e.target.name]: cleaningCostValue
        }))
     } else {
      setNewProperty((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleImageUpdate = (e) => {
    setNewImage((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }

  const handleCleaningCostUpdate = (e) => {
    setNewProperty((prev) =>({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }

  return (
    <>
    <div className="flex items-center justify-center h-screen bg-gray-100 p-6" ref={addPropertyRef}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2">
      <h4 className="text-xl font-semibold mb-4 text-center">Add A Property</h4>
      <form onSubmit={(e) => handleSubmit(e, newProperty, newImage)} className="">
        <div>
          <label className="block font-medium text-gray-700">Address</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please enter address here"
            autoFocus
            type="text"
            htmlFor="address"
            name="address"
            onChange={handleChange}
          />
          <div>
          <label className="block font-medium text-gray-700">Square Feet</label>
          <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Square footage of the property"
            type="number"
            name="sqFt"
            htmlFor="squarefeet"
            onChange={handleChange}
          />
          </div>
          <label className="block font-medium text-gray-700">Cleaning Payment</label>
          <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please enter the cleaning payment amount"
          type="number"
          name="cleaningCost"
          onChange={handleChange}        
          
          />
          <label className="block font-medium text-gray-700">Description</label>
          <input
          className="h-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="textarea"
            htmlFor="Description"
            name="description"
            onChange={handleChange}
          />
          <div className="mt-4 mb-4 className= flex items-center space-x-2">
          <label className="font-medium text-gray-700">Property Type</label>
                <select
                onChange={handleChange}
                name="propertyTypeId"
                >
                  <option value="0">Choose a Property Type</option>
                {propertyTypes.map(pt => 
                  <option
                    value={pt.id}
                    key={pt.id}
                    onClick={() =>
                      handleChange({
                        target: { name: "propertyTypeId", value: pt.id },
                      })}>
                      {pt.name}</option>)}
                </select>

          </div>
          <div className="flex items-center">
          <input
            style={{ padding: "7px", margin: "4px" }}
            type="checkbox"
            name="isActive"
            className="form-checkbox h-5 w-5 text-green-600"
            onChange={handleChange}
          />
          <label className="ml-2 block font-medium text-gray-700">Available to Clean?</label>
          </div>
          <div>
            <label className="mt-4 mb-2 block font-medium text-gray-700">Image URL</label>
            <input
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="www.google.com/images"
              type="text"
              name="url"
              onChange={handleImageUpdate}
            />
          </div>
        </div>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 active:bg-green-700 transition duration-300"
          type="submit"
        >
          Submit
        </button>
      </form>
      </div>
      </div>
    </>
  );
};
