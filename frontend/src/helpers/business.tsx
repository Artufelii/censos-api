import { Business } from "../models"

export const fetchBusiness = async () => {
  const res = await fetch("/api/business")
  return res
}

export const getBusiness = async (id: number) => {
  const res = await fetch(`/api/business/${id}`)
  return res
}

export const createBusiness = async (data: Business) => {
  await fetch('/api/business/create', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const updateBusiness = async (data: Business, id: number) => {
  await fetch(`/api/business/update/${id}`, { 
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const deleteBusiness = async (id: number) => {
  await fetch(`/api/business/delete/${id}`, { method: 'DELETE' })
  const res = await fetchBusiness() 
  return res
}
