import React from 'react';
import axios from "axios";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import  MasterLayout from './layout/admin/MasterLayout';
import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          {/* <Route  path="/register" component={Register}/>
          <Route  path="/login" component={Login}/> */}
          <Route path="/login">
            {localStorage.getItem('auth_token') ? <Redirect to='/'/> : <Login/>}
          </Route>
          <Route path="/register">
            {localStorage.getItem('auth_token') ? <Redirect to='/'/> : <Register/>}
          </Route>
          <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props}/>}/>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
