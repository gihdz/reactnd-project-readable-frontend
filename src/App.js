import React from 'react';

import Categories from './containers/DdlCategories';
import Posts from './containers/Posts';
class RootView extends React.Component {
  render() {
    return (
      <div>
        <Categories />
        <Posts />
      </div>
    );
  }
}

export default RootView;
