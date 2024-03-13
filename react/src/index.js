import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SinglePage from './SinglePage';
import { Helmet } from 'react-helmet';
import List from './List';
import Nav from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Top from './Top';
import './cute.css';
import { Link } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router>
        <Helmet>
          <html lang="en" />
          <title>Caesar</title>
          <meta content="Cuteblog for react" property="og:title" />

          <link
            href="https://mesinkasironline.web.app/img/createwebsiteusingreact.png"
            rel="icon"
            type="image/x-icon"
          />
        </Helmet>
        <Top />
        <div className="container">
          <Nav />
        </div>
        <div>
          <div className="container">
            <div className="row">
              <Route path="/" component={List} exact />
              <Route path="/article/:id" component={SinglePage} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));
