import Home from "./pages/Home.js";
import Article from "./pages/Article.js";
import Header from "./components/Header";
import Mask from "./components/Mask"
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { Provider } from 'mobx-react'
import stores from './stores'
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

export default () => {
  return (
    <Provider {...stores}>
      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/article/:id" component={Article} />
            <Route path="/about" component={About} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};
