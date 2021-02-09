import React, { Component } from 'react'


class Popup extends Component {
    render() {
        let dialog = (
            <div className="dialogStyles">
            <button className="dialogCloseButtonStyles" onClick={this.props.onClose}>x</button>
            <div>{this.props.children} 
          </div>
          <div>  QR code mail adresinize gönderilmiştir. Etkinlik girişinde göstererek giriş yapabilirsiniz.</div>
        </div>
        
        );

        if(!this.props.isOpen){
            dialog = null;
        }
        return (
            <div>{dialog}</div>
        )
    }
}
 

export default Popup;