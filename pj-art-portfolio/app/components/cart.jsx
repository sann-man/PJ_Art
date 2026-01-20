import { MdClose, MdAdd, MdRemove, MdShoppingCart } from 'react-icons/md';
import { useCart } from './cart-context';

export default function Cart() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-end">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={toggleCart}
      />
      
      <div className="relative w-full max-w-md h-full glass-effect border-l border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
            <button
              onClick={toggleCart}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <MdClose className="text-white text-xl" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <MdShoppingCart className="text-6xl text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Your cart is empty</p>
              <p className="text-sm text-gray-500 mt-2">Add some artwork to get started</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="glass-effect p-4 rounded-xl">
                  <div className="flex gap-4">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                      <p className="text-gray-400 text-xs mt-1">{item.description}</p>
                      <p className="text-white font-bold mt-2">${item.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
                      >
                        <MdRemove className="text-white text-sm" />
                      </button>
                      <span className="text-white font-mono">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
                      >
                        <MdAdd className="text-white text-sm" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-700 space-y-4">
            <div className="flex justify-between text-lg font-bold text-white">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            
            <div className="space-y-3">
              <button className="modern-button w-full py-3 px-6 rounded-xl font-mono text-white hover:scale-105 transition-all duration-300">
                Checkout with Stripe
              </button>
              
              <button
                onClick={clearCart}
                className="w-full py-2 px-6 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-600/20 transition-all duration-300 text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}