import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/molecules/PrivateRoute";
import Login from "./components/pages/Login";
import ProductPage from "./components/pages/ProductPage";
import HomePage from "./components/pages/HomePage";
import AdminPage from "./components/admin/AdminPage";
import AuthUserContextProvider from "./components/molecules/AuthUserContext";
import AdminSiteAdd from "./components/admin/AdminSiteAdd";
import ContactPage from "./components/pages/ContactPage";
import AdminDetail from "./components/admin/AdminDetail";
//import { siteDataReducer, initialState } from "./components/atoms/context";
import Test from "./components/organisms/test";

/*const PrivateRoute: React.FC<RouteProps> = ({...props}) => {
  const { userCredential, setUserCredential } = useAuthUserContext();
  
  if (userCredential) {
    return <Route {...props}/>
  } else {
    console.log(`管理者はログインしないと${props.path}へアクセスできません`);
    return (
    <AuthUserContextProvider>
      <Route exact path="/login" component={Login}/>
    </AuthUserContextProvider>
    );
  }
}*/

const App: React.FC = () => {
  //const [state, dispatch] = useReducer(siteDataReducer, initialState);

  return (
    <Router>
      <Switch>
        <Route path="/contact" component={ContactPage} exact/>
        {/*<Route path="/products" component={ProductPage} exact />*/}
        <Route path="/:param" component={HomePage} exact />
        <Route path="/" component={HomePage} exact />
        
        
        
        {/*管理画面*/}
        <AuthUserContextProvider>
          <Route path="/admin/login" component={Login} exact/>
          <PrivateRoute path="/admin/home" component={AdminPage} exact />
          <PrivateRoute path="/admin/adminSiteAdd" component={AdminSiteAdd} exact />
          
          <PrivateRoute path="/admin/adminDetail" component={AdminDetail} exact />
          
          <PrivateRoute path="/admin/test" component={Test} exact />
        </AuthUserContextProvider>
      </Switch>
    </Router>
  )
}
export default App;