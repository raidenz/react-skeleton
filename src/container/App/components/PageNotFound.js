import React from 'react';

const PageNotFound = (props) => (
  <div>
    404 content
    <div>{props.location.pathname}</div>
  </div>
)

export default PageNotFound
