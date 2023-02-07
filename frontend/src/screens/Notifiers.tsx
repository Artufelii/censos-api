import {faArrowsRotate, faUserPlus} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactElement, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {Button, Layout} from "../components"
import {NotifiersTable} from "../components/NotifiersTable"
import { InfoContext } from "../context/InfoContext"
import { fetchNotifiers, verifyToken } from "../helpers"
import { Decoded } from "../models"

export function Notifiers(): ReactElement {
  const { setNotifiers, setEmployee } = useContext(InfoContext)
  const navigate = useNavigate()

  const onClick = () => {
    fetchNotifiers()
      .then(response => response.json())
      .then(setNotifiers)
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
            text="Registrar Usuario" 
            icon={faUserPlus} 
            path='/new-notifier'
          />
          <button style={{minWidth: 150}} onClick={onClick}><FontAwesomeIcon icon={faArrowsRotate}/> Refrescar</button>
        </div>
        <div className="main">
          <NotifiersTable />
        </div>
      </>
    </Layout>
  )
}
