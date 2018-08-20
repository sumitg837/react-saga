let initState={
	isOpen: false
}

export default function model(state=initState, action){
	switch (action.type){
		case 'OPEN_MODEL':{
			return {
				...state,
				isOpen:true
			}
		}
		case 'CLOSE_MODEL':{
			return {
				...state,
				isOpen:false
			}
		}
		default :return {
			...state
		}
	}
}