
import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute ({ children, authUser, ...rest }) {
    return authUser === null || authUser === undefined
    ? <Redirect to='/login' /> : (
      <Route {...rest} render={() => {
        return children
      }} />
    )
  }