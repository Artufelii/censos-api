import type { ReactElement } from "react"
import { Routes, Route } from "react-router-dom"
import { InfoContextProvider } from "../context/InfoContextProvider"
import { Main, Notifiers, Zones, NewBusiness, NewZone, NewNotifier, Login } from "../screens"
import {UpdatePassword} from "../screens/UpdatePassword"

export function MainRouter(): ReactElement {
  return (
    <InfoContextProvider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="notifiers" element={<Notifiers />} />
        <Route path="zones" element={<Zones />} />
        <Route path="login" element={<Login />} />
        <Route path="new-business" element={<NewBusiness />}>
          <Route path=":id" element={<NewBusiness />} />
        </Route>
        <Route path="new-zone" element={<NewZone />}>
          <Route path=":id" element={<NewZone />} />
        </Route>
        <Route path="new-notifier" element={<NewNotifier />}>
          <Route path=":id" element={<NewNotifier />} />
        </Route>
        <Route path="update-password" element={<UpdatePassword />}>
          <Route path=":username" element={<UpdatePassword />} />
        </Route>
      </Routes>
    </InfoContextProvider>
  ) 
}
