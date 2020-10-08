import React from 'react';
import { useStore } from '../stores/helpers/UseStore';
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { dataStore: { auth } } = useStore();

  return (
    <Route
      {...rest}
      render={props => {
        if (auth.loggedIn) {
          return <Component {...props} />
        }
        else {
          return <Redirect to={
            {
              pathname: '/login',
              state: {
                from: props.location
              }
            } 
          } />
        }
      }}
    />
  );
}

export default ProtectedRoute;
