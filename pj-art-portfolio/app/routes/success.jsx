import { useEffect } from "react";
import { Link } from "react-router";
import Navbar from "../components/navbar";
import { useCart } from "../components/cart-context";

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart on successful purchase
    clearCart();
  }, [clearCart]);

  return (
    <main className="text-white min-h-screen">
      <Navbar />

      <div className="pt-32 pb-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-effect rounded-2xl p-8 md:p-12">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-mono gradient-text mb-4">
                Payment Successful!
              </h1>
              <p className="text-gray-300 text-lg">
                Thank you for your purchase. Your order has been confirmed.
              </p>
            </div>

            <div className="space-y-4 mt-8">
              <p className="text-gray-400 text-sm">
                You will receive an email confirmation shortly with your order details.
              </p>

              <Link
                to="/gallery"
                className="modern-button py-3 px-8 rounded-xl font-mono text-white hover:scale-105 transition-all duration-300 inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
