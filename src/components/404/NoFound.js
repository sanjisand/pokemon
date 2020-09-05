import { Link } from 'react-router-dom'
import { Row, Col, Result, Button } from 'antd'
//
import React from 'react'

const NoFound = () => {
	
	return (
		
		<Row justify='center' align='middle' >
			<Col span={ 24 } >
				<Result
					status="404"
					title="404"
					subTitle="Sorry, the page you visited does not exist."
					extra={<Button type="primary"><Link to='/' >Volver al Inicio</Link></Button>}
				/>
			</Col>
		</Row>
	)
}

export default NoFound

