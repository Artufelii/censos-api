import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { ReactElement, useContext, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import {InfoContext} from "../context/InfoContext"
import {deleteNotifier, fetchNotifiers} from "../helpers"
import '../styles/Tables.css'

export function NotifiersTable(): ReactElement {
  const { notifiers, setNotifiers } = useContext(InfoContext) 
  const navigate = useNavigate()

  useEffect(() => {
    fetchNotifiers()
			.then(response => response.json())
      .then(setNotifiers)
  }, [])

  return(
    <div className="table-container">
      <table className="table">
        <thead>
            <tr className="thead">
              <th>N° DE EMPLEADO</th>
              <th>NOMBRE</th>
              <th>USUARIO</th>
              <th>ZONA</th>
              <th>ROLE</th>
              <th>ELIMINAR</th>
            </tr>
        </thead>
        <tbody>
          {notifiers?.map((notifier, index) => 
            <tr className="tbody" key={index}>
              <td onClick={() => navigate(`new-notifier/${notifier.id}`)}>
                {notifier.userid}
              </td>
              <td onClick={() => navigate(`new-notifier/${notifier.id}`)}>
                {notifier.name}
              </td>
              <td onClick={() => navigate(`new-notifier/${notifier.id}`)}>
                {notifier.username}
              </td>
              <td onClick={() => navigate(`new-notifier/${notifier.id}`)}>
                {notifier.zone}
              </td>
              <td onClick={() => navigate(`new-notifier/${notifier.id}`)}>
                {notifier.role}
              </td>
              <td 
                onClick={() => {
                  if (notifier.id) {
                    deleteNotifier(notifier.id)
			                .then(response => response.json())
                      .then(setNotifiers)
                    
                  }
                }}
                style={{ textAlign: 'center' }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  ) 
}
