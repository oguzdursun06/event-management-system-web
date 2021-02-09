import React, { Component } from 'react';
import {Container, Input, Button, Label, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import {MdEventAvailable} from 'react-icons/md'
import {FcCalendar, FcQuestions} from 'react-icons/fc'
import {GrCapacity} from 'react-icons/gr'
import Moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';

class EventForm extends Component {

    emptyItem = {
        name: '',
        start_event_date: null,
        finish_event_date: null,
        capacity: 0,
        category: '',
        personCount: 0,
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: null,
            events: [],
            item: this.emptyItem,
            alertMessage: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleFinishDateChange = this.handleFinishDateChange.bind(this);
    }

    async handleSubmit(event) {
         event.preventDefault();
        const item = this.state.item; 
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
        else if(item.capacity < 1){
            this.setState({alertMessage: "capacityError"});
        }

        else if(item.start_event_date == null || item.finish_event_date == null){
            this.setState({alertMessage: "emptyDateError"});
        }

        else{
        await fetch(`/api/events`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        this.props.history.push("/admin");
         }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({ item });
    }
    
    handleStartDateChange(date) {
        let item = {...this.state.item};
        item.start_event_date = date;
        this.setState({ item });
    }
    handleFinishDateChange(date) {
        let item = {...this.state.item};
        item.finish_event_date = date;
        this.setState({ item });
    }
   

    render() {
        return (
            <div>
                 <div className="landing-grid">
                <Container>
                <br/>
                <br/>
                <br/>
                {this.state.alertMessage.includes("success") ? <SuccessMessage title={this.state.alertMessage}/> : null}
                {this.state.alertMessage.includes("Error") ? <ErrorMessage title={this.state.alertMessage}/> : null}
                <div class="form-style-3">
                <Form onSubmit={this.handleSubmit}>
                   
                <fieldset><legend>Etkinlik oluştur</legend>
                        <Label for="name"> <MdEventAvailable color="blue" /> Etkinlik adı <span className="required">*</span></Label>
                        <input type="text" name="name" id="name" value={this.state.item.name}
                                onChange={this.handleChange} autoComplete="name" />
                 
                        <br/>
                        <Label for="start_event_date"><FcCalendar color="blue"/> Etkinlik başlangıç tarihi <span className="required">*</span></Label>
                        <DatePicker selected={this.state.item.start_event_date} onChange={this.handleStartDateChange}/>
                    
                         <br/>    
                         <Label for="finish_event_date"><FcCalendar color="blue"/> Etkinlik bitiş tarihi <span className="required">*</span></Label>
                        <DatePicker selected={this.state.item.finish_event_date} onChange={this.handleFinishDateChange}/>
                    
                         <br/>  
                        <Label for="capacity"><GrCapacity color="blue"/> Capacity <span className="required">*</span></Label>
                        <input type="text" name="capacity" id="capacity" capacity={this.state.item.capacity}
                                onChange={this.handleChange} autoComplete="name" />

                        <br/>
            
                        <Label for="category"><FcQuestions color="blue"/> Category</Label>
                        
                        <select type="text" name="category" id="category" category={this.state.item.category}
                                onChange={this.handleChange} autoComplete="name">
                            <option>Bir kategori seçiniz</option>
                            <option value="yazilim">Yazılım</option>
                            <option value="sanat">Sanat</option>
                            <option value="egitim">Eğitim</option>  
                            <option value="gezi">Gezi</option>
                            <option value="spor">Spor</option>
                            <option value="eglence">Eğlence</option>
                            <option value="diger">Diğer</option>
                            </select>
                        <br/>
                        
                        <button><div className="example_f" align="center" type="submit"><span>Oluştur</span></div></button>
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

export default EventForm;