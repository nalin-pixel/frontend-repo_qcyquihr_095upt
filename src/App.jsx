import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import SeedControls from './components/SeedControls'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('')
  const [query, setQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (query) params.append('q', query)
    const res = await fetch(`${API_BASE}/api/products?${params.toString()}`)
    const data = await res.json()
    setProducts(data)
    setLoading(false)
  }

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id)
      if (existing) {
        return prev.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const onCheckout = async ({ total, card_last4 }) => {
    if (cart.length === 0) return
    try {
      // 1) Charge payment (mock)
      const payRes = await fetch(`${API_BASE}/api/payments/charge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, currency: 'usd', card_last4 })
      })
      if (!payRes.ok) {
        const err = await payRes.json().catch(() => ({}))
        alert(err.detail || 'Payment failed')
        return
      }

      // 2) Create order
      const payload = {
        customer_name: 'Guest',
        customer_email: 'guest@example.com',
        customer_address: 'N/A',
        items: cart.map(c => ({ product_id: c.id, title: c.title, price: c.price, quantity: c.quantity, image: c.image })),
      }
      const res = await fetch(`${API_BASE}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) {
        const data = await res.json()
        alert(`Payment successful. Order placed! Total: $${data.total.toFixed(2)}`)
        setCart([])
        setCartOpen(false)
      } else {
        alert('Order failed after payment—please contact support')
      }
    } catch (e) {
      alert('Checkout failed. Please try again.')
    }
  }

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category))
    return ['All', ...Array.from(set)]
  }, [products])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar onCartClick={() => setCartOpen(true)} cartCount={cart.reduce((s,i)=>s+i.quantity,0)} />

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Discover Products</h1>
          <p className="text-slate-300">Browse the catalog and add your favorites to the cart.</p>
        </div>

        <div className="mb-4">
          <SeedControls onSeed={fetchProducts} />
        </div>

        <div className="grid sm:flex items-center gap-3 bg-slate-800/40 border border-white/10 rounded-xl p-4 mb-6">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search products..." className="flex-1 bg-slate-900 text-white placeholder:text-slate-500 rounded-lg px-4 py-2 border border-white/10" />
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className="bg-slate-900 text-white rounded-lg px-4 py-2 border border-white/10">
            {categories.map((c, idx) => <option key={idx} value={c === 'All' ? '' : c}>{c}</option>)}
          </select>
          <button onClick={fetchProducts} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg">Apply</button>
        </div>

        {loading ? (
          <div className="text-center text-slate-400">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-slate-400">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </section>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart} onCheckout={onCheckout} />
    </div>
  )
}

export default App
