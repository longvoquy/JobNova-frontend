// const useProtectRoute = ()=>{
//     const token = localStorage.getItem("token");
//     if (token != null) {
//       window.location.replace("/")
//     }
// }
// export default useProtectRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const publicPages = ['/login', '/En-login', '/signup', '/En-signup', '/reset-password', '/En-reset-password', '/job-categories', '/job-grid-two', '/job-list-one','/aboutus'];

  if (!token && !publicPages.includes(rest.path)) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
