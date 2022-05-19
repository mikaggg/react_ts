import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./pages/ProductPage/PrivateRoute";
import Login from "./pages/ProductPage/Login";
import ProductPage from "./pages/ProductPage/DesignPage";
import HomePage from "./pages/ProductPage/HomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AuthUserContextProvider from "./contexts/AuthUserContext";
import AdminSiteAdd from "./pages/AdminPage/AdminSiteAdd";
import ContactPage from "./pages/ProductPage/ContactPage";
import AdminDetail from "./pages/AdminPage/AdminDetail";
import OnlineServicePage from "./pages/ProductPage/OnlineServicePage";
import { SiteContext, initialValue } from "./contexts/context";
import AdminConfirm from "./pages/AdminPage/AdminConfirm";
import { ImageContext, imageValue } from "./contexts/imageContext";

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
        </AuthUserContextProvider>
      </Switch>
    </Router>
  );
};
export default App;
