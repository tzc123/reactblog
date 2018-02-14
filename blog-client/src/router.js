import React from "react";
import Home from "./pages/Home.js";
import Article from "./pages/Article.js";
import Header from "./components/Header";
import Mask from "./components/Mask"
import { BrowserRouter, Route } from "react-router-dom";

export default () => {
  return (
    <BrowserRouter>
      <div>
        <Mask />
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/article/:id" component={Article} />
      </div>
    </BrowserRouter>
  );
};
