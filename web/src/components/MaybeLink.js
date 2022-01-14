import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function MaybeLink({ children, to }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  if (match) {
    return children;
  }

  return <Link to={to}>{children}</Link>;
}

export default MaybeLink;
