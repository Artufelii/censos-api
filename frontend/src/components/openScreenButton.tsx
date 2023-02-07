import type { ReactElement } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconLookup } from '@fortawesome/fontawesome-svg-core'
import '../styles/Button.css'
import {useNavigate} from "react-router-dom"

type openScreenButton = {
  text: string,
  icon:  IconLookup,
  path: string, 
}

export function Button({ text, icon, path }: openScreenButton): ReactElement {
  const navigate = useNavigate()

  return(
    <button onClick={() => navigate(path)}>
      <FontAwesomeIcon icon={icon}/>
      {text}
    </button>
  ) 
}
