import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/logo.png';
export default class Header extends Component {
    render() {
        return (
           
            <nav className="navbar">
                <div className="nav-center">
                <div className="nav-header"></div>
                <Link to="/"><img src={logo} alt="Beach Resort"/></Link>
                <ul className="nav-links">
                <li>
                    <Link to="/">Ana Sayfa</Link>
                </li>
                <li>
                    <Link to="/signIn">  Giriş Yap </Link>
                </li>
                <li>
                    <Link to="/signUp">  Kayıt ol  </Link>
                </li>
                <li>
                    <Link to="/admin">  Admin Girişi </Link>
                </li>
                <li>
                    <Link to="/aboutme">  About ME  </Link>
                </li>

                </ul>   
                <Link to="/"><img src={logo} alt="Beach Resort"/></Link>
                </div>
            </nav>  
        );
    }
}

