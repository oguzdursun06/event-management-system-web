import React, { Component } from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import { FaLinkedinIn, FaInstagramSquare, FaFacebook} from 'react-icons/fa';
export default class Navbar extends Component {
    render() {
        return (
           
            <footer className="footer-distributed">

			<div className="footer-left">

				<h3>Etkinlik<span>Yönetim</span></h3>

				<p className="footer-links">
					<a href="/" className="link-1">Ana Sayfa</a>	
					<a href="/signIn">Etkinliklere katıl</a>	
					<a href="/signUp">Üye ol</a>
                    <a href="/aboutMe">Proje sahibi hakkında</a>	
					<a href="/admin">Admin girişi</a>	
				</p>

				<p className="footer-company-name">Etkinlik Yönetim Sistemi © 2020</p>
			</div>

			<div className="footer-center">

				<div>
					<HomeIcon/>
					<p><span>Yayla Mahallesi Bağcı Caddesi 22/11</span> Etlik,ANKARA</p>
				</div>

				<div>
                        <PhoneIcon></PhoneIcon>
					<p>0554 229 19 19</p>
				</div>

				<div>
                        <MailOutlineIcon/>
					<p>oguzdursun06@hotmail.com</p>
				</div>

			</div>

			<div className="footer-right">

				<p className="footer-company-about">
					<span>Hakkımda</span>
					Hacettepe Üniversitesi Bilgisayar Mühendisliği bölümünde 3.sınıf öğrencisiyim. Ankara'da yaşıyorum, sosyal medya hesaplarım aşağıda bulunuyor.
				</p>

				<div className="footer-icons">

                    <a href="https://tr.linkedin.com/in/oğuzhan-dursun-7556301b3"><FaLinkedinIn/></a>
                    <a href="https://www.instagram.com/oguzhandursun10/"><FaInstagramSquare/></a>
                    <a href="https://tr-tr.facebook.com/oguzhan.dursun.121"><FaFacebook/></a>
				</div>

			</div>

		</footer>
        );
    }
}

