import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import LocatiesPage from './components/locaties/LocatiesPage';
import LocatiePage from './components/locaties/LoactiePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="/locatie" component={LocatiesPage}/>
  </Route>
);
