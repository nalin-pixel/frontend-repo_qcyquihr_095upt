import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const auth = btoa(`${email}:${password}`)
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Authorization': `Basic ${auth}` },
    })
    if (res.ok) {
      const data = await res.json()
      setMessage(`Welcome, ${data.name || data.email}!`)
    } else {
      setMessage('Invalid credentials')
    }
    setLoading(false)
  }

  const register = async () => {
    setLoading(true)
    setMessage('')
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (res.ok) {
      setMessage('Account created. You can now log in.')
    } else {
      const data = await res.json().catch(()=>({detail:'Error'}))
      setMessage(data.detail || 'Registration failed')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <form onSubmit={login} className="w-full max-w-sm bg-slate-900/60 border border-white/10 p-6 rounded-2xl text-white space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2" required />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2" required />
        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 rounded-lg py-2">{loading ? 'Loading...' : 'Login'}</button>
        <button type="button" onClick={register} disabled={loading} className="w-full bg-slate-700 hover:bg-slate-600 rounded-lg py-2">Create account</button>
        {message && <div className="text-sm text-slate-300">{message}</div>}
        <a href="/" className="text-slate-400 text-sm inline-block">Back home</a>
      </form>
    </div>
  )
}
