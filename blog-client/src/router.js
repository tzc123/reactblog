import React from "react";
import Home from "./pages/Home.js";
import Article from "./pages/Article.js";
import Nav from "./components/Nav";
import Mask from "./components/Mask"
import { BrowserRouter, Route } from "react-router-dom";

export default () => {
  return (
    <BrowserRouter>
      <div>
        <Mask />
        <Nav />
        <Route path="/" exact component={Home} />
        <Route path="/article" component={Article} />
      </div>
    </BrowserRouter>
  );
};
