import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Home } from "./Home";
import { UserProfileList } from "./UserProfileList";
import { UserProfileDetails } from "./UserProfileDetails";

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
