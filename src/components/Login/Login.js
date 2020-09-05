import {
	Layout,
	Row,
	Col,
	Form,
	Input,
	Button,
	Typography,
	Alert
} from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import validator from 'validator'
import { useSelector, useDispatch } from 'react-redux'
//
import React, { useState } from 'react'
//
import './login.css'
import logo from '../../assets/images/pokemon-logo.png'
import { authFirebaseStart } from '../../redux/actions/authActions'


const { Title, Paragraph } = Typography

const Login = () => {
	
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ msgError, setMsgError ] = useState(null)
	const { isEmail, isEmpty } = validator
	const { loading } = useSelector( store => store.user)
	const history = useHistory()
	const dispatch = useDispatch()

	const handleSubmit = async() => {

		if( isEmpty( email ) || isEmpty( password )) {

			setMsgError('Todos los campos son obligatorios')

			return
		}
		if( !isEmail( email ) ) {

			setMsgError('El correo no es valido')
			
			return
		}

		const resp = await dispatch( authFirebaseStart( email, password ) )

		if( resp ){
			
			if( resp.code === 'auth/user-not-found' ) {
	
				setMsgError('El correo no existe o fue eliminado')
	
				return
			}
	
			if( resp.code === 'auth/wrong-password' ) {
	
				setMsgError('La contraseña es incorrecta, intenta de nuevo')
				setPassword('')
	
				return
			}
		}
		
		setEmail('')
		setPassword('')
		setMsgError(null)
		history.push('/')
	}

	return (
		
		<Layout className='login-container' >
			<Row justify='center' align='middle' >
				<Col span={12} xs={ 24 } md={ 12 } lg={ 12 } >
					<Link to='/' >
						<img src={ logo } alt="Pokemon" width='100%' />
					</Link>
				</Col>

				<Col span={12} xs={ 24 } md={ 12 } lg={ 12 }>
					<Row className='login' justify='center' align='middle' >
						<Form 
							className='login-form' 
							layout='vertical' 
							onKeyPress={ e =>  e.key === 'Enter' && handleSubmit() }  
						>
							{
								msgError !== null && (
									
									<Alert 
										message={ msgError }
										type='error'
										showIcon
									/>
								)
							}

							<Title style={{ color: '#704747' }} > Iniciar Sesión </Title>

							<Form.Item label='Correo Electronico: ' labelAlign='right' >
								<Input 
									placeholder='ejemplo@ejemplo.com'
									size='large'
									prefix={ <MailOutlined /> }
									onChange={ e => setEmail( e.target.value ) }
									value={ email }
								/>
							</Form.Item>
							
							<Form.Item label='Contraseña:' labelAlign='right' >
								<Input.Password 
									placeholder='Contraseña'
									size='large'
									onChange={ e => setPassword( e.target.value ) }
									value={ password }
								/>
							</Form.Item>

							<Paragraph>
								¿No tienes una cuenta? Registrate 
								<Link to='/registrarse' > 
									{' '}Aqui
								</Link>
							</Paragraph>

							<Button
								block
								shape
								type='primary'
								onClick={ handleSubmit }
								loading={ loading }
							>
								Entrar
							</Button>
						</Form>
					</Row>
				</Col>
			</Row>
		</Layout>
	)
}

export default Login