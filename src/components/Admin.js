import React, { Component } from 'react';
import Moment from 'react-moment';
import Dialog from './Dialog';
import ApexChart from './ApexChart';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Link} from 'react-router-dom';
import moment from 'moment'; 
class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Events: [],
            Users: [],
            Questions: [],
        }

        this.editEvent = this.editEvent.bind(this);
    }


    async remove(id) {
      
        let response = await fetch(`/api/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        try {
            response = await fetch('/api/events');
            const body = await response.json();
        if(body.httpStatus === "BAD_REQUEST") {
            console.log(body.message);
        } else {
            let updatedEvents = this.state.events.filter(i => i.id !== id);
            this.setState({ events: updatedEvents });
        }
        } catch(e) {
        } 
        this.componentDidMount();
    }

    editEvent(id) {
        window.localStorage.setItem("eventId", id);
        this.props.history.push('/editEvent');
    }


    async componentDidMount() {
        const responseEvent = await fetch('/api/events');
        const responseUser = await fetch('/api/users');
        try {
        const bodyEvent = await responseEvent.json();
        const bodyUser = await responseUser.json();
        this.setState({Events: bodyEvent, Users: bodyUser});
        const responseQuestion = await fetch('/api/questions');
        const bodyQuestion = await responseQuestion.json();
        this.setState({Questions: bodyQuestion});
        }
        catch(err){
            
        }
    }

    render() {
        const {Events,Users,Questions} = this.state;
        var tempDate = new Date();
        var eventList = [];
        var personCount = [];
        var peopleList = [0,0,0,0,0,0,0];
       Events.map((event,i) =>
        eventList[i] = event.name
      );
      Events.map((event,i) =>
        personCount[i] = event.person_count
      );
      Users.map(event =>
        event.applyDay === "Monday" ? peopleList[0] = peopleList[0] + 1 : event.applyDay === "Tuesday" ? peopleList[1] = peopleList[1] + 1 : event.applyDay === "Wednesday" ? peopleList[2] = peopleList[2] + 1 : event.applyDay === "Thursday" ? peopleList[3] = peopleList[3] + 1 : event.applyDay === "Friday" ? peopleList[4] = peopleList[4] + 1 : event.applyDay === "Saturday" ? peopleList[5] = peopleList[5] + 1 : peopleList[6] = peopleList[6] + 1 
    );
        var currentDate = moment().format("YYYY-MM-DD");
 
        return (
            <div className = "bgUser">
                <br/><br/><br/><br/><br/>
                <Link to='/event' className='btn-primary'>YENİ ETKİNLİK OLUŞTUR</Link>
                <tr>
                {
                    
                    Events.map((event,i) =>      
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
                                {currentDate > event.start_event_date.split("T")[0] ? <div> <h5>Bu etkinlik başlangıç tarihi geçtiği için silinemez veya güncellenemez.</h5> 
                                 <Dialog liste={this.state.Users} search={event.id} type="users"/>
                                 <Dialog liste={this.state.Questions} search={event.id} type="questions"/> </div> :
                                 
                                <div>
                                <button className="buttons" onClick={() => this.editEvent(event.id)} ><EditIcon fontSize="large"/></button>
                                 <button className="buttons" onClick={(e) => {if (window.confirm('Silinen etkinliğin geri alınamayacağınızı unutmayınız!\nBu etkinliği silmek istediğinizden emin misiniz?')) this.remove(event.id)}}><DeleteIcon fontSize="large" color="red"/></button>
                                 <br/><br/><br/>
                                 <Dialog liste={this.state.Users} search={event.id} type="users"/>
                                 <Dialog liste={this.state.Questions} search={event.id} type="questions"/>
                                 </div>
                                }
                            </div>


                            
                            
                     
                            </div>

                            
                    )
                   
                    
                }   
                <div className="card-5">
                <ApexChart events = {eventList} people={personCount} title='Etkinliklere başvuran sayısına göre bar-chart'/>
                <br/>
                </div>
                <div className="card-5">
                <ApexChart people={peopleList} title='Etkinliklere başvurulan güne göre bar-chart'/>
                </div>
                </tr>
                <tr>
             </tr>
             
            </div>
            
        );
       
    }
}

export default Admin;