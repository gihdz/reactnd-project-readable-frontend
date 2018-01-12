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
      <Route exact path="/:category?" component={RootView} />
      <Route path="/custom" component={CustomComponent} />
      <Route path="/viewPost/:postId" component={PostView} />
      <Route path="/post/new/" component={PostForm} />
      <Route path="/post/edit/:postId" component={PostForm} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
