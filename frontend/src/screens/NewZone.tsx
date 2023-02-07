import { ChangeEvent, ReactElement, SyntheticEvent, useContext, useEffect, useRef, useState } from "react"
import {useParams} from "react-router-dom"
import {InfoContext} from "../context/InfoContext"
import {createZone, fetchNotifiers, fetchZones, getZone, updateZone} from "../helpers"
import {Zones} from "../models"
import '../styles/Forms.css'

export function NewZone(): ReactElement {
  const { id } = useParams()
  const formRef = useRef<HTMLFormElement>(null)
  const { setZones, setNotifiers, notifiers } = useContext(InfoContext)
  const [data, setData] = useState<Zones>({
	  prefix: '',
	  zone: '',
	  notifier: '',
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
    	updateZone(data, parseInt(id))
		} else {
			createZone(data)
		} 

    if (null !== formRef.current) formRef.current.reset()
    setData({
			prefix: '',
			zone: '',
			notifier: '',
    })

		fetchZones()
			.then(response => response.json())
			.then(setZones)
  }

  useEffect(() => {
    if (undefined !== id) { 
      getZone(parseInt(id))
			.then(response => response.json())
      .then((res: Zones) => setData({...res}))
    }
  }, [])

	useEffect(() => {
		fetchNotifiers()
			.then(response => response.json())
			.then(setNotifiers)
	},[])

  return (
	<form ref={formRef} id="businessForm" className="form" onSubmit={onSubmit}>
		<div className="form-content">
			<h2>{undefined !== id ? 'Actualizar zona' : 'Registrar nueva zona' }</h2>
			<div className="form-group">
				<label htmlFor="prefix">Prefijo:</label>
				<input
					onChange={onChange} 
					type="text" 
					placeholder="Prefijo" 
					id="prefix" 
					name="prefix"
					value={data.prefix}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="zone">Zona:</label>
				<input
					onChange={onChange} 
					type="text" 
					placeholder="Zona" 
					id="zone" 
					name="zone"
					value={data.zone}
				/>
			</div>
			<div className="form-group-container">
				<div className="form-group-select">
					<label htmlFor="notifier">Notificador:</label>
					<select value={data.notifier} onChange={onChange} id="notifier" name="notifier">
						{notifiers.map((notifier, index) =>  <option key={index} value={notifier.username}>{notifier.name}</option>)}
					</select>
				</div>
			</div>
			<div className="form-group">
				{/*<label htmlFor="obs">Observaciones:</label>
				<textarea value={data.obs} onChange={onChange} id="obs" name="obs" />*/}
				<button type="submit">Guardar</button>
			</div>
		</div>
	</form>
  )
}
