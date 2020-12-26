import React, {useContext} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Redirect,
    Link,
    Navigate
  } from "react-router-dom";
  import { useNavigate, useLocation } from "react-router-dom";
  import { UserContext, UserProvider } from '../UserContext';


const PrivateRoute = ({component: Component, path, ...props }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    if (!user.auth) {
        return <Navigate to='/login'/>
    } else {
        return (
            <Route path={path} element = {<Component />} />
        )
    }

  }

  export { PrivateRoute} ;