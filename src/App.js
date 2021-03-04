import React, { Component } from 'react'
import './App.css';
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from 'react-router-dom';
import Header from './Componets/Header.js';
import PrivateRoute from './Componets/PrivateRouter.js';
import Home from './Home/HomePage.js';
import SignUpPage from './AuthPages/SignUpPage.js';
import LoginPage from './AuthPages/LoginPage.js';
import CharacterSearchPage from './SearchPage/SearchPage.js';
import { getUserFromLS, putUserInLS } from './LSutils.js';
import FavoritePage from './FavPage/FavoritePage.js';

export default class App extends Component {
    state = {
      user: getUserFromLS()
    }

    handleUserChange = (user) => {
      this.setState({ user })
      
      putUserInLS(user);
    }

    handleLogout = () => {
      this.handleUserChange();
    }

    render() {
      const { user } = this.state;
        return (
            <div>
                <Router>
                  <Header
                    user={this.state.user}
                    handleLogout={this.handleLogout}/>
                    <Switch>
                        <Route 
                            path="/" 
                            exact
                            render={(routerProps) => <Home {...routerProps} />} 
                        />
                        <Route 
                            path="/search" 
                            exact
                            render={(routerProps) => <CharacterSearchPage 
                              {...routerProps} 
                              user={this.state.user} />} 
                        />
                        <PrivateRoute 
                            path="/favorites" 
                            exact
                            token={user && user.token}
                            render={(routerProps) => 
                              <FavoritePage 
                                user={this.state.user}
                                {...routerProps} 
                              />} 
                        />
                        <Route 
                          path="/login" 
                          exact
                          render={(routerProps) => 
                            <LoginPage 
                              handleUserChange={this.handleUserChange}
                              {...routerProps} 
                            />} 
                        />
                        <Route 
                          path="/signup" 
                          exact
                          render={(routerProps) => 
                            <SignUpPage 
                              handleUserChange={this.handleUserChange}
                              {...routerProps} 
                            />} 
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}