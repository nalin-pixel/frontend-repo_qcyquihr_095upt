import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/api/products/${id}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setProduct(data)
      } catch (e) {
        setError('Product not found')
      }
      setLoading(false)
    }
    run()
  }, [id])

  if (loading) return <div className="min-h-screen grid place-items-center text-slate-300">Loading...</div>
  if (error) return <div className="min-h-screen grid place-items-center text-red-300">{error}</div>

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-slate-300 hover:text-white">Home</Link>
          <Link to="/shop" className="text-slate-300 hover:text-white">Back to shop</Link>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="aspect-square bg-slate-800 rounded-xl overflow-hidden">
              {product.image && <img src={product.image} alt={product.title} className="w-full h-full object-cover" />}
            </div>
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <img key={i} src={img} className="h-20 w-full object-cover rounded-lg border border-white/10" />
                ))}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-slate-300 mt-2">{product.description}</p>
            <div className="text-2xl text-blue-300 font-extrabold mt-4">${product.price.toFixed(2)}</div>
            <a href={`/shop`} className="mt-6 inline-block bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-lg">Add to cart from shop</a>
          </div>
        </div>
      </div>
    </div>
  )
}
