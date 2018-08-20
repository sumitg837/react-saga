import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class RegistrationForm extends Component{
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleSubmit(values){
		this.props.registerUser(values)
	}
	componentWillUnmount(){
	    this.props.resetMessage();
  	}
	render(){
  const { handleSubmit, pristine, reset, submitting, user } = this.props;

		return (
			<section className="signup-section">
				<div className="login">
				{user.message !== '' ?
					<h4>Error: {user.message}</h4>  
					: null
				}
					<form onSubmit={handleSubmit(this.handleSubmit)}>
						<ul className="ul-list">
						<li>
								<Field
			            name="name"
			            component="input"
			            type="text"
			            placeholder="Name"
			            className="input"
			          /><span className="icon"><i className="fa fa-user"></i></span>
							</li>
							<li>
								<Field
			            name="email"
			            component="input"
			            type="text"
			            placeholder="Email"
			            className="input"
			          /><span className="icon"><i className="fa fa-user"></i></span>
							</li>
							<li>
								<Field
			            name="password"
			            component="input"
			            type="password"
			            placeholder="Password"
			            className="input"
			          /><span className="icon"><i className="fa fa-lock"></i></span></li>
							<li><div>
				        <button type="submit" className="btn" disabled={pristine || submitting}>SignUp</button>
				      </div></li>
						</ul>
					</form>
				</div>
			</section>
		)
	}
}

RegistrationForm = reduxForm({
	form: 'RegistrationForm'
})(RegistrationForm)


function mapStateToProps(state){
	let {user} = state
	return {
		user: user
	}
}
const ConnectedRegistrationForm = connect(mapStateToProps)(RegistrationForm);
export {ConnectedRegistrationForm as RegistrationForm} ;

