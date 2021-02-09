import React, { Component } from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import Header from './Header';
class Home extends Component {
    render() {
        return (
            
            <div>    
                 <Header/>
               <Hero>
                <Banner title="HOŞGELDİNİZ..." subtitle="Etkinliklerimize siteye kayıt olarak ulaşabilirsiniz.">
        <Link to='/signIn' className='btn-primary'>Hesaba Giriş Yap</Link>
        <Link to='/signUp' className='btn-primary'>Kayıt ol</Link>
        </Banner>
        </Hero>
        
            </div>
        );
    }
}

export default Home;