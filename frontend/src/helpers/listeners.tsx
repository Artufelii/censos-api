export const verifyToken = async (tokenStr: string) => {
  const res = await fetch("/api/auth/verify-token", { 
    method: 'POST',
    body: tokenStr
  })

  return res
}
