import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, NavLink, Redirect } from 'react-router-dom';
import Locations from '../locations';
import Categories from '../categories';

const App = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>My Locations</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
    <main>
      <Route exact path="/" render={() => <Redirect to="/locations" />} />
      <Route exact path="/locations" component={Locations} />
      <Route exact path="/categories" component={Categories} />
    </main>
    <footer className="row center">
      <NavLink to="/locations" activeClassName="active">
        Locations
      </NavLink>
      <NavLink to="/categories" activeClassName="active">
        Categories
      </NavLink>
    </footer>
  </div>
);

export default App;
