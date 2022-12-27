import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/nav-bar/Main";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/loading/Loading";
const Main = () => {
  return (
    <div>
      <Loading />
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
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Main;
