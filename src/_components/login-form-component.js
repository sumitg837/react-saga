import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { history } from '../_helper/history'



class LoginForm extends Component{
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(values){
		this.props.userLogin(values);
	}
	componentWillUnmount(){
	    console.log('unmount');
	    this.props.stopLogin();
	    this.props.resetMessage();
  	}

	render(){
  const { handleSubmit, pristine, reset, submitting, user } = this.props;
		return (
			<section className="login-section">
				<div className="login">
				{user.message !== '' ?
					<h4>Error: {user.message}</h4>  
					: null
				}
					<form onSubmit={handleSubmit(this.handleSubmit)}>
						<ul className="ul-list">
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
							<li><span className="remember"><input type="checkbox" id="check" /> <label htmlFor="check">Remember Me</label></span><span className="remember"><a href="">Forget Password</a></span></li>
							<li><div>
				        <button type="submit" className="btn" disabled={pristine || submitting}>Submit</button>
				      </div></li>
						</ul>
					</form>
				</div>
			</section>
		)
	}
}

LoginForm = reduxForm({
	form: 'LoginForm'
})(LoginForm)

function mapStateToProps(state){
	let {user} = state
	return {
		user: user
	}
}
const ConnectedLoginForm = connect(mapStateToProps)(LoginForm);
export {ConnectedLoginForm as LoginForm} ;

