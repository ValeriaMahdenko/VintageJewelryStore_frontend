import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Account } from './components/Account';
import { Cart } from './components/Cart';
import { NewItem } from './components/NewItem';
import {ShoppingList} from './components/ShoppingList';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/account' component={Account} />
        <Route path='/cart' component={Cart} />
        <Route path='/add' component={NewItem} />
        <Route path='/shoplist' component={ShoppingList} />


      </Layout>
    );
  }
}
