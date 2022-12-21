import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import Gallery from "./views/gallery/Main";
import ScrollToTop from "./components/scroll-to-top/Main";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
