import axios from 'axios';
import {call, cancel, take, fork, put, all, race, cancelled} from 'redux-saga/effects';
import { history } from '../_helper/history'
import {authHeader} from '../_helper'
import {env} from '../_helper/config'
function* init(){
	console.log('===>initialized<===');
}
const authUser =(args) =>{
	return axios.request({
		method: 'post',
		url: env.apiUrl+'/api/login',
		headers: authHeader(),
		data:args
	})
}
const userRegister = (args) =>{
	return axios.request({
		method: 'post',
		url: env.apiUrl+'/api/storeUser',
		headers: authHeader(),
		data:args
	})	
}
const fetchLeads = (args) =>{
	return axios.request({
		method: 'get',
		url: env.apiUrl+'/api/lead',
		headers: authHeader(),
		data:args
	})	
}

const UpdateLeads = (args) =>{
	return axios.request({
		method: 'post',
		url: env.apiUrl+'/api/update/lead',
		headers: authHeader(),
		data:args
	})	
}

function* userLogin(args){
	try{
		const action = yield call(authUser, args.payload);
		if(!action.data.error){
			console.log(action)
			localStorage.setItem('token', JSON.stringify(action.data.data.token))
			yield put({type: 'USER_LOGIN_SUCCESS', payload: action.data.data.user})	
			yield history.push('/home')	

		}else{
			let msg = '';
			if(typeof action.data.message !== 'string'){
				for(var key in action.data.message){
					msg = action.data.message[key]; 
				}
			}else{
				msg = action.data.message
			}

			yield put({type: 'USER_LOGIN_FAILURE', payload: msg})	
		}
	}catch(error){
		yield put({type: 'USER_LOGIN_FAILURE', payload: error})	
	}finally{
		console.log('finnaly')
	  	if (yield cancelled()) {
	  		console.log('cancelled')
	    }
	}
}

function* registerUser(args){
	try{
		const action = yield call(userRegister, args.payload);
		console.log('regist',args)
		if(!action.data.error){
			console.log(action)
			yield put({type: 'USER_REGISTRATION_SUCCESS', payload: ''})
			yield history.push('/home')	

		}else{
			let msg = '';
			if(typeof action.data.message !== 'string'){
				for(var key in action.data.message){
					msg = action.data.message[key]; 
				}
			}else{
				msg = action.data.message
			}

			yield put({type: 'USER_REGISTRATION_FAILURE', payload: msg})	
		}
	}catch(error){
		console.log(error)
		yield put({type: 'USER_REGISTRATION_FAILURE', payload: 'Error Occured!'})	
	}
}

function* leads(){
	try{
		const action = yield call(fetchLeads);
		if(!action.data.error){
			console.log(action)
			yield put({type: 'LEADS_FETCH_SUCCESS', payload: action.data.data})	
		}else{
			let msg = '';
			if(typeof action.data.message !== 'string'){
				for(var key in action.data.message){
					msg = action.data.message[key]; 
				}
			}else{
				msg = action.data.message
			}

			yield put({type: 'LEADS_FETCH_FAILURE', payload: msg})	
		}
	}catch(error){
		console.log(error)
		yield put({type: 'LEADS_FETCH_FAILURE', payload: 'Error Occured!'})	
	}
}

function* updateLeads(args){
	try{
		const action = yield call(UpdateLeads, args.payload);
		if(!action.data.error){
			console.log(action)
			yield put({type: 'LEAD_UPDATE_SUCCESS', payload: action.data.data})
			yield put({type: 'CLOSE_MODEL', payload: true})	
			yield history.go(0)
			// yield history.push('/home')
		}else{
			let msg = '';
			if(typeof action.data.message !== 'string'){
				for(var key in action.data.message){
					msg = action.data.message[key]; 
				}
			}else{
				msg = action.data.message
			}

			yield put({type: 'LEAD_UPDATE_FAILURE', payload: msg})	
		}
	}catch(error){
		console.log(error)
		yield put({type: 'LEAD_UPDATE_FAILURE', payload: 'Error Occured!'})	
	}
}
function* logout(){
	try{
		localStorage.removeItem('token');
		yield history.push('/')
	}catch(error){
		console.log(error)
	}
}
function* watchAsyncLogin(){
	while(true){
		const loginAction = yield take('USER_LOGIN')
		yield race([call(userLogin, loginAction), take('USER_LOGIN_STOP')])

	}
}
function* watchAsyncRegister(){
	while(true){
		const regisAction = yield take('USER_REGISTRATION')
		// yield fork(registerUser, regisAction)
		yield race([call(registerUser, regisAction), take('LOGOUT')])
	}
}
function* watchAsyncLeads(){
	while(true){
		const leadsAction = yield take('FETCH_LEADS')
		yield race([call(leads, leadsAction), take('LOGOUT')])
		// yield fork(leads, leadsAction)
	}
}

function* watchAsyncUpdateLead(){
	while(true){
		const updateLeadAction = yield take('UPDATE_LEAD')
		yield race([call(updateLeads, updateLeadAction), take('LOGOUT')])
		// yield fork(updateLeads, updateLeadAction)
	}
}
function* watchAsyncLogOut(){
	while(true){
		const updateLogOutAction = yield take('LOGOUT')
		// yield race([call(updateLeads, updateLeadAction), take('LOGOUT')])
		yield fork(logout, updateLogOutAction)
		// yield history.push('/')
	}
}

export default function* rootSaga(){
	try{
		yield all([
			init(),
			watchAsyncLogin(),
			watchAsyncRegister(),
			watchAsyncLeads(),
			watchAsyncUpdateLead(),
			watchAsyncLogOut()
		])
	}catch(error){
		console.log(error)
	}
}