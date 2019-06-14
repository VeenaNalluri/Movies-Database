import React, { Component } from "react";
import { Row, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './login.sass';
import { isusername, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';
import { userLogin } from "services/auth";
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {},
            errors: {},
            formSubmitted: false,
            isLogin: false,
            history: props.history
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {
        
        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.username)) {
            errors.username = "username can't be blank";
        } 
        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        }  else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        }
        console.log(formData.password)
        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }    
    }

    login = (e) => {
        
        e.preventDefault();

        let errors = this.validateLoginForm();
        const { formData } = this.state;
        const username = formData.username
        const password = formData.password
        const obj = {
            username,
            password
        };
        console.log("object", obj)
        userLogin(obj).then(e => {
            if (e.status === 200) {
                this.setState({
                    errors: {},
                    isLogin: true,
                    formSubmitted: true
                });  
                console.log("You are successfully signed in...")
                // return (<Link to="/movies" />)
                
                // return <Redirect to="/movies" />;
                // alert("You are successfully signed in...");
                this.state.history.push("/movies")
                //window.location.reload()  
            } else {
                if (e.status === 401) {
                    this.setState({
                        errors: {"password": "unauthorized"},
                        formSubmitted: false
                    });    
                }
                else {
                    console.log("errors", JSON.stringify(e), e)
                    this.setState({
                        errors: e,
                        formSubmitted: true
                    });
                }
            }
        }).catch(err => {
            console.log("catch", err)
        });
    }

    render() {

        const { errors, formSubmitted } = this.state;

        return (
            <div className="Login">
                <Row>
                    <form onSubmit={this.login}>
                        <FormGroup controlId="username" validationState={ formSubmitted ? (errors.username ? 'error' : 'success') : null }>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl type="text" name="username" placeholder="Enter your username" onChange={this.handleInputChange} />
                        { errors.username && 
                            <HelpBlock>{errors.username}</HelpBlock> 
                        }
                        </FormGroup >
                        <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                        { errors.password && 
                            <HelpBlock>{errors.password}</HelpBlock> 
                        }
                        </FormGroup>
                        <Button type="submit" bsStyle="primary">Sign-In</Button>
                    </form>
                </Row>
            </div>
        )
    }
}

export default withRouter(Login);