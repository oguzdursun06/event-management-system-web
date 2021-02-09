import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Admin from './components/Admin';
import User from './components/User';
import EventForm from './components/EventForm';
import EditEvent from './components/EditEvent';
import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Footer from './components/Footer';
import Error from './components/Error';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
class App extends Component {
    render() {
        return (
            <Router>
            <Header />
                <Switch>
                    <Route path='/' exact={true} component={Home} />
                    <Route path='/signUp' exact={true} component={SignUp} />
                    <Route path='/signIn' exact={true} component={SignIn} />
                    <Route path='/user' exact={true} component={User} />
                    <Route path='/admin' exact={true} component={Admin} />
                    <Route path='/event' exact={true} component={EventForm} />
                    <Route path='/editEvent' exact={true} component={EditEvent} />
                    <Route path='/aboutme' exact={true} component={AboutMe} />
                    <Route component={Error}/>
                </Switch>
                <Footer/>
            </Router>
            
        );
    }
}

export default App;