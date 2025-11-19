import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function SeedControls({ onSeed }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const seed = async () => {
    setLoading(true)
    setMessage('')
    const res = await fetch(`${API_BASE}/api/products/seed`, { method: 'POST' })
    const data = await res.json()
    if (res.ok) {
      setMessage(`Added ${data.inserted} products`)
      onSeed?.()
    } else {
      setMessage('Seed failed')
    }
    setLoading(false)
  }

  return (
    <div className="bg-slate-800/40 border border-white/10 rounded-xl p-4 flex items-center gap-3 text-slate-300">
      <button onClick={seed} disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white px-3 py-1.5 rounded-lg">{loading ? 'Seeding...' : 'Quick add demo products'}</button>
      {message && <span className="text-sm">{message}</span>}
    </div>
  )
}

export default SeedControls
