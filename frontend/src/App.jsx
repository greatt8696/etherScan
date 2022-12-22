import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import ScrollToTop from "./components/scroll-to-top/Main";
import axios from "axios";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
