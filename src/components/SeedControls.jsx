import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function SeedControls({ onSeed }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    images: '' // comma-separated
  })
  const [creating, setCreating] = useState(false)
  const [createMsg, setCreateMsg] = useState('')

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

  const seedMore = async () => {
    setLoading(true)
    setMessage('')
    const res = await fetch(`${API_BASE}/api/products/seed_more`, { method: 'POST' })
    const data = await res.json().catch(()=>({}))
    if (res.ok) {
      setMessage(`Added ${data.inserted} products`)
      onSeed?.()
    } else {
      setMessage('Seeding more products failed')
    }
    setLoading(false)
  }

  const createProduct = async (e) => {
    e.preventDefault()
    setCreating(true)
    setCreateMsg('')
    try {
      const payload = {
        title: form.title,
        description: form.description || undefined,
        price: parseFloat(form.price || '0'),
        category: form.category || 'General',
        image: form.image || undefined,
        images: form.images ? form.images.split(',').map(s=>s.trim()).filter(Boolean) : undefined,
        in_stock: true
      }
      const res = await fetch(`${API_BASE}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json().catch(()=>({}))
      if (res.ok) {
        setCreateMsg('Product created')
        setForm({ title: '', description: '', price: '', category: '', image: '', images: '' })
        onSeed?.()
      } else {
        setCreateMsg(data?.detail || 'Create failed')
      }
    } catch (e) {
      setCreateMsg('Create failed')
    }
    setCreating(false)
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/40 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 text-slate-300">
        <div className="flex gap-2">
          <button onClick={seed} disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white px-3 py-1.5 rounded-lg">{loading ? 'Seeding...' : 'Quick add demo products'}</button>
          <button onClick={seedMore} disabled={loading} className="bg-emerald-700 hover:bg-emerald-600 disabled:opacity-60 text-white px-3 py-1.5 rounded-lg">{loading ? 'Working...' : 'Add more demo products'}</button>
        </div>
        {message && <span className="text-sm">{message}</span>}
      </div>

      <form onSubmit={createProduct} className="bg-slate-800/40 border border-white/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-200">
        <h3 className="md:col-span-2 text-white font-semibold">Create a new product</h3>
        <input value={form.title} onChange={e=>setForm(f=>({...f, title: e.target.value}))} placeholder="Title" className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-white/10" required />
        <input value={form.category} onChange={e=>setForm(f=>({...f, category: e.target.value}))} placeholder="Category" className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-white/10" required />
        <input value={form.price} onChange={e=>setForm(f=>({...f, price: e.target.value}))} placeholder="Price" type="number" step="0.01" className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-white/10" required />
        <input value={form.image} onChange={e=>setForm(f=>({...f, image: e.target.value}))} placeholder="Primary image URL" className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-white/10" />
        <input value={form.images} onChange={e=>setForm(f=>({...f, images: e.target.value}))} placeholder="Gallery image URLs (comma-separated)" className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-white/10 md:col-span-2" />
        <textarea value={form.description} onChange={e=>setForm(f=>({...f, description: e.target.value}))} placeholder="Description" className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-white/10 md:col-span-2" rows={3} />
        <div className="md:col-span-2 flex items-center gap-3">
          <button disabled={creating} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white px-4 py-2 rounded-lg">{creating ? 'Creating...' : 'Create product'}</button>
          {createMsg && <span className="text-sm text-slate-300">{createMsg}</span>}
        </div>
      </form>
    </div>
  )
}

export default SeedControls
