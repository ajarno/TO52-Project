import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import App from './App';
import NotFound from './components/error/NotFound';
import Layout from './components/layout/Layout'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout exact path='/' component={App}/>
        <Layout component={NotFound}/>
      </Switch>
    </BrowserRouter>
  )
}