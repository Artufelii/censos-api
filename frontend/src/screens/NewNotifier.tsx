import { ChangeEvent, ReactElement, SyntheticEvent, useContext, useEffect, useRef, useState } from "react"
import {useParams} from "react-router-dom"
import {InfoContext} from "../context/InfoContext"
import { createNotifier, fetchNotifiers, fetchZones, getNotifier, updateNotifier } from "../helpers"
import {Notifiers, Response} from "../models"
import '../styles/Forms.css'

export function NewNotifier(): ReactElement {
	const { id } = useParams()
	const formRef = useRef<HTMLFormElement>(null)
	const { zones, setZones, setNotifiers } = useContext(InfoContext)
	const [message, setMessage] = useState<Response>({
		succes: '',
		error: '',
	})
	const [data, setData] = useState<Notifiers>({
		userid: '',
		name: '',
		username: '',
		password: '',
		zone: '',
		role: '',
	})

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault()
		if (undefined !== id) {
			updateNotifier(data, parseInt(id))
		} else {
			createNotifier(data)
			.then(response => response.json())
			.then((res: Response) => setMessage({...res}))
		} 

		if (null !== formRef.current) formRef.current.reset()
			setData({
				userid: '',
				name: '',
				username: '',
				password: '',
				zone: '',
				role: '',
			})

			fetchNotifiers()
				.then(response => response.json())
				.then(setNotifiers)
	}

	useEffect(() => {
		if (undefined !== id) { 
			getNotifier(parseInt(id))
				.then(response => response.json())
				.then((res: Notifiers) => setData({...res}))
		}
	}, [])

	useEffect(() => {
		fetchZones()
			.then(response => response.json())
			.then(setZones)
	}, [])

	return (
		<form ref={formRef} id="form" className="form" onSubmit={onSubmit}>
			<div className="form-content">
				<h2>{undefined !== id ? 'Actualizar información' : 'Registrar nuevo usuario' }</h2>
				<div className="form-group">
					<label htmlFor="userid">N° de empleado:</label>
					<input
						onChange={onChange} 
						type="text" 
						placeholder="N° de empleado" 
						id="userid" 
						name="userid"
						value={data.userid}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="name">Nombre:</label>
					<input
						onChange={onChange} 
						type="text" 
						placeholder="Nombre" 
						id="name" 
						name="name"
						value={data.name}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="username">Usuario:</label>
					<input
						onChange={onChange} 
						type="text" 
						placeholder="Usuario" 
						id="username" 
						name="username"
						value={data.username}
					/>
				</div>
				{undefined !== id ? null : 
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
				}
				<div className="form-group-container">
					<div className="form-group-select">
						<label htmlFor="zone">Zona:</label>
						<select value={data.zone} onChange={onChange} id="zone" name="zone">
							{zones.map((zone, index) => <option key={index} value={zone.prefix}>{zone.zone}</option>)}
						</select>
					</div>
					<div className="form-group-select">
						<label htmlFor="role">Role:</label>
						<select value={data.role} onChange={onChange} id="role" name="role">
							<option value="admin">Admin</option>
							<option value="notificador">Notificador</option>
							<option value="asistente">Asistente</option>
						</select>
					</div>
				</div>
				<div className="form-group">
					<button type="submit">Guardar</button>
					{'' !== message.error && null !== message.error ? 
						<p className='message-error'>{`Error: *${message.error}`}</p>
						: null}
					{'' !== message.succes && null !== message.succes ? 
						<p className='message-success'>{`Completado: *${message.succes}`}</p>
						: null}
				</div>
			</div>
		</form>
	)
}
