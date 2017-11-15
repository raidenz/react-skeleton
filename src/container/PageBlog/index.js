import React, { Component } from 'react';

class PageBlog extends Component {
  render() {
    return (
      <div>
        Blog content
        <Switch>
          <Route path="/blog" component={SinglePost} />
          <Route path="/blog/post" component={SinglePost} />
        </Switch>
      </div>
    );
  }
}

export default PageBlog
