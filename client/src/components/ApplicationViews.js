import { Route, Routes } from "react-router-dom";
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
      path="/cleanme"
      element={
        <AuthorizedRoute roles= {["Cleaner", "Admin"]} loggedInUser={loggedInUser}>
          <AvailablePropertiesList/>
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
