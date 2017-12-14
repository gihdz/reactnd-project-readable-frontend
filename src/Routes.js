import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from './NotFound';
import RootView from './App';
import CustomComponent from './CustomComponent';
import PostView from './containers/PostView';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={RootView} />
      <Route path="/custom" component={CustomComponent} />
      <Route path="/post/:postId" component={PostView} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
