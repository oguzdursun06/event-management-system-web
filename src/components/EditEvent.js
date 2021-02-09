import React, { Component } from 'react';
import { Container, Input, Button, Label, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import {MdEventAvailable} from 'react-icons/md'
import {FcCalendar, FcQuestions} from 'react-icons/fc'
import Moment from 'moment';
import Header from './Header';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';
class EditEvent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            name: '',
            start_event_date: null,
            finish_event_date: null,
            capacity: 0,
            category: "",
            person_count: 0,
            alertMessage: "",
        }
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleFinishDateChange = this.handleFinishDateChange.bind(this);
        this.loadEvent = this.loadEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const item = this.state;
        var currentDate = Moment().format("YYYY-MM-DD");
        if(item.name.length < 2){
            this.setState({alertMessage: "nameError"});
        }
       
        else if(currentDate > Moment(item.start_event_date,"llll").format('YYYY-MM-DD')){
            this.setState({alertMessage: "startDateError"});
        }

        else if(currentDate > Moment(item.finish_event_date,"llll").format('YYYY-MM-DD')){
            this.setState({alertMessage: "finishDateError"});
        }
        else if( Moment(item.start_event_date,"llll").format('YYYY-MM-DD') > Moment(item.finish_event_date,"llll").format('YYYY-MM-DD')){
            this.setState({alertMessage: "dateError"});
        }
        else if(item.start_event_date == null || item.finish_event_date == null){
            this.setState({alertMessage: "emptyDateError"});
        }
     

        else{
            await fetch('/api/event/'+ this.state.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
            
            this.props.history.push("/admin");
        }

    }


        

    componentDidMount() {
        this.loadEvent();
    }

    handleStartDateChange(date) {
        this.setState({ start_event_date: date });
    }

    handleFinishDateChange(date) {
        this.setState({ finish_event_date: date });
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state};
        item[name] = value; 
        this.setState({ name: item[name] });
    }
    async loadEvent() {
        const response = await fetch('/api/event/' + window.localStorage.getItem("eventId"));
        try{
        const event = await response.json();
        this.setState({
            id: event.id,
            category: event.category,
            capacity: event.capacity,
            person_count: event.person_count
        });
        }
        catch(err){

        }
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {

        return (
            <div>
                <div className="landing-grid">
                <Header />
                <Container>
                <br/>
                <br/>
                <br/>
                {this.state.alertMessage.includes("success") ? <SuccessMessage title={this.state.alertMessage}/> : null}
                {this.state.alertMessage.includes("Error") ? <ErrorMessage title={this.state.alertMessage}/> : null}
                <div class="form-style-3">
                <Form onSubmit={this.handleSubmit}>
                   
                <fieldset><legend>Etkinlik düzenle</legend>
                        <Label for="name"> <MdEventAvailable color="blue" /> Etkinlik adı <span className="required">*</span></Label>
                        <input type="text" name="name" id="name" value={this.state.name}
                                onChange={this.handleChange} autoComplete="name" />
                 
                        <br/>
                        <Label for="event_date"><FcCalendar color="blue"/> Etkinlik başlangıç tarihi <span className="required">*</span></Label>
                        <DatePicker selected={this.state.start_event_date} onChange={this.handleStartDateChange}/>
               
                         <br/>    
                         <Label for="event_date"><FcCalendar color="blue"/> Etkinlik bitiş tarihi <span className="required">*</span></Label>
                        <DatePicker selected={this.state.finish_event_date} onChange={this.handleFinishDateChange}/>
               
                         <br/>    
                       
                        <button><div className="example_f" align="center" type="submit"><span>Değiştir</span></div></button>
                        <Button color="white" tag={Link} to="/admin">Cancel</Button>

                        
                    </fieldset>

                </Form>
                </div>
            </Container>
            </div>
                
            </div>
        );
    }
}

export default EditEvent;