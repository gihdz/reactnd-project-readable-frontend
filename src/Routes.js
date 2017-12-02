import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from './NotFound';
import App from './App';
import CustomComponent from './CustomComponent';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/custom" component={CustomComponent} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
