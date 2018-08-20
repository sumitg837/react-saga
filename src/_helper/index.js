import React from 'react'
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
);
export const authHeader = ()=>{
    // return authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('token'));
    console.log(token)
    if (token) {
        return {
        		'authorization': token,
        		'Accept' : 'application/json',
            	'Content-Type': 'application/json'
        	}
    } else {
        return {
        	'Accept' : 'application/json',
            'Content-Type': 'application/json'
        };
    }
}

