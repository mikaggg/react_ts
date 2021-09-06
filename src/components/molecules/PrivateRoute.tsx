import React, { useContext } from "react";
import { Route, RouteProps } from "react-router-dom";
import { AuthUserContext } from "../molecules/AuthUserContext";
import Login from "../pages/Login";

const PrivateRoute: React.FC<RouteProps> = ({ component: RouteComponent, ...options }) => {
    const { userCredential } = useContext(AuthUserContext);
    const component = userCredential ? RouteComponent : Login;

    return <Route {...options} component={component} />
};

export default PrivateRoute;