import React, { Component, useState, useEffect } from 'react';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Provider from './components/Provider'
import User from './components/User'


function App() {
    return (
        <div className="App">
          <Router>
            <div>
              <ul>
                <li>
                  <Link to="/provider">Health Provider</Link>
                </li>
                <li>
                  <Link to="/user">Users</Link>
                </li>
              </ul>
              <Route path="/about" component={Provider} />
              <Route path="/users" component={User} />
            </div>
          </Router>
        </div>
    );
}


export default App;
