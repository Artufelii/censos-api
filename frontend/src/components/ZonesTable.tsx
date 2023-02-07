import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { ReactElement, useContext, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import {InfoContext} from "../context/InfoContext"
import {deleteZone, fetchZones} from "../helpers"
import '../styles/Tables.css'

export function ZonesTable(): ReactElement {
  const { zones, setZones } = useContext(InfoContext) 
  const navigate = useNavigate()

  useEffect(() => {
    fetchZones()
			.then(response => response.json())
      .then(setZones)
  }, [])

  return(
    <div className="table-container">
      <table className="table">
        <thead>
            <tr className="thead">
              <th>PREFIJO</th>
              <th>ZONA</th>
              <th>NOTIFICADOR</th>
              <th>ELIMINAR</th>
            </tr>
        </thead>
        <tbody>
          {zones?.map((zone, index) => 
            <tr className="tbody" key={index}>
              <td onClick={() => navigate(`/new-zone/${zone.id}`)}>
                {zone.prefix}
              </td>
              <td onClick={() => navigate(`/new-zone/${zone.id}`)}>
                {zone.zone}
              </td>
              <td onClick={() => navigate(`/new-zone/${zone.id}`)}>
                {zone.notifier}
              </td>
              <td 
                onClick={() => {
                  if (undefined !== zone.id) {
                    deleteZone(zone.id)
			                .then(response => response.json())
                      .then(setZones)
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
