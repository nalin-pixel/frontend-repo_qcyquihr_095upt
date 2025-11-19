import { Link } from 'react-router-dom'

function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-400/40 transition">
      <Link to={`/product/${product.id}`} className="block aspect-square bg-slate-900 overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
        ) : (
          <div className="text-slate-500 flex items-center justify-center h-full">No image</div>
        )}
      </Link>
      <div className="p-4">
        <h3 className="text-white font-semibold line-clamp-1">
          <Link to={`/product/${product.id}`} className="hover:underline">{product.title}</Link>
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 min-h-[40px]">{product.description || '—'}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-blue-300 font-bold">${product.price.toFixed(2)}</span>
          <button onClick={() => onAdd(product)} className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1.5 rounded-md">Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
