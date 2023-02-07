import { useContext, forwardRef } from "react"
import { useNavigate } from 'react-router-dom'
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {Business} from "../models"
import { InfoContext } from "../context/InfoContext"
import { deleteBusiness } from "../helpers"
import '../styles/Tables.css'

interface BusinessTableProps {
  business: Array<Business>,
}

type Ref = HTMLTableElement

export const BusinessTable = forwardRef<Ref, BusinessTableProps>(({ business }: BusinessTableProps, ref) => {
  const navigate = useNavigate()
  const { setBusiness } = useContext(InfoContext)

  return(
    <div className="table-container">
      <table ref={ref} className="table">
        <thead>
            <tr className="thead">
              <th>FOLIO</th>
              <th>N° DE CONTRATO</th>
              <th>GIRO</th>
              <th>RAZON SOCIAL</th>
              <th>DIRECCION</th>
              <th>COLONIA</th>
              <th>ESTATUS</th>
              <th>OBSERVACIONES</th>
              <th>ELIMINAR</th>
            </tr>
        </thead>
        <tbody>
          {business?.map((b, index) => 
            <tr className="tbody" key={index}>
              <td onClick={() => navigate(`/new-business/${b.id}`)}>
                {b.folio}{undefined !== b.id ? b.id < 10 ? '0000': 
                  b.id >= 10 && b.id <= 100 ? '000': 
                  b.id >= 100 && b.id <= 1000 ? '00': 
                  b.id >= 1000 && b.id <= 10000 ? '0': 
                  '' :
                  null
                }{b.id}
              </td>
              <td onClick={() => navigate(`/new-business/${b.id}`)}>{b.contrato}</td>
              <td onClick={() => navigate(`/new-business/${b.id}`)}>{b.giro}</td>
              <td onClick={() => navigate(`/new-business/${b.id}`)}>{b.nombre}</td>
              <td onClick={() => navigate(`/new-business/${b.id}`)}>{b.direccion}</td>
              <td onClick={() => navigate(`/new-business/${b.id}`)}>{b.colonia}</td>
              <td onClick={() => navigate(`/new-business/${b.id}`)}>{b.estatus}</td>
              <td onClick={() => navigate(`/new-business/${b.id}`)}>{b.obs}</td>
              <td 
                onClick={() => {
                  if(undefined !== b.id) {
                    deleteBusiness(b.id)
                      .then(res => res.json())
                      .then(setBusiness)
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
})
