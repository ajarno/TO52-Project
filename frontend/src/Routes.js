import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import App from './App';
import NotFound from './components/error/NotFound';
import Layout from './components/layout/Layout';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AdDisplayer from './components/search/AdDisplayer';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout exact path='/' component={App}/>
        <Layout path='/ads/:id' component={AdDisplayer}/>
        <Layout path='/auth/sign-in' component={SignIn}/>
        <Layout path='/auth/sign-up' component={SignUp}/>
        <Layout component={NotFound}/>
      </Switch>
    </BrowserRouter>
  )
}