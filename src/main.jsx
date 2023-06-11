import React, { createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import AddCatogery from "./pages/AddCatogery";
import Category from "./pages/Category";
import AddCar from "./pages/AddCar";
import PageNotFound from "./components/404/PageNotFound";
import SingleProduct from "./pages/SingleProduct";
import PrivetRoute from "./components/PrivetRoute/PrivetRoute";
import Blogs from "./pages/Blogs";
import MyToys from "./pages/MyToys";
import EditProduct from "./pages/EditProduct";
import Alltoys from "./pages/Alltoys";
import Search from "./pages/Search";

const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <PageNotFound />,
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/toys/:category",
        element: <Category />,
      },
      {
        path: "/user/login",
        element: <Login />,
      },
      {
        path: "/user/register",
        element: <Register />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/alltoys",
        element: <Alltoys />,
      },
      {
        path: "/toys/search",
        element: <Search />,
      },
      {
        path: "/addcatogery",
        element: (
          <PrivetRoute>
            <AddCatogery />
          </PrivetRoute>
        ),
      },
      {
        path: "/mytoys",
        element: (
          <PrivetRoute>
            <MyToys />
          </PrivetRoute>
        ),
      },
      {
        path: "/mytoy/edit/:id",
        element: (
          <PrivetRoute>
            <EditProduct />
          </PrivetRoute>
        ),
      },
      {
        path: "/addcar",
        element: (
          <PrivetRoute>
            <AddCar />
          </PrivetRoute>
        ),
      },
      {
        path: "/toy/:id",
        element: (
          <PrivetRoute>
            <SingleProduct />
          </PrivetRoute>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
