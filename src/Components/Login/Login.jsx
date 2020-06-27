import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, FormText } from 'reactstrap';
import { Container } from 'reactstrap';
import './Login.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from '@fortawesome/free-solid-svg-icons';

import { connect} from 'react-redux'
import {logInRequest} from '../../store/actions/login.action'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isLogin : false
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.userLoginFetch(this.state.email, this.state.password)
       
    }

        render() {
           
            return (
                <React.Fragment>
                    <Container>
                        <Form className="form" onSubmit={this.handleSubmit}>
                        <FormText id="login-icon"><i className="fas fa-lock"><FontAwesomeIcon icon={faLock}/></i></FormText>                            <FormText id="login-header">Log in</FormText>

                            <FormGroup className="email">
                                <Input type="email" name="email" id="exampleEmail" placeholder="email address" value={this.state.email} onChange={this.onChange} required />
                            </FormGroup>

                            <FormGroup className="password" >
                                <Input type="password" name="password" id="examplePassword" placeholder="password " required value={this.state.password} onChange={this.onChange} />
                            </FormGroup>

                            <Button type="submit"  id="btn-login" >Log in</Button>
                        </Form>
                    </Container>

                </React.Fragment>
            )
        }
    }

    const mapDispatchToProps = dispatch => ({
        userLoginFetch: (emai, password) => dispatch(logInRequest(emai, password))
      })
      
      export default connect(null, mapDispatchToProps)(Login);