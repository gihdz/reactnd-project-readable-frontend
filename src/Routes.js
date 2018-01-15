import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from './NotFound';
import RootView from './App';
import CustomComponent from './CustomComponent';
import PostView from './containers/PostView';
import PostForm from './containers/PostForm';

const Routes = () => {
  return (
    <Switch>
      <Route path="/custom" component={CustomComponent} />
      <Route path="/post/new/" component={PostForm} />
      <Route path="/post/edit/:postId/" component={PostForm} />
      <Route exact path="/404" component={NotFound} />

      <Route exact path="/:category?" component={RootView} />
      <Route path="/:category/:postId" component={PostView} />
    </Switch>
  );
};

export default Routes;
