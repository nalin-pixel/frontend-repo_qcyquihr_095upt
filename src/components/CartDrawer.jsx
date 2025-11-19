function CartDrawer({ open, onClose, items, onCheckout }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  const tax = +(subtotal * 0.07).toFixed(2)
  const total = +(subtotal + tax).toFixed(2)

  return (
    <div className={`fixed inset-0 z-40 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-slate-900 border-l border-white/10 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-white/10 text-white font-semibold">Your cart</div>
        <div className="p-4 space-y-3 max-h-[70%] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-slate-400">Your cart is empty.</p>
          ) : (
            items.map((it, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-slate-800/50 border border-white/10 rounded-lg p-3">
                {it.image && <img src={it.image} alt={it.title} className="w-14 h-14 rounded object-cover" />}
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{it.title}</div>
                  <div className="text-slate-400 text-xs">Qty: {it.quantity}</div>
                </div>
                <div className="text-blue-300 font-semibold">${(it.price * it.quantity).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-white/10 text-sm text-slate-300 space-y-1">
          <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-white font-semibold text-base pt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button onClick={() => onCheckout({ subtotal, tax, total })} className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg">Checkout</button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
