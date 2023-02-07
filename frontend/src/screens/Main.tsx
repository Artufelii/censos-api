import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import type { ReactElement } from "react"
import { Layout, BusinessTable, Button, Searcher } from "../components"
import '../styles/Main.css'
import { faArrowsRotate, faPlus, faTable } from "@fortawesome/free-solid-svg-icons";
import { InfoContext } from "../context/InfoContext";
import { fetchBusiness, fetchNotifiers, fetchZones, verifyToken } from "../helpers";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Business, Decoded } from "../models";

export function Main(): ReactElement {
  const { business, setBusiness } = useContext(InfoContext)
  const { zones, setZones } = useContext(InfoContext)
  const { employee, setEmployee } = useContext(InfoContext)
  const { setNotifiers } = useContext(InfoContext)
  const [zone, setZone] = useState<Business[]>([])
  const [select, setSelect] = useState('todo')
  const tableRef = useRef(null)
  const navigate = useNavigate()

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if ('todo' === e.target.value) {
      setSelect('todo')
      fetchBusiness()
        .then(res => res.json())
        .then(setZone)

        return
    }

    setSelect(e.target.value)
    const result = business.filter(b => b.zona === e.target.value)
    setZone(result)
  }

  const onClick = () => {
    fetchBusiness()
      .then(res => res.json())
      .then(setBusiness)
  }

  useEffect(() => {
    fetchBusiness()
      .then(res => res.json())
      .then(setBusiness)
  }, [])

  useEffect(() => {
    fetchZones()
      .then(res => res.json())
      .then(setZones)
  }, []);

  useEffect(() => {
    fetchNotifiers()
      .then(res => res.json())
      .then(setNotifiers)
  },[])

  useEffect(() => {
    const tkn = localStorage.getItem('token')

    if (!tkn) {
      navigate('/login')
    }

    if(tkn) {
      verifyToken(tkn)
        .then(res => res.json())
        .then((res: Decoded) => {
          if(res.error) {
            navigate('/login')
          }
          setEmployee(res.claims)
          if (res.claims.role === 'admin') {
            setZone(business)
            setSelect('todo')
          } else {
            setZone(business.filter(b => b.zona === res.claims.zone))
            setSelect(res.claims.zone)
          }
        })
    }
  }, [])

  useEffect(() => {
    if (employee.role === 'admin') {
      setZone(business)
      setSelect('todo')
    } else {
      setZone(business.filter(b => b.zona === employee.zone))
      setSelect(employee.zone)
    }
  }, [business])

  return (
    <Layout>
      <>
        <div style={{ margin: '20px 0', width: 'auto', position: 'absolute', top: '100px', left: '30px', display: 'flex', gap: 20 }}>
          <div style={{ minWidth: 150 }}>
            <Button 
              text="Registrar Negocio" 
              icon={faPlus} 
              path='/new-business'
            />
          </div>
          <DownloadTableExcel
            filename="Relacion de negocios"
            sheet="negocios"
            currentTableRef={tableRef.current}
          >
            <button style={{ minWidth: 150 }}><FontAwesomeIcon icon={faTable} /> Exportar a Excel</button>
          </DownloadTableExcel>
          <button style={{minWidth: 150}} onClick={onClick}><FontAwesomeIcon icon={faArrowsRotate}/> Refrescar</button>
          <Searcher objects={zone} setResult={setZone} zone={select} setZone={setSelect} />
          {employee.role === 'admin' ? 
            <select id="zonesFilter" name="zonesFilter" onChange={onSelect} value={select}>
              <option value="todo">TODO</option>
              {zones.map((zone, index) => <option key={index} value={zone.prefix}>{zone.zone}</option>)}
            </select>
          : null}
        </div>
        <div className="main">
          <BusinessTable ref={tableRef} business={zone} />
        </div>
      </>
    </Layout>
  ) 
}
