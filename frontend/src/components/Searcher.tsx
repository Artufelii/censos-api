import {faSearch} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { ChangeEvent, Dispatch, ReactElement, SetStateAction, SyntheticEvent, useState } from "react"
import {fetchBusiness} from "../helpers"
import {Business} from "../models"
import '../styles/Searcher.css'

interface SearcherProps {
  objects: Business[],
  setResult: Dispatch<SetStateAction<Business[]>>,
  zone: string,
  setZone: Dispatch<SetStateAction<string>>
}

export function Searcher({ objects, setResult, zone, setZone }: SearcherProps): ReactElement {
  const [search, setSearch] = useState('');
  
  const onSearch = (e: SyntheticEvent) => {
    e.preventDefault()

    const result = objects.filter(object => {
      return(
        search.toUpperCase() === object.folio?.toUpperCase() ||
        search.toUpperCase() === object.contrato.toUpperCase() ||
        search.toUpperCase() === object.giro.toUpperCase() ||
        search.toUpperCase() === object.nombre.toUpperCase() ||
        search.toUpperCase() === object.zona.toUpperCase() 
      )
    })

    setResult(result)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)

    if(e.target.value === '' && zone !== 'todo') {
      setZone(zone)
      fetchBusiness()
        .then(res => res.json())
        .then((json: Array<Business>) => {
          setResult(json.filter(b => b.zona === zone))
        })
    }

    if(e.target.value === '' && zone === 'todo') {
      setZone('todo')
      fetchBusiness()
        .then(res => res.json())
        .then(setResult)
    }
  }

  return(
    <form className="searcher" onSubmit={onSearch}>
      <input type="text" placeholder="Buscar Negocio" onChange={handleSearch} />
      <button><FontAwesomeIcon icon={faSearch} /></button>
    </form>
  ) 
}
