import { faArrowsRotate, faMapLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactElement, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {Button, Layout, ZonesTable} from "../components"
import { InfoContext } from "../context/InfoContext"
import { fetchZones, verifyToken } from "../helpers"
import { Decoded } from "../models"
import '../styles/Main.css'

export function Zones(): ReactElement {
  const { setZones, setEmployee } = useContext(InfoContext)
  const navigate = useNavigate()

  const onClick = () => {
    fetchZones()
      .then(response => response.json())
      .then(setZones)
  }

  useEffect(() => {
    const tkn = localStorage.getItem('token')

    if (!tkn) {
      navigate('/login')
    }

    if(tkn) {
      verifyToken(tkn)
        .then(response => response.json())
        .then((res: Decoded) => {
          if(res.error) {
            navigate('/login')
          }
          setEmployee(res.claims)
        })
    }

  }, [])

  return(
    <Layout>
      <>
        <div style={{ margin: '20px 0', width: 'auto', position: 'absolute', top: '100px', left: '30px', display: 'flex', gap: 20 }}>
          <Button 
            text="Registrar Zona" 
            icon={faMapLocationDot} 
            path='/new-zone'
          />
          <button style={{minWidth: 150}} onClick={onClick}><FontAwesomeIcon icon={faArrowsRotate}/> Refrescar</button>
        </div>
        <div className="main">
          <ZonesTable />
        </div>
      </>
    </Layout>
  )
}
