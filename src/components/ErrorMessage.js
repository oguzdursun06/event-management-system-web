import React, { Component } from 'react'
import {MdError} from 'react-icons/md'
export default class ErrorMessage extends Component {

    render() {
        return (
           
            <div className="alert alert-danger" role="alert">
                 <MdError fontSize="30px"/>
                {this.props.title === "nameError" ? "İsim en az 2 harfli olmalıdır!" : null}
                {this.props.title === "surnameError" ? "Soyisim en az 2 harfli olmalıdır!" : null}
                {this.props.title === "ageError" ? "Etkinliğe başvurmak için en az 18 yaşında olmalısınız!" : null}
                {this.props.title === "emailError" ? "Lütfen geçerli formatta bir mail adresi giriniz!" : null}
                {this.props.title === "tcKimlikError" ? "Lütfen geçerli formatta bir tc kimlik numarası giriniz!" : null}
                {this.props.title === "typeError" ? "Lütfen geçerli tipte giriş yapınız!" : null}   
                {this.props.title === "passwordError" ? "Şifreniz en az 6 karakterden oluşmalıdır!" : null}
                {this.props.title === "alreadySignUpError" ? "Bu kimlik numarası veya mail adresi daha önce kullanıldı.": null}
                {this.props.title === "startDateError" ? "Geçmiş bir tarihe etkinlik başlangıç tarihi atanamaz.": null}
                {this.props.title === "finishDateError" ? "Geçmiş bir tarihe etkinlik bitiş tarihi atanamaz.": null}
                {this.props.title === "dateError" ? "Etkinlik başlangıç tarihi etkinlik bitiş tarihinden sonra olamaz.": null}
                {this.props.title === "emptyDateError" ? "Tarihler boş bırakılamaz.": null}
                {this.props.title === "capacityError" ? "Etkinlik kapasitesi en az 1 olmalıdır.": null}
                {this.props.title === "signInError" ? "Hatalı giriş": null}
            </div>
        )
    }
}
