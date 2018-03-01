import Home from "./pages/Home.js";
import Article from "./pages/Article.js";
import Header from "./components/Header";
import Mask from "./components/Mask"
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { Provider } from 'mobx-react';
import { Route, Redirect, Switch, StaticRouter } from "react-router-dom";

const ReactDOMServer = require('react-dom/server')

export default function (url, context, store) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <Provider {...store}>
        <div>
          {/* <Mask /> */}
          <Header/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/article/:id" component={Article} />
            <Route path="/about" component={About} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Provider>
    </StaticRouter>
  )
}
