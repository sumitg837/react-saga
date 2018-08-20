let initState={
	user: [],
	message: '',
	isAuth: false,
	lead:[]
}

export default function user(state=initState, action){
	console.log(action)
	switch (action.type){
		case 'USER_LOGIN_SUCCESS' :{
			return {
				...state,
				user: action.payload,
				message: '',
				isAuth: true
			}
		}
		case 'USER_LOGIN_FAILURE' :{
			return {
				...state,
				message: action.payload,
				isAuth: false
			}
		}
		case 'USER_LOGIN_CANCEL' :{
			return {
				...state,
				message: action.payload,
				isAuth: false
			}
		}
		case 'USER_REGISTRATION_SUCCESS' :{
			return {
				...state,
				message: action.payload
			}
		}
		
		case 'USER_REGISTRATION_FAILURE' :{
			return {
				...state,
				message: action.payload
			}
		}
		case 'MESSAGE_RESET' :{
			return {
				...state,
				message: action.payload
			}
		}
		case 'LEADS_FETCH_SUCCESS' :{
			return {
				...state,
				leads:action.payload.leads,
				pagination:action.payload.pagination
			}
		}
		case 'LEADS_FETCH_FAILURE' :{
			return {
				...state,
				message: action.payload
			}
		}
		case 'EDIT_LEADS' :{
			return {
				...state,
				lead: action.payload
			}
		}
		case 'LEAD_UPDATE_SUCCESS' :{
			return {
				...state,
			}
		}
		case 'LEAD_UPDATE_FAILURE' :{
			return {
				...state,
				message: action.payload
			}
		}

		default: return state;
	}
}