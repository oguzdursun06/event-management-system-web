import React, { Component } from 'react';
import { Container, Input, Button, Label, Form} from 'reactstrap';
import { Link } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { FaUserAlt,FaUserCircle } from 'react-icons/fa';
import {GrMail} from 'react-icons/gr'
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';

class SignUp extends Component {

    emptyItem = {
        name: '',
        tc: '',
        password: '',
        email: '',
    }

    constructor(props) {
        super(props);
        this.state = {

            item: this.emptyItem,
            alertMessage: "",
            members: []

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    

    async handleSubmit(event) {
        event.preventDefault();
        const item = this.state.item;
          
        var control = 0;
    
        this.state.members.map((member,i) =>
        this.state.members[i].tc === item.tc || this.state.members[i].email === item.email ? control = 1 : null
      );
      var checkTcNum = function(value) {
        value = value.toString();
        var isEleven = /^[0-9]{11}$/.test(value);
        var totalX = 0;
        for (var i = 0; i < 10; i++) {
          totalX += Number(value.substr(i, 1));
        }
        var isRuleX = totalX % 10 == value.substr(10,1);
        var totalY1 = 0;
        var totalY2 = 0;
        for (var i = 0; i < 10; i+=2) {
          totalY1 += Number(value.substr(i, 1));
        }
        for (var i = 1; i < 10; i+=2) {
          totalY2 += Number(value.substr(i, 1));
        }
        var isRuleY = ((totalY1 * 7) - totalY2) % 10 == value.substr(9,0);
        return isEleven && isRuleX && isRuleY;
      };
      var validator = require("email-validator");
        if(item.name.length < 2){
            this.setState({alertMessage: "nameError"});
        }
        else if(validator.validate(item.email) == false){
            this.setState({alertMessage: "emailError"});
        }
        else if(item.password.length < 5){
            this.setState({alertMessage: "passwordError"});
        }
        else if(checkTcNum(item.tc) == false){
            this.setState({alertMessage: "tcKimlikError"});
        }
        else if(control === 1){
            this.setState({alertMessage: "alreadySignUpError"});
        
    }     

        else{
        await fetch(`/api/members`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }); 
    

        this.setState({alertMessage: "successSignUp"});
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
    async componentDidMount() {
        const response = await fetch('/api/members');
        try {
        const body = await response.json();
        this.setState({members: body});
        }
        catch(err){
                
        }
    }

    render() {
        return (
            <div className="landing-grid">
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                {this.state.alertMessage.includes("success") ? <SuccessMessage title={this.state.alertMessage}/> : null}
                {this.state.alertMessage.includes("Error") ? <ErrorMessage title={this.state.alertMessage}/> : null}
                <div class="form-style-3">
                <Form onSubmit={this.handleSubmit}>
                   
                <fieldset><legend>Kayıt Alanı</legend>
                        <Label for="name"> <FaUserAlt color="blue"/> Name and Surname <span className="required">*</span></Label>
                        <Input type="text" name="name" id="name"
                            onChange={this.handleChange} autoComplete="name" />
                 
                        <br/>
                       
        
                        <br/>
                        <Label for="tc"><GrMail color="blue"/> Tc Kimlik No <span className="required">*</span></Label>
                        <Input type="text" name="tc" id="tc" 
                            onChange={this.handleChange} />
                        <br/>
                    
                        <Label for="email"><GrMail color="blue"/> Email <span className="required">*</span></Label>
                        <Input type="text" name="email" id="email" 
                            onChange={this.handleChange} />
                        <br/>
                        <Label for="password"><FaUserCircle color="blue"/> password <span className="required">*</span></Label>
                        <Input type="password" name="password" id="password" 
                            onChange={this.handleChange} autoComplete="name" />
               
                         <br/>   
                        <button><div className="example_f" align="center" type="submit"><span>Katıl</span></div></button>
                        <Button color="white" tag={Link} to="/">Cancel</Button>
                        
                    </fieldset>

                </Form>
                </div>
            </Container>
            </div>
        );
    }
}

export default SignUp;