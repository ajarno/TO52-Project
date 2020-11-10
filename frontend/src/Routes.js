import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import App from './App';
import NotFound from './components/error/NotFound';
import Layout from './components/layout/Layout';
import AdDisplayer from './components/search/AdDisplayer';
import NewAd from './components/search/NewAd';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout exact path='/' component={App}/>
        <Layout exact path='/ads/new-add' component={NewAd}/>
        <Layout path='/ads/:id' component={AdDisplayer}/>
        <Layout component={NotFound}/>
      </Switch>
    </BrowserRouter>
  )
}