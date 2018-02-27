import React from "react";
import Home from "./pages/Home.js";
import Article from "./pages/Article.js";
import Header from "./components/Header";
import Mask from "./components/Mask"
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { EventEmitter } from 'events';

const event = new EventEmitter()

export default () => {
  return (
    <BrowserRouter>
      <div>
        {/* <Mask /> */}
        <Header event={event}/>
        <Switch>
          <Route path="/" exact component={Home.bind(null, event)}/>
          <Route path="/article/:id" component={Article} />
          <Route path="/about" component={About} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
