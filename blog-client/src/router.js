import React from "react";
import Home from "./pages/Home.js";
import Article from "./pages/Article.js";
import Header from "./components/Header";
import Mask from "./components/Mask"
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

export default () => {
  return (
    <BrowserRouter>
      <div>
        {/* <Mask /> */}
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/article/:id" component={Article} />
        <Route path="/about" component={About} />
        <Route path='/404' component={NotFound} />
        <Redirect from='*' to='/404' />
      </div>
    </BrowserRouter>
  );
};
