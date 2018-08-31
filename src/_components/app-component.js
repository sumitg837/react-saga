import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { LoginForm } from './login-form-component';
import { RegistrationForm } from './registration-form-component';

import * as UserActions from '../_actions/user-actions';
class App extends Component{
	constructor(props){
		super(props)
		this.state = {
			login_section : true,
			header:{
		        text : 'Registration'
	      	}
		}
	}
	
	
	userLogin(values){
		this.props.userLogin(values)
	}
	stopLogin(){
		this.props.stopLogin()
	}
	registerUser(values){
		this.props.registerUser(values)
	}
	resetMessage(){
	    this.props.resetMessage();
	}

	switchForm(show){
		this.setState({
			login_section : show,
		})
		let header = {
			text: 'Active'
		}

		this.setState({
			header,
		})
	}
	render(){
		
		return (
			<div>
				<div id="login-form">
					<div>
						<ul className="form-header">
						<li><label htmlFor="login" className={this.state.login_section ? 'active' : ''} onClick={this.switchForm.bind(this, true)}> LOGIN</label></li>
						<li><label htmlFor="signup" className={!this.state.login_section ? 'active' : ''} onClick={this.switchForm.bind(this, false)}> {this.state.header.text}</label></li>
						</ul>
					</div>
					<div className="section-out">
					{this.state.login_section ?
						<LoginForm
						 userLogin={this.userLogin.bind(this)}
						 stopLogin={this.stopLogin.bind(this)}
						 resetMessage={this.resetMessage.bind(this)}
						 />
						:
						<RegistrationForm 
						 resetMessage={this.resetMessage.bind(this)}
						 registerUser={this.registerUser.bind(this)}
						 />
					}
					</div>
				</div>
			</div>
		)
	}
}

function mapActionCreaterToProps(dispatch){
	return bindActionCreators(UserActions, dispatch)
}
function mapStateToProps(){
	return {

	}
}
const ConnectedAppComponent = connect(mapStateToProps, mapActionCreaterToProps)(App)
export {ConnectedAppComponent as AppComponent};