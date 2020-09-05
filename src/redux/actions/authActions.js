import { firebase } from '../../firebase/firebase'
import { types } from '../types'


export const authStart = () => {
	
	return {
		type: types.authStart,
		payload: {
			loading: true
		}
	}
}

export const authFail = ( error ) => {

	return {
		type: types.authFail,
		payload: error
	}
}

export const authLogout = () => {

	localStorage.clear()

	return {
		type: types.authLogout
	}
}

export const authSuccess = ( user ) => {

	return {
		type: types.authSuccess,
		payload: user
	}
}

export const signUpStart = () => {
	
	return {
		type: types.signUpStart,
		payload: false
	}
}

export const signUpFail = ( error ) => {

	return {
		type: types.signUpFail,
		payload: error
	}
}

export const signUpSuccess = () => {
	
	return {
		type: types.signUpSuccess,
		payload: true
	}
}
 
//firebase
export const signUpFirebaseStart = ( name, email, password ) => {

	return async( dispatch ) => {

		dispatch( signUpStart() )
		
		try {
	
			const resp = await firebase.auth().createUserWithEmailAndPassword( email, password )
			const { user } = resp
			
			await user.updateProfile({ displayName: name })
			dispatch( signUpSuccess() )
		} 
		catch (error) {
			
			dispatch( signUpFail( error ) )
			
			return error
		}
	}
}

export const authFirebaseStart = ( email, password ) => {


	return async( dispatch ) => {
		
		dispatch( authStart() )

		try {
			
			const resp = await firebase.auth().signInWithEmailAndPassword( email, password )
			const { user } = resp

			const dataUser = { 
				name: user.displayName,
				id: user.uid
			}

			localStorage.setItem( 'user', JSON.stringify( dataUser ) )

			dispatch( authSuccess( dataUser ) )
		} 
		catch (error) {
			
			dispatch( authFail( error ) )

			return error
		}
	}
}

export const authFirebaseLogout = () => {

	return async ( dispatch ) => {

		try {
			
			await firebase.auth().signOut()
			dispatch( authLogout() )
		} 
		catch (error) {
			
			console.log( error )
		}
	}
}