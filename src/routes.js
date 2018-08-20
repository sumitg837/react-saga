import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import {AppComponent} from './_components/app-component';
import {HomeComponent} from './_components/home-component';
import {PrivateRoute} from './_helper';


class Routes extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<div>
        <Route exact path='/' component={AppComponent} />
        <PrivateRoute exact path='/home' component={HomeComponent} />

      </div>
		)
	}
}

export default Routes


