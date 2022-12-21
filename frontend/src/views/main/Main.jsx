import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/nav-bar/Main";
const Main = () => {
  return (
    <div>
      <div className="w-full h-20 fixed z-50">
        <NavBar />
      </div>
      <div className="App example flex min-w-[800px] overflow-y-scroll">
        <div className="w-3/4 min-w-[500px] m-auto my-24">
          {/* BEGIN: Content */}
          <Outlet />
          {/* END: Content */}
        </div>
      </div>
    </div>
  );
};

export default Main;
