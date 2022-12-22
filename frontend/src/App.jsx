import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import Gallery from "./views/gallery/Main";
import ScrollToTop from "./components/scroll-to-top/Main";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios({
      url: "http://localhost:3000/block/count/", // 통신할 웹문서
      method: "get", // 통신할 방식
    }).then((response) => {
      console.log(response);
    });
  }, []);
  return (
    <BrowserRouter>
      <Router />
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
