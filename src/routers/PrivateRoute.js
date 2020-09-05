import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

export const PrivateRoute = (props) => {

	const { isAuthenticated, component: Component, ...rest } = props

	return (

		<Route 
			component= { (props) => (
				(isAuthenticated) 
					? ( <Component {...props} /> )
					: ( <Redirect to='/iniciar-sesion' /> )
			)}
			{...rest} 
		/>			
	)
}

PrivateRoute.prototype = {
	isAuthenticate: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired
}