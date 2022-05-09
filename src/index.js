import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Header } from './components/Header/Header';
import { routes } from './routes';

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      {routes.map(route => (
        <Route key={route.id} exact={route.exact} path={route.path} render={() => <Header>{route.render}</Header>} />
      ))}
    </Switch>
  </Router>,
  document.getElementById('root'),
);
