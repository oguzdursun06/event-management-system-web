import React, { Component } from 'react';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import me from '../images/foto.jpg';
import { Grid, Cell } from 'react-mdl';
import Hero from './Hero';
import { FaFacebook } from 'react-icons/fa';
export default class AboutMe extends Component {
    render() {
        return (
          <Hero>
            <div style={{width: '100%', margin: 'auto'}}>
        <Grid className="aboutMe">
          <Cell col={12}>
            <img
              src={me}
              alt="avatar"
              className="avatar-img"
              />

            <div className="banner-text">
              <h3>Merhaba, ben Oğuzhan Dursun!</h3>
              <h5>Ankara'da yaşıyorum, Ankaralıyım ve 22 yaşındayım. Hacettepe Üniversitesi Bilgisayar Mühendisliği bölümü 3.sınıf öğrencisiyim. Arkadaşlarımla vakit geçirmeyi, futbol oynamayı ve gezmeyi severim.</h5>
              <h6>GPA: 3.53/4.00</h6>
              <h6><u>Yetenekler</u></h6>
            <hr/> 
          <p>İşletim Sistemleri: Windows | Linux</p>
          <p>Programlama Dilleri: Python | Java | C | C# | Dart | JavaScript</p>
          <p>Backend Teknolojileri: Spring Boot</p>
          <p>Frontend Teknolojileri: HTML/CSS | Bootstrap | React </p>
          <p>Veritabanı: PostgreSQL </p>
            </div>
          </Cell>
        </Grid>
      </div>
      </Hero>
        )
    }
}
