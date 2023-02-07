import { Zones } from "../models"

export const fetchZones = async () => {
  const res = await fetch('/api/zones')
  return res
}

export const getZone = async (id: number) => {
  const res = await fetch(`/api/zones/${id}`)
  return res
}

export const createZone = async (data: Zones) => {
  await fetch('/api/zones/create-zone', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const updateZone = async (data: Zones, id: number) => {
  await fetch(`/api/zones/update-zone/${id}`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const deleteZone = async (id: number) => {
  await fetch(`/api/zones/delete/${id}`, { method: 'DELETE' })
  const res = await fetchZones()
  return res
}
