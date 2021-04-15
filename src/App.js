import React, { Component, useState, useEffect } from 'react';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Provider from './components/Provider'
import User from './components/User'
import Home from './components/Home'


function App() {
    return (
       <Router>
        <body class = "text-center vsc-initialized">
            <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header class ="masthead mb-auto">
                    <div class="inner">
                        <nav class="nav nav-masthead justify-content-center">
                        <h3 class = "masthead-brand px-3">BlockchainVaccine</h3>
                            <Link class = "nav-link" to = "/">Home</Link>
                            <Link class = "nav-link" to = "/provider">Health Provider</Link>
                            <Link class = "nav-link" to = "/user">User</Link>
                        </nav>
                    </div>
                </header>
                <Route exact path = "/" component={Home}/>
                <Route path="/provider" component={Provider} />
                <Route path="/user" component={User} />
            </div>
        </body>
       </Router>
    )
}


export default App;
