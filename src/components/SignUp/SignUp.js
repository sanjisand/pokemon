import {
	Layout,
	Row,
	Col,
	Form,
	Input,
	Button,
	Typography,
	Alert,
	message
} from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { MailOutlined } from '@ant-design/icons'
import validator from 'validator'
import { useDispatch } from 'react-redux'
//
import React, { useState } from 'react'
//
import '../Login/login.css'
import logo from '../../assets/images/pokemon-logo.png'
import { signUpFirebaseStart } from '../../redux/actions/authActions'


const { Title, Paragraph } = Typography

const SignUp = () => {

	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ name, setName ] = useState('')
	const [ isLoading, setIsLoading ] = useState(false)
	const [ msgError, setMsgError ] = useState(null)
	const { isEmail, isEmpty, isLength } = validator
	const dispath = useDispatch()
	const history = useHistory()

	const handleSubmit = async() => {

		if( isEmpty( email ) || isEmpty( password ) || isEmpty( name ) ) {
			
			setMsgError('Todos los campos son obligatorios')
			
			return
		}
		
		if( !isEmail( email ) ) {
			
			setMsgError('El correo no es valido')
			
			return
		}
		
		if( !isLength( password, { min: 6 } ) ) {
			
			setMsgError('La contraseña debe tener un minimo de 6 caracteres')
			
			return
		}
		
		setIsLoading( true )

		const resp = await dispath( signUpFirebaseStart( name, email, password ) )

		if( resp ){
			
			if( resp.code === 'auth/email-already-in-use' ) {
				
				setMsgError('El correo ya esta en uso, intenta de nuevo.')
				setIsLoading( false )
			}
			
			return
		}
		
		setEmail('')
		setName('')
		setPassword('')
		setIsLoading(false)
		setMsgError( null )
		message.success({ content: 'Registrado con exito' }, 4)	
		history.push('/iniciar-sesion')
	}

	return (
		
		<Layout className='login-container' >
			<Row justify='center' align='middle' >
				<Col span={12} xs={ 24 } md={ 24 } lg={ 12 } >
					<Link to='/' >
						<img src={ logo } alt="Pokemon" width='100%' />
					</Link>
				</Col>

				<Col span={ 12 } xs={ 24 } md={ 24 } lg={ 12 } >
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
							<Title style={{ color: '#704747' }} > Registrarse </Title>

							<Form.Item label='Nombre: ' labelAlign='right' >
								<Input 
									placeholder='Juanito'
									size='large'
									onChange={ e => setName( e.target.value ) }
									value={ name }
								/>
							</Form.Item>

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
								¿Ya tienes una cuenta? Inicia sesión
								<Link to='/iniciar-sesion' > 
									{' '}Aqui
								</Link>
							</Paragraph>

							<Button
								block
								shape
								type='primary'
								onClick={ handleSubmit }
								loading={ isLoading }
							>
								Enviar
							</Button>
						</Form>
					</Row>
				</Col>
			</Row>
		</Layout>
	)
}

export default SignUp
