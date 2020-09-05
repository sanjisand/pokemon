import { types } from "../types"


const initialState = {
	user: null,
	loading: false,
	error: null,
	signUp: false
}

export const authReducer = ( state = initialState, action ) => {

	switch ( action.type ) {

		case types.authStart:

			return {
				...state,
				...action.payload
			}

		case types.authFail: 

			return {
				...state,
				error: action.payload,
				loading: false
			}

		case types.authSuccess:

			return {
				...state,
				user: action.payload,
				loading: false,
				error: null
			}

		case types.authLogout:

			return initialState

		case types.signUpSuccess: 

			return {
				...state,
				signUp: action.payload,
				error: null
			}
		
		case types.signUpStart: 

			return {
				...state,
				signUp: action.payload
			}

		case types.signUpFail: 

			return {
				...state,
				error: action.payload,
				signUp: false
			}

		default:
			return state
	}
}