import { Notifiers } from "../models"

export const fetchNotifiers = async () => {
  const res = await fetch('/api/notifiers')
  return res
}

export const getNotifier = async (id: number) => {
  const res = await fetch(`/api/notifiers/${id}`)
  return res
}

export const createNotifier = async (data: Notifiers) => {
  const res = await fetch('/api/notifiers/create-notifier', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return res
}

export const updateNotifier = async (data: Notifiers, id: number) => {
  await fetch(`/api/notifiers/update-notifier/${id}`, { 
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const deleteNotifier = async (id: number) => {
  await fetch(`/api/notifiers/delete/${id}`, { method: 'DELETE' })
  const res = await fetchNotifiers()
  return res
}
