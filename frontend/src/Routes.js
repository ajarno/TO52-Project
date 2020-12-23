import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import App from './App';
import NotFound from './components/error/NotFound';
import Layout from './components/layout/Layout';
import AdDisplayer from './components/ad-display/AdDisplayer';
import NewAd from './components/ad-managment/NewAd';
import AdListManagment from './components/ad-managment/AdListManagment';
import AdEditable from './components/ad-managment/AdEditable';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout exact path='/' component={App}/>
        <Layout exact path='/ads/new-ad' component={NewAd}/>
        <Layout exact path='/ads/my-ads' component={AdListManagment}/>
        <Layout exact path='/ads/edit/:id' component={AdEditable}/>
        <Layout exact path='/ads/:id' component={AdDisplayer}/>
        <Layout component={NotFound}/>
      </Switch>
    </BrowserRouter>
  )
}