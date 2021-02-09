import React, { Component } from 'react';
import { Container, Input, Button, Label, Form} from 'reactstrap';
import { Link } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { FaUserAlt,FaUserCircle } from 'react-icons/fa';
import {GrMail} from 'react-icons/gr'

import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';
import User from './User';

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
         this.state.members[i].password === item.password && this.state.members[i].email === item.email ? control = 1 : null
      );
        if(control === 0){
            this.setState({alertMessage: "signInError"});
        }

        else{
            this.props.history.push('/user', { information: {item} });
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
                {this.state.alertMessage.includes("success") ? <SuccessMessage title={this.state.alertMessage}/> : null}
                {this.state.alertMessage.includes("Error") ? <ErrorMessage title={this.state.alertMessage}/> : null}
                <div class="form-style-3">
                <Form onSubmit={this.handleSubmit}>
                   
                <fieldset><legend>Üyelik Giriş</legend>
                       
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