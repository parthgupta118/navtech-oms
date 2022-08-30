import React, { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

// Imported Components for rendering pages
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./components/route/PrivateRoute";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";

// Imported Redux Thunk Actions from slices
import { authActions } from "./slices/authSlice";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { orderActions } from "./slices/orderSlice";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(authActions.loadUser());
  //   dispatch(orderActions.loadOrders());
  // }, []);

  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* Unauthorized Routes */}
        <Route path="register" element={<Signup />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute component={Dashboard} />} />
      </Routes>
    </Fragment>
  );
}

export default App;
