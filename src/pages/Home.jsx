import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
            <span className="font-semibold text-lg">Flames Shop</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/shop" className="text-slate-300 hover:text-white">Shop</Link>
            <Link to="/login" className="text-slate-300 hover:text-white">Login</Link>
          </nav>
        </header>

        <section className="mt-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">Your next favorite products</h1>
            <p className="mt-4 text-slate-300">Browse a curated catalog, add to cart, and checkout with a simple flow. Seed demo items to explore instantly.</p>
            <div className="mt-8 flex gap-3">
              <Link to="/shop" className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-lg">Start shopping</Link>
              <a href="/test" className="bg-slate-800 border border-white/10 px-5 py-3 rounded-lg">System check</a>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop" alt="Hero" className="rounded-lg object-cover" />
          </div>
        </section>
      </div>
    </div>
  )
}
