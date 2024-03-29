import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import createBrowserHistory from 'history/createBrowserHistory';

import { Header } from './components/Header/Header';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';

import { AlertProvider } from './components/Alert/context/AlertContext';
import { DarkLightModeProvider } from './components/DarkLightMode/context/DarkLightModeContext';

import { LoaderSpinner } from './components/LoaderSpinner/LoaderSpinner';

import { routes } from './routes';

export const history = createBrowserHistory();

// harmless change

ReactDOM.render(
  <Router history={history}>
    <Switch>
      {routes.map(route => (
        <Route
          key={route.id}
          exact={route.exact}
          path={route.path}
          render={() => (
            <ErrorBoundary fallbackRender={ErrorFallback}>
              <DarkLightModeProvider>
                <AlertProvider>
                  <Suspense fallback={<LoaderSpinner open />}>
                    <Header>{route.render}</Header>
                  </Suspense>
                </AlertProvider>
              </DarkLightModeProvider>
            </ErrorBoundary>
          )}
        />
      ))}
    </Switch>
  </Router>,
  document.getElementById('root'),
);
