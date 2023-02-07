import { ChangeEvent, ReactElement, SyntheticEvent, useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { InfoContext } from "../context/InfoContext"
import { createBusiness, fetchBusiness, fetchNotifiers, fetchZones, getBusiness, updateBusiness } from "../helpers"
import { Business } from "../models"
import '../styles/Forms.css'

export function NewBusiness(): ReactElement {
  const { id } = useParams()
  const formRef = useRef<HTMLFormElement>(null)
  const { setBusiness } = useContext(InfoContext)
  const { zones, setZones } = useContext(InfoContext)
  const { notifiers, setNotifiers } = useContext(InfoContext)
  const [data, setData] = useState<Business>({
	  notificador: '',
	  contrato: '',
	  giro: '',
	  nombre: '',
	  direccion: '',
	  colonia: '',
	  zona: '',
	  estatus: '',
	  obs: '',
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
    	updateBusiness(data, parseInt(id))
		} else {
			createBusiness(data)
		} 

    if (null !== formRef.current) formRef.current.reset()
    setData({
      notificador: '',
      contrato: '',
      giro: '',
      nombre: '',
      direccion: '',
      colonia: '',
      zona: '',
      estatus: '',
      obs: '',
    })

		fetchBusiness()
			.then(res => res.json())
			.then(setBusiness)
  }

  useEffect(() => {
    if (undefined !== id) { 
      getBusiness(parseInt(id))
			.then(response => response.json())
      .then((res: Business) => setData({...res}))
    }
  }, [])

  useEffect(() => {
    fetchZones()
			.then(res => res.json())
      .then(setZones)
  }, [])

  useEffect(() => {
    fetchNotifiers()
			.then(res => res.json())
      .then(setNotifiers)
  }, [])
  
  return (
	<form ref={formRef} id="businessForm" className="form" onSubmit={onSubmit}>
		<div className="form-content">
			<h2>{undefined !== id ? 'Actualizar datos del negocio' : 'Registrar nuevo negocio' }</h2>
			<div className="form-group">
				<label htmlFor="contrato">N° de contrato:</label>
				<input
					onChange={onChange} 
					type="text" 
					placeholder="N° de contrato" 
					id="contrato" 
					name="contrato"
					value={data.contrato}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="giro">Giro:</label>
				<input
					onChange={onChange} 
					type="text" 
					placeholder="Giro" 
					id="giro" 
					name="giro"
					value={data.giro}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="nombre">Razón Social:</label>
				<input
					onChange={onChange} 
					type="text" 
					placeholder="Razón social" 
					id="nombre" 
					name="nombre"
					value={data.nombre}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="direccion">Dirección:</label>
				<input
					onChange={onChange} 
					type="text" 
					placeholder="Dirección" 
					id="direccion" 
					name="direccion"
					value={data.direccion}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="colonia">Colonia:</label>
				<input
					onChange={onChange} 
					type="text" 
					placeholder="Colonia" 
					id="colonia" 
					name="colonia"
					value={data.colonia}
				/>
			</div>
			<div className="form-group-container">
				<div className="form-group-select">
					<label htmlFor="notificador">Notificador:</label>
					<select value={data.notificador} onChange={onChange} id="notificador" name="notificador">
						{notifiers.map(notifier => <option value={notifier.username}>{notifier.name}</option>)}
					</select>
				</div>
				<div className="form-group-select">
					<label htmlFor="zona">Zona:</label>
					<select value={data.zona} onChange={onChange} id="zona" name="zona">
						{zones.map((zone, index) => <option key={index} value={zone.prefix}>{zone.zone}</option>)}
					</select>
				</div>
				<div className="form-group-select">
					<label htmlFor="estatus">Estatus:</label>
					<select value={data.estatus} onChange={onChange} id="estatus" name="estatus">
						<option value="EC">EC</option>
						<option value="JP">JP</option>
					</select>
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="obs">Observaciones:</label>
				<textarea value={data.obs} onChange={onChange} id="obs" name="obs" />
				<button type="submit">Guardar</button>
			</div>
		</div>
	</form>
  )
}
