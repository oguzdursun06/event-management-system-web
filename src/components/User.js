import React, { Component } from 'react';
import InformationCard from './InformationCard';
import PopUp from './Popup';
import QRCode from 'qrcode.react';
import moment from 'moment';
import QuestionDialog from './QuestionDialog'

class User extends Component {
    
    deneme = {
        tempMy: [],
        tempOther: [],
    }
    emptyItem = {
        name: "",
        tc: "",
        email:this.props.location.state.information.item.email,
        event: {id: 1},
     
    }
    constructor(props) {
        super(props);
    //    console.log(props.location.state.information.item)
        this.state = {
            MyEvents: [],
            OtherEvents: [],
            Users: [],
            item: this.emptyItem,
            isOpen: false,
            eventName: "",
            
        }
        this.componentDidMount();
        this.bookEvent = this.bookEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    bookEvent(id) {
        this.state.item.event.id = id;
        this.handleSubmit();
    }

    async handleSubmit(event) {
        const item = this.state.item;
        
        await fetch(`/api/users`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }); 
  
        this.componentDidMount();
    }

    async componentDidMount() {
        try {
     const responseEvent = await fetch('/api/events');
        const responseUser = await fetch('/api/users');
        const responseMember = await fetch('/api/members');
        const bodyUser = await responseUser.json();
        const bodyEvent = await responseEvent.json();
        const bodyMember = await responseMember.json();
        var myEvents = [];
        var otherEvents = [];
        let eventCount = 0;
        let otherCount = 0;

        for(var i = 0; i < bodyMember.length; i++){
            if(this.state.item.email == bodyMember[i].email){
                var emptyItem = {
                    name: bodyMember[i].name,
                    tc: bodyMember[i].tc,
                    email:bodyMember[i].email,
                    event: {id: 1},
                }
                this.setState({item: emptyItem});
            }
        }

        for(var i = 0; i < bodyUser.length; i++){
            if(bodyUser[i].tc == this.state.item.tc){
                for(var j = 0; j < bodyEvent.length; j++){
                 if(bodyUser[i].event.id == bodyEvent[j].id && !myEvents.includes(bodyEvent[j])){
                        myEvents[eventCount] = bodyEvent[j];
                        eventCount++;
                }
                }
            }
        }
        for(var i = 0; i < bodyEvent.length; i++){
            if(myEvents.length != 0){
            for(var j = 0 ; j < myEvents.length; j++){
                if(bodyEvent[i].id != myEvents[j].id && !otherEvents.includes(bodyEvent[i]) && !myEvents.includes(bodyEvent[i])){
                    otherEvents[otherCount] = bodyEvent[i];
                    otherCount++;
                } 
            }
            }
            else{
                otherEvents = bodyEvent;
            }
        }
        
        this.setState({MyEvents: myEvents, OtherEvents: otherEvents, Users: bodyUser});
    

        }
        catch(err){
            const responseEvent = await fetch('/api/events');
            const responseMember = await fetch('/api/members');
            const bodyEvent = await responseEvent.json();
            const bodyMember = await responseMember.json();
            for(var i = 0; i < bodyMember.length; i++){
                if(this.state.item.email == bodyMember[i].email){
                    var emptyItem = {
                        name: bodyMember[i].name,
                        tc: bodyMember[i].tc,
                        email:bodyMember[i].email,
                        event: {id: 1},
                    }
                    this.setState({item: emptyItem});
                }
            }
            this.setState({OtherEvents: bodyEvent});
        }
      
        
    }



    render() {
        const {MyEvents,OtherEvents,Users} = this.state;
        var currentDate = moment().format("YYYY-MM-DD");
        return (
            
            <div className = "bgUser">
                <br></br><br></br><br></br>
                <tr>
                    <InformationCard email={this.state.item.email}></InformationCard>
                </tr>

                <tr>
                <p className="userTitle"> Başvurabileceğiniz etkinlikler</p>
                {
                    
                    OtherEvents.map(event => 
                        
                        currentDate > event.start_event_date.split("T")[0] ? null : 
                            
                        <div className="card" id={event.id}>
                            {event.category === "yazilim" ? <div className="card-image-software"></div> : null}
                            {event.category === "sanat" ? <div className="card-image-art"></div> : null}
                            {event.category === "egitim" ? <div className="card-image-education"></div> : null}
                            {event.category === "spor" ? <div className="card-image-sports"></div> : null}
                            {event.category === "gezi" ? <div className="card-image-travel"></div> : null}
                            {event.category === "eglence" ? <div className="card-image-fun"></div> : null}
                            {event.category === "diger" ? <div className="card-image-other"></div> : null}


                            <div className="card-text">
                            <span className="date">{event.start_event_date.split("T")[0].split("-")[2]+"/"+event.start_event_date.split("T")[0].split("-")[1]+"/"+event.start_event_date.split("T")[0].split("-")[0]+" - "+event.finish_event_date.split("T")[0].split("-")[2]+"/"+event.finish_event_date.split("T")[0].split("-")[1]+"/"+event.finish_event_date.split("T")[0].split("-")[0]}</span>
          
                                <h2>{event.name}</h2>
                            </div>
                            {event.capacity > 0 ? 
                            <div className="card-stats">
                                
                                <div className="stat">
                                <div className="value">{event.capacity}</div>
                                <div className="type">kontenjanımız kaldı :)</div>
                          
                                </div>
                            </div>
                            
                            : <div className="card-stats-grey">
                                
                            <div className="stat">
                            <div className="value"></div>
                            <div className="type">Kontenjan yok!</div>
                            </div>
                             </div> }
                             
                             
                             {event.capacity > 0 ? 
                             <div>
                            <br/>
                            <button onClick={(e) => {if (window.confirm('Etkinliğe kayıt olmak istediğinizden emin misiniz?')){ this.bookEvent(event.id); this.setState({isOpen: true, eventName: event.name});}}}><div align="center" className= "square_btn" type="submit"><span>KATIL</span></div></button>
                            </div> : null}
                           
               
                            </div>
                            
                    )
            
                }   
                <PopUp isOpen={this.state.isOpen} onClose={(e)=> this.setState({isOpen:false})}>
                <QRCode size="150" value={this.state.item.name+" ismiyle "+ this.state.eventName+" etkinligine katıldınız!" } />,
                            </PopUp>
                </tr>
              
                <tr>
                

               
                <p className="userTitle"> Başvurduğunuz etkinlikler</p>
                {
        
                    MyEvents.map(event => 
         
                            
                        <div className="card" id={event.id}>
                            {event.category === "yazilim" ? <div className="card-image-software"></div> : null}
                            {event.category === "sanat" ? <div className="card-image-art"></div> : null}
                            {event.category === "egitim" ? <div className="card-image-education"></div> : null}
                            {event.category === "spor" ? <div className="card-image-sports"></div> : null}
                            {event.category === "gezi" ? <div className="card-image-travel"></div> : null}
                            {event.category === "eglence" ? <div className="card-image-fun"></div> : null}
                            {event.category === "diger" ? <div className="card-image-other"></div> : null}


                            <div className="card-text">
                            <span className="date">{event.start_event_date.split("T")[0].split("-")[2]+"/"+event.start_event_date.split("T")[0].split("-")[1]+"/"+event.start_event_date.split("T")[0].split("-")[0]+" - "+event.finish_event_date.split("T")[0].split("-")[2]+"/"+event.finish_event_date.split("T")[0].split("-")[1]+"/"+event.finish_event_date.split("T")[0].split("-")[0]}</span>

                                <h2>{event.name}</h2>
                
                                {currentDate >= event.start_event_date.split("T")[0] && currentDate <= event.finish_event_date.split("T")[0] ? <QuestionDialog name={this.state.item.name} eventId={event.id}/>: null}
                    
                            </div>
                            
                            <div className="card-stats-user">
                                
                            <div className="stat">
                            <div className="value"></div>
                            <div className="type">Bu etkinliğe kayıtlısınız.</div>
                            </div>
                             </div> 
                            
                            </div>
                    )
                    
                }   
                </tr>
              
                <tr>
                <p className="userTitle"> Geçmiş etkinlikler</p>
                 {
                
                OtherEvents.map(event => 
                    currentDate <= event.start_event_date.split("T")[0] ? null : 
                    <div className="card" id={event.id}>
                            {event.category === "yazilim" ? <div className="card-image-software"></div> : null}
                            {event.category === "sanat" ? <div className="card-image-art"></div> : null}
                            {event.category === "egitim" ? <div className="card-image-education"></div> : null}
                            {event.category === "spor" ? <div className="card-image-sports"></div> : null}
                            {event.category === "gezi" ? <div className="card-image-travel"></div> : null}
                            {event.category === "eglence" ? <div className="card-image-fun"></div> : null}
                            {event.category === "diger" ? <div className="card-image-other"></div> : null}
                            <div className="card-text">
                            <span className="date">{event.start_event_date.split("T")[0].split("-")[2]+"/"+event.start_event_date.split("T")[0].split("-")[1]+"/"+event.start_event_date.split("T")[0].split("-")[0]+" - "+event.finish_event_date.split("T")[0].split("-")[2]+"/"+event.finish_event_date.split("T")[0].split("-")[1]+"/"+event.finish_event_date.split("T")[0].split("-")[0]}</span>

                                <h2>{event.name}</h2>
                            </div>
                            <div className="card-stats-grey">
                                
                            <div className="stat">
                            <div className="value"></div>
                            <div className="type">Bu etkinliğe katılamazsınız.</div>
                            </div>
                             </div>

                     </div>
                )
                

                
            }  
             </tr>
            </div>
        );
    }
}

export default User;