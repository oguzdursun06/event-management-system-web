import React, { Component } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import {Link} from 'react-router-dom';
// ... component class
export default class Flip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      name: '',
      tc: '',
  }
  }

  async componentDidMount() {
 
    const responseMember = await fetch('/api/members');


    const bodyMember = await responseMember.json();


    for(var i = 0; i < bodyMember.length; i++){
        if(this.state.email == bodyMember[i].email){
            var emptyItem = {
                name: bodyMember[i].name,
                tc: bodyMember[i].tc,
                email:bodyMember[i].email,
                event: {id: 1},
            }
            this.setState({name: emptyItem.name, tc: emptyItem.tc});
        }
    }

  }

render() {
  return(
  // .. returnsadasd
  <Flippy
    flipOnHover={false} // default false
    flipOnClick={true} // default false
    flipDirection="horizontal" // horizontal or vertical
    ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
    // if you pass isFlipped prop component will be controlled component.
    // and other props, which will go to div
    style={{ width: '400px', height: '400px' }} /// these are optional style, it is not necessary
  >
    <FrontSide

   class="container_user">
        <header>
          <div className="bio">
            <img src="data:image/jpeg;base64,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" alt="background" width="800px" height="200px" className="bg"/>
            <div className="desc">
              <h3>@Etkinlik Yönetim Sistemi</h3>
              <p>Bizi tercih ettiğiniz için teşekkürler. Kayıtlı olduğunuz etkinlikler, geçmişte olmuş etkinlikler ve kayıt olabileceğiniz tüm etkinliklere buradan ulaşabilirsiniz.</p>
            </div>
          </div>
          
          <div className="avatarcontainer">
            <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" alt="avatar" className="avatar"/>
            <div className="hover">
                <div className="icon-twitter"></div>
            </div>
          </div>
    
    
        </header>
    
        <div className="content">
          <h6>Hoşgeldiniz {this.state.name}</h6>
          <div className="data">
            <ul>
         
              <li>
                Kayıtlı email
                <span>{this.state.email}</span>
              </li>
              <li>
                Kayıtlı Tc
                <span>{this.state.tc}</span>
              </li>
            </ul>
          </div>
    
          <div className="follow"> <div className="icon-twitter" ></div><Link to='/'>HESAPTAN ÇIKIŞ YAP</Link></div>
        </div>
    
    </FrontSide>
  </Flippy>
  )
}
}