import { useEffect, useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../managers/authManager";
import "./NavBar.css";
import { getMessagesForUser } from "../managers/messageManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {

  const [usersMessages, setUsersMessages] = useState([]);

  useEffect(() => {
    getMessagesForUser(loggedInUser?.id).then(setUsersMessages);
  },[loggedInUser?.id])

  console.log(usersMessages.length)

  return (
    <div className="bg-gray-100 p-4">
      <nav className="flex">
        <RRNavLink className="text-4xl font-bold text-black" to="/">
          <div className="flex flex-row p-4">
            <h1 className="title">Cleanerby</h1>
            <div className="ml-6">
            <img
              className="min-w-20 min-h-20 max-w-20 max-h-20 border rounded-3xl"
              src="/logos/beelogo1.png"
              alt="Cleanerby Logo"
            />
            </div>
          </div>
        </RRNavLink>
        <div>
          {loggedInUser ? (
            <>
              {/* <button
                            
                                className="px-3 py-2 border rounded text-black hover:bg-black hover:text-white"
                            >
                                Menu
                            </button> */}
              {/* {open && ( */}
              <div className="flex flex-row ml-12 mt-12">
                {loggedInUser?.roles.includes("Cleaner", "Admin") && (
                  <RRNavLink
                    to="/available"
                    className="block px-3 py-2 rounded hover:bg-gray-200"
                  >
                    Available for Cleaning
                  </RRNavLink>
                )}
                {loggedInUser?.roles.includes("Cleaner") && (
                  <RRNavLink
                    to="/myschedule"
                    className="block px-3 py-2 rounded hover:bg-gray-200"
                  >
                    My Schedule
                  </RRNavLink>
                )}
                {(loggedInUser?.roles.includes("Cleaner") ||
                  loggedInUser?.roles.includes("Host") ||
                  loggedInUser?.roles.includes("Admin")) && (
                  <RRNavLink
                    to="/messages"
                    className="block px-3 py-2 rounded hover:bg-gray-200"
                  >
                    Messages
                    <span class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                      {usersMessages.length > 0 ? usersMessages.length : "0"}
                    </span>
                  </RRNavLink>
                )}
                {loggedInUser?.roles.includes("Admin") && (
                  <RRNavLink
                    to="/properties"
                    className="block px-3 py-2 rounded hover:bg-gray-200"
                  >
                    All Properties
                  </RRNavLink>
                )}
                <RRNavLink
                  to="/profile"
                  className="block px-3 py-2 rounded hover:bg-gray-200"
                >
                  My Profile
                </RRNavLink>
                {loggedInUser?.roles.includes("Host") && (
                  <RRNavLink
                    to="/myproperties"
                    className="block px-3 py-2 rounded hover:bg-gray-200"
                  >
                    My Properties
                  </RRNavLink>
                )}
                {loggedInUser?.roles.includes("Host") && (
                  <RRNavLink
                    to="/scheduled"
                    className="block px-3 py-2 rounded hover:bg-gray-200"
                  >
                    Scheduled Cleanings
                  </RRNavLink>
                )}
                {loggedInUser?.roles.includes("Admin") && (
                  <RRNavLink
                    to={"/userprofiles"}
                    className="block px-3 py-2 rounded hover:bg-gray-200"
                  >
                    User Profiles
                  </RRNavLink>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // setOpen(false);
                    logout().then(() => {
                      setLoggedInUser(null);
                      // setOpen(false);
                    });
                  }}
                  className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            </>
          ) : null}
        </div>
      </nav>
    </div>
  );
}
