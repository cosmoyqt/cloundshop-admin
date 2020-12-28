import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import  './assets/css/App.css';
import { BrowserRouter as Router ,Switch, Route,Redirect} from 'react-router-dom';
import { mainRoutes } from './routes'
ReactDOM.render(
  <Router>
      <Switch>
        <Route path="/admin" render={routeProps => <App {...routeProps} />} />
        {mainRoutes.map(res => {
          return <Route key={res.path} {...res} />
        })}
        <Redirect to='/admin' from="/" />
        <Redirect to='/404' />
  </Switch>
  </Router>,
  document.getElementById('root')
);
