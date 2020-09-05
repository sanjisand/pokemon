import {
	BrowserRouter as Router,
	Switch,
	Redirect
} from "react-router-dom"
import { useSelector } from "react-redux"
//
import React, { useEffect, useState } from 'react'
//
import Home from "../components/Home/Home"
import Login from "../components/Login/Login"
import SignUp from "../components/SignUp/SignUp"
import NoFound from "../components/404/NoFound"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"


const AppRouter = () => {
	
	const [ isAuthenticated, setIsAuthenticated ] = useState(false)
	const { user } = useSelector(state => state.user)
	
	useEffect( () => {
		
		const isAuth = () => {
		
			if( user !== null || localStorage.getItem('user') ){
		
				return true
			}
		
			return false
		}

		setIsAuthenticated( isAuth() )

	}, [ isAuthenticated, user ])
	
	return (
		
		<Router>
				<Switch>

					<PrivateRoute
						component={ Home }
						path='/'
						exact
						isAuthenticated={ isAuthenticated }
					/>
					
					<PublicRoute 
						path='/404'
						component={ NoFound }
						exact
						isAuthenticated={ isAuthenticated }
					/>
					
					<PublicRoute 
						path='/iniciar-sesion'
						component={ Login }
						exact
						isAuthenticated={ isAuthenticated }
					/>
					
					<PublicRoute 
						path='/registrarse'
						component={ SignUp }
						exact
						isAuthenticated={ isAuthenticated }
					/>

					<Redirect 
						to='/404'	
					/>
				</Switch>
		</Router>
	)
}

export default AppRouter
