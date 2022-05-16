import React, { useState } from "react";
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
import OnlineServicePage from "./components/pages/OnlineServicePage";
import { SiteContext, initialValue } from "./components/atoms/context";
import AdminConfirm from "./components/admin/AdminConfirm";
import { ImageContext, imageValue } from "./components/atoms/imageContext";
import Test from "./components/organisms/test";

const App: React.FC = () => {
  const [detail, setDetail] = useState(initialValue);
  const [image, setImage] = useState(imageValue);

  return (
    <Router>
      <Switch>
        <Route path="/contact" component={ContactPage} exact />
        <Route path="/products" component={ProductPage} exact />
        <Route path="/onlineService" component={OnlineServicePage} exact />
        <Route path="/:param" component={HomePage} exact />
        <Route path="/" component={HomePage} exact />
        {/*管理画面*/}
        <AuthUserContextProvider>
          <SiteContext.Provider value={{ detail, setDetail }}>
            <ImageContext.Provider value={{ image, setImage }}>
              <Route path="/admin/login" component={Login} exact />
              <PrivateRoute path="/admin/home" component={AdminPage} exact />

              <PrivateRoute
                path="/admin/adminSiteAdd"
                component={AdminSiteAdd}
                exact
              />
              <PrivateRoute
                path="/admin/adminDetail"
                component={AdminDetail}
                exact
              />
              <PrivateRoute
                path="/admin/adminConfirm"
                component={AdminConfirm}
                exact
              />
            </ImageContext.Provider>
          </SiteContext.Provider>
          <PrivateRoute path="/admin/test" component={Test} exact />
        </AuthUserContextProvider>
      </Switch>
    </Router>
  );
};
export default App;
