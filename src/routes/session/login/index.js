/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';

// components
import { SessionSlider } from 'Components/Widgets';

// app config
import AppConfig from 'Constants/AppConfig';

// redux action
import {
  userSignIn
} from 'Actions';

class Signin extends Component {
   constructor(props) {
     super(props) 
     this.state={
      email: '',
      password: '',
      errEmail:'',
      errPassword:''
     }
   }
  



  onUserLogin = e => { 
    let self= this;
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		 if(!self.state.email && !self.state.password){
			self.setState({
				errEmail:'Please Enter Email Address.',
				errPassword:'Please Enter Password.'
			})
		} else if(!self.state.email) {
			self.setState({
				errEmail:'Please Enter Email Address.',
				errPassword:''
			})
		} else if(!self.state.password) {
			self.setState({
				errEmail:'',
				errPassword:'Please Enter Password.'
			})
		} else if(self.state.email && reg.test(self.state.email) == false)
    {
      self.setState({
				errEmail:'Please Enter Valid Email Address.',
				errPassword:''
			})
		} 
		 else if(self.state.email && self.state.password){
       let data ={
        email:self.state.email,
				 password:self.state.password
			 }
			self.props.userSignIn(data, self.props.history);
		}
	
  }

  isFormSubmit() {
    const {email,password} = this.state;

    return email.length>0 && password.length>0;
  }

  /**
   * On User Sign Up
   */
  onUserSignUp() {
    this.props.history.push('/signup');
  }

  render() {
    const { email, password } = this.state;
    const { loading } = this.props;
    return (
      <QueueAnim type="bottom" duration={2000}>
      <div className="rct-session-wrapper">
        {loading &&
          <LinearProgress />
        }
        
        <div className="session-inner-wrapper">
          <div className="container">
            <div className="row row-eq-height">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="session-body text-center vertical-form shadow">
                  <div className="session-head mb-30">
                  <img src={require('Assets/img/logo.png')} className="img-fluid" alt="site-logo"  />
                  </div>
                  <Form>
                    <FormGroup className="has-wrapper">
                      <Input
                        type="mail"
                        value={email}
                        name="user-mail"
                        id="user-mail"
                        className="has-input input-lg"
                        placeholder="Enter Email Address"
                        onChange={(event) => this.setState({ email: event.target.value,errEmail:'' })}
                      />
                      <span className="has-icon"><i className="ti-email"></i></span>
                      <span style={{color:"red"}}>{this.state.errEmail}</span>
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                      <Input
                        value={password}
                        type="Password"
                        name="user-pwd"
                        id="pwd"
                        className="has-input input-lg"
                        placeholder="Password"
                        onChange={(event) => this.setState({ password: event.target.value,errPassword:'' })}
                      />
                      <span className="has-icon"><i className="ti-lock"></i></span>
                      <span style={{color:"red"}}>{this.state.errPassword}</span>
                    </FormGroup>
                    <FormGroup className="mb-15">
                      <Button
                        className="btn-block text-white w-100 bg-green"
                        variant="raised"
                        size="large"
                        // disabled={!this.isFormSubmit()}
                        onClick={() => this.onUserLogin()}
                      >
                      Sign In
                                    </Button>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </QueueAnim>
    );
  }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading }
}

export default connect(mapStateToProps, { 
  userSignIn
})(Signin);
