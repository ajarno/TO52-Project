import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import App from "./App";
import NotFound from "./components/error/NotFound";
import Layout from "./components/layout/Layout";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AdDisplayer from "./components/ad-display/AdDisplayer";
import NewAd from "./components/ad-managment/NewAd";
import AdListManagment from "./components/ad-managment/AdListManagment";
import AdEditable from "./components/ad-managment/AdEditable";
import Activate from "./components/auth/Activate";
import ConfirmActivation from "./components/auth/ConfirmActivation";
import ResetPassword from "./components/auth/ResetPassword";
import ResetPasswordConfirm from "./components/auth/ResetPasswordConfirm";
import Account from "./components/account/index";
import Chat from "./components/chat/Chat";
import PrivateRoute from "./components/layout/PrivateRoute";
// import PrivateRoute from "./shared/components/PrivateRoute";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout exact path="/" component={App} />
        <PrivateRoute exact path="/chat/" component={Chat} />
        <PrivateRoute exact path="/ads/new-ad" component={NewAd} />
        <PrivateRoute exact path="/ads/my-ads" component={AdListManagment} />
        <PrivateRoute exact path="/ads/edit/:id" component={AdEditable} />
        <Layout exact path="/ads/:id" component={AdDisplayer} />
        <Layout exact path="/auth/sign-in" component={SignIn} />
        <Layout exact path="/auth/sign-up" component={SignUp} />
        <Layout exact path="/auth/activate" component={Activate} />
        <Layout
          exact
          path="/auth/confirm-activation"
          component={ConfirmActivation}
        />
        <Layout exact path="/auth/lost-password" component={ResetPassword} />
        <Layout
          exact
          path="/auth/new-password/:uid/:token/"
          component={ResetPasswordConfirm}
        />
        <PrivateRoute exact path="/account" component={Account} />
        <Layout component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
