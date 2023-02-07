import { ReactElement, useContext } from "react"
import { faBriefcase, faUserPen, faLocationDot, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {InfoContext} from "../context/InfoContext"
import '../styles/Header.css'

export function Header(): ReactElement {
  const { employee } = useContext(InfoContext)
  const location = useLocation()
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return(
    <header className="header">
      <ul className="list-container">
        <li className={location.pathname === "/" ? 'active' : undefined}>
          <Link to="/">
            <FontAwesomeIcon icon={faBriefcase}/>
            Negocios
          </Link>
        </li>
        {employee.role === 'admin' ? 
          <li className={location.pathname === "/notifiers" ? 'active' : undefined}>
            <Link to="/notifiers">
              <FontAwesomeIcon icon={faUserPen}/>
              Roles
            </Link>
          </li>
        : null}
        {employee.role === 'admin' || employee.role === 'asistente' ? 
          <li className={location.pathname === "/zones" ? 'active' : undefined}>
            <Link to="/zones">
              <FontAwesomeIcon icon={faLocationDot}/>
              Zonas
            </Link>
          </li>
        : null}
        <li onClick={logOut}>
          <FontAwesomeIcon icon={faRightFromBracket}/>
          Cerrar Sesión
        </li>
      </ul>
    </header>
  ) 
}
