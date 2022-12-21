import React from "react";
import { useRoutes } from "react-router-dom";
import Main from "../views/main/Main";
import Gallery from "../views/gallery/Main";

const Router = () => {
  const routes = [
    {
      path: "/",
      element: <Main />,
      children: [
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
