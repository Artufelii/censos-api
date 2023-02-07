import { createContext, Dispatch, SetStateAction } from 'react'
import { Business, Employee, Notifiers, Zones } from '../models'

type InfoContextType = {
  business: Business[] | [],
  setBusiness: Dispatch<SetStateAction<Business[]>>,
  zones: Zones[] | [],
  setZones: Dispatch<SetStateAction<Zones[]>>
  notifiers: Notifiers[] | [],
  setNotifiers: Dispatch<SetStateAction<Notifiers[]>>,
  employee: Employee,
  setEmployee: Dispatch<SetStateAction<Employee>>,
}

const infoContextState = {
  business: [],
  setBusiness: () => {},
  zones: [],
  setZones: () => {},
  notifiers: [],
  setNotifiers: () => {},
  employee: {
    userid: '',
    name: '',
    zone: '',
    role: '',
    exp: 0
  },
  setEmployee: () => {},
}

export const InfoContext = createContext<InfoContextType>(infoContextState)
