import { ChangeEvent, ReactElement, SyntheticEvent, useRef, useState } from "react"
import {useParams} from "react-router-dom"
import {Response} from "../models"
import '../styles/Forms.css'

export function UpdatePassword(): ReactElement {
	const { username } = useParams()
  const formRef = useRef<HTMLFormElement>(null)
	const [message, setMessage] = useState<Response>({
		succes: '',
		error: ''
	});
	
  const [data, setData] = useState({
	  password: '',
	  confirm: '',
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
		const password = data.password
		const response = await fetch(`/api/auth/update-password/${username}`, { 
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: password
		})

		const json: Response = await response.json()

    if (null !== formRef.current) formRef.current.reset()

		setMessage({...json})
    setData({
			password: '',
			confirm: '',
    })
  }

  return (
	<form ref={formRef} id="businessForm" className="form" onSubmit={onSubmit}>
		<div className="form-content">
			<h2>Crea tu nueva contraseña</h2>
			<div className="form-group">
				<label htmlFor="password">Contraseña:</label>
				<input
					onChange={onChange} 
					type="password" 
					placeholder="Contraseña" 
					id="password" 
					name="password"
					value={data.password}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="confirm">Confirma tu contraseña:</label>
				<input
					onChange={onChange} 
					type="password" 
					placeholder="Confirma tu contraseña" 
					id="confirm" 
					name="confirm"
					value={data.confirm}
				/>
			</div>
			<div className="form-group">
				<button type="submit">Guardar</button>
			</div>
			{message.succes !== '' ? <p>{message.succes}</p> : null}
		</div>
	</form>
  )
}
