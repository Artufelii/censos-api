import { ChangeEvent, ReactElement, SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/Login.css'

interface Login {
  username: string,
  password: string
}

interface LoginResponse {
  error?: string;
  token?: string;
}

export function Login(): ReactElement {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<Login>({
    username: '',
    password: ''
  })

  const login = async (data: Login): Promise<LoginResponse> => {
    const res = await fetch('/api/auth/login', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return await res.json()
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (data.username === data.password) {
      navigate(`/update-password/${data.username}`)
      return
    }

    const res: LoginResponse = await login(data)

    setLoading(true)
    
    if(res.error) setError(res.error)

    if(res.token) {
      localStorage.setItem('token', res.token)
      navigate("/")
    }

    setLoading(false)
  }

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-form">
        <h1>Sistema de Censos</h1>
        <input name="username" type="text" placeholder="Usuario" onChange={onChange} />
        <input name="password" type="password" placeholder="Contraseña" onChange={onChange} />
        <button type="submit" className={loading ? 'disabled' : undefined}>{loading ? '...Cargando' : 'Sign In'}</button>
        <p>{'' !== error ? error : ''}</p>
      </form>
    </div>
  ) 
}
