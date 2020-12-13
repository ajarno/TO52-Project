import React, { useState } from "react";
import { Route, Redirect } from "react-router";
import { useEffectOnlyOnce } from "../../api/Utils";
import { isAuthentificated } from "../../api/AuthAPI";

function PrivateRoute({ component: Component, ...rest }) {
  const [isAuth, setIsAuth] = useState(false);

  useEffectOnlyOnce(() => {
    isAuthentificated().then((result) => {
      if (result) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  });
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/auth/sign-in" />
      }
    />
  );
}

export default PrivateRoute;
