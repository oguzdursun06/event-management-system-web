import React, { Component } from 'react'
import {MdDone} from 'react-icons/md'
export default class SuccessMessage extends Component {
    render() {
        return (
            <div className="alert alert-success" role="alert">
                <MdDone fontSize="30px"/>
                {this.props.title === "success" ? "Etkinliğe başarıyla kayıt olundu!" : null}
                {this.props.title === "successSignUp" ? <a href="/signIn">Siteye üye oldunuz. Buradan hesabınıza giriş yapabilirsiniz.</a> : null}
                {this.props.title === "successCreate" ? "Etkinlik başarıyla oluşturuldu." : null}
            </div>
        )   
    }
}
