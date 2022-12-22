import React from "react";
import { useRoutes } from "react-router-dom";
import Main from "../views/main/Main";
import Gallery from "../views/gallery/Main";
import Dashboard from "../views/dashboard/Main";
import Transaction from "../views/transaction/Main";

const Router = () => {
  const routes = [
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/transactionByBlockHash/:hash",
          element: <Transaction />,
        },
        {
          path: "/gallery",
          element: <Gallery />,
        },
        {
          path: "/gallery1",
          element: <Gallery />,
        },
        {
          path: "/gallery2",
          element: <Gallery />,
        },
      ],
    },
  ];
  return useRoutes(routes);
};

export default Router;
