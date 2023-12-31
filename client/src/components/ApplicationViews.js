import { Route, Routes, useRoutes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Home } from "./Home";
import { UserProfileList } from "./UserProfileList";
import { UserProfileDetails } from "./UserProfileDetails";
import { AvailablePropertiesList } from "./properties/AvailablePropertiesList";
import { AllPropertiesList } from "./properties/AllPropertiesList";
import MyProfile from "./MyProfile";
import { MyPropertiesList } from "./properties/MyPropertiesList";
import PropertyDetails from "./properties/PropertyDetails";
import { CleanerSchedule } from "./CleanerSchedule";
import { Messages } from "./messages/Messages";
import { NewMessage } from "./messages/NewMessage";
import { ScheduledCleanings } from "./ScheduledCleanings";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <Home />
          </AuthorizedRoute>
        }
        index
      />
      <Route
      path="/available"
      element={
        <AuthorizedRoute roles= {["Cleaner", "Admin"]} loggedInUser={loggedInUser}>
          <AvailablePropertiesList loggedInUser={loggedInUser}/>
        </AuthorizedRoute>
      }>
        </Route>
        <Route
      path="/properties"
      element={
        <AuthorizedRoute loggedInUser={loggedInUser}>
          <AllPropertiesList loggedInUser={loggedInUser}/>
        </AuthorizedRoute>
      }>
      </Route>
      <Route
      path="/profile"
      element={
        <AuthorizedRoute loggedInUser={loggedInUser}>
          <MyProfile loggedInUser={loggedInUser}/>
        </AuthorizedRoute>
      }>
      </Route>
      <Route
      path="/myproperties"
      element={
        <AuthorizedRoute roles={["Host", "Admin"]} loggedInUser={loggedInUser}>
          <MyPropertiesList loggedInUser={loggedInUser}/>
        </AuthorizedRoute>
      }>
        </Route>
        <Route
        path="/properties/property/:id"
        element={<AuthorizedRoute roles={["Host", "Admin"]} loggedInUser={loggedInUser}>
        <PropertyDetails loggedInUser={loggedInUser}/>
      </AuthorizedRoute>}>
      </Route>
      <Route
        path="available/property/:id"
        element={<AuthorizedRoute roles={["Cleaner", "Admin"]} loggedInUser={loggedInUser}>
        <PropertyDetails loggedInUser={loggedInUser}/>
      </AuthorizedRoute>}>
      </Route>
        <Route
        path="myproperties/property/:id"
        element={<AuthorizedRoute roles={["Host", "Admin"]} loggedInUser={loggedInUser}>
        <PropertyDetails loggedInUser={loggedInUser}/>
      </AuthorizedRoute>}>
      </Route>
      <Route
        path="myschedule"
        element={<AuthorizedRoute roles={["Cleaner", "Admin"]} loggedInUser={loggedInUser}>
        <CleanerSchedule loggedInUser={loggedInUser}/>
      </AuthorizedRoute>}>
      </Route>  
      <Route
        path="scheduled"
        element={<AuthorizedRoute roles={["Host", "Admin"]} loggedInUser={loggedInUser}>
        <ScheduledCleanings loggedInUser={loggedInUser}/>
      </AuthorizedRoute>}>
      </Route> 
      <Route
        path="messages"
        element={<AuthorizedRoute roles={["Cleaner", "Host", "Admin"]} loggedInUser={loggedInUser}>
        <Messages loggedInUser={loggedInUser}/>
      </AuthorizedRoute>}>
      </Route>   
      <Route
        path="newmessage"
        element={<AuthorizedRoute roles={["Cleaner", "Host"]} loggedInUser={loggedInUser}>
        <NewMessage loggedInUser={loggedInUser}/>
      </AuthorizedRoute>}>
      </Route>     
      <Route
        path="/userprofiles"
        element={
          <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <UserProfileList />
          </AuthorizedRoute>
        }
      />
      <Route
        path="/userprofiles/:id"
        element={
          <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <UserProfileDetails />
          </AuthorizedRoute>
        }
      />
      <Route
        path="/login"
        element={<Login setLoggedInUser={setLoggedInUser} />}
      />
      <Route
        path="/register"
        element={<Register setLoggedInUser={setLoggedInUser} />}
      />
    </Routes>
  );
}
