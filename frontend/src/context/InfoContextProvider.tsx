import { ReactElement, useState } from "react";
import { Business, Employee, Notifiers, Zones } from "../models";
import { InfoContext } from "./InfoContext";

interface InfoContextProps {
  children: JSX.Element
}

export function InfoContextProvider({ children }: InfoContextProps ): ReactElement {
  const [business, setBusiness] = useState<Business[]>([])
  const [zones, setZones] = useState<Zones[]>([])
  const [notifiers, setNotifiers] = useState<Notifiers[]>([])
  const [employee, setEmployee] = useState<Employee>({
    userid: '',
    name: '',
    zone: '',
    role: '',
    exp: 0
  })

  return (
    <InfoContext.Provider value={{
        business, setBusiness,
        zones, setZones,
        notifiers, setNotifiers,
        employee, setEmployee
      }}>
      { children }
    </InfoContext.Provider>
  )
}
