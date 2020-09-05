import 'antd/dist/antd.css'
import {
	Layout,
	Avatar,
	Typography,
	Button
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
//
import React, { useEffect, useState } from 'react'
//
import './home.css'
import { authSuccess, authFirebaseLogout } from '../../redux/actions/authActions'


const { Title } = Typography

const Home = () => {
	
	const { user } = useSelector(state => state.user)
	const [ userState, setUserState ] = useState({ })
	const dispatch = useDispatch()

	useEffect( () => {

		if( user !== null || localStorage.getItem('user') ){

			if( user === null ){

				dispatch( authSuccess( JSON.parse( localStorage.getItem('user') ) ) )
			}

			setUserState( JSON.parse( localStorage.getItem('user') ) )
		}
	}, [ user, dispatch ])

	return (
		
		<Layout className='home' color='dark' >
			<div className="perfil">
				<Title level={ 2 }  style={{ textAlign:'center' }}  >
					Bienvenido
				</Title>
				
				<Title level={ 5 } type='secondary' mark style={{ textAlign:'center' }} > { userState.name } </Title>
				
				<Avatar 
					size={ 300 }
					icon={ <UserOutlined /> }
				/>

				<Button
					style={{ marginTop: 20 }}
					type='primary'
					danger
					onClick={ () => dispatch( authFirebaseLogout() ) }
				>
					Cerrar Sesión
				</Button>
			</div>
		</Layout>
	)
}

export default Home
