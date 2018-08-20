export function userLogin(args){
	return {
		type: 'USER_LOGIN',
		payload: args
	}
}
export function stopLogin(args){
	return {
		type: 'USER_LOGIN_STOP'
	}
}

export function registerUser(args){
	return {
		type: 'USER_REGISTRATION',
		payload: args
	}
}

export function resetMessage(args){
	return {
		type: 'MESSAGE_RESET',
		payload: ''
	}
}
export function leads(args){
	return {
		type: 'FETCH_LEADS'
	}
}
export function editLead(args){
	return {
		type: 'EDIT_LEADS',
		payload:args
	}
}
export function updateLead(args){
	return {
		type: 'UPDATE_LEAD',
		payload:args
	}
}

export function logout(args){
	return {
		type: 'LOGOUT'
	}
}
