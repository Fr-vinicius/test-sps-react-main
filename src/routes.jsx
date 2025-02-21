import React, { useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Users from "./pages/Users/Users.jsx";
import UserEdit from "./pages/UserEdit/UserEdit.jsx";
import Header from "./components/Header/Header.jsx";
import { AuthContext } from "./services/AuthContext.jsx";
import User from "./pages/User/User.jsx";
import CreateUser from "./pages/CreateUser/CreateUser.jsx";

const PrivateRoute = ({ element }) => {
  const { token } = useContext(AuthContext);
  return token ? element : <Navigate to="/" />;
};
function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Users" element={<PrivateRoute element={<Users />} />} />
        <Route path="/User" element={<PrivateRoute element={<User />} />} />
        <Route
          path="/UserInfo"
          element={<PrivateRoute element={<UserEdit />} />}
        />
        <Route
          path="/CreateUser"
          element={<PrivateRoute element={<CreateUser />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
