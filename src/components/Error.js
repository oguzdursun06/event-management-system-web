import React, { Component } from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
class Home extends Component {
    render() {
        return (
            
            <div>    
               <Hero>
                <Banner title="404 HATALI SAYFA" subtitle="Geçerli bir sayfa için aşağıdan ana sayfaya dönebilirsiniz.">
        <Link to='/' className='btn-primary'>HOME</Link>
        </Banner>
        </Hero>
        
            </div>
        );
    }
}

export default Home;