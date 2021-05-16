
import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute({ children, authUser, ...rest }) {
  return authUser === null || authUser === undefined
    ? <Redirect to={{
      pathname: "/login",
      state: { from: rest.location.pathname }
    }} /> : (
      <Route {...rest} render={() => {
        return children
      }} />
    )
}