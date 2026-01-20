import { useState } from "react";
import { supabase } from "../../supabaseClient";
import Navbar from "../components/navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <main className="min-h-screen text-white">
      <Navbar />
      <div className="pt-20 md:pt-24 pb-12 px-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-mono gradient-text text-shadow-glow">LOGIN</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 glass-effect p-8 rounded-lg">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="group">
              <label className="block text-white text-sm font-mono mb-2" htmlFor="email">
                EMAIL
              </label>
              <input
                className="w-full py-3 px-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                         transition-all duration-300 ease-in-out"
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="group">
              <label className="block text-white text-sm font-mono mb-2" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="w-full py-3 px-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                         transition-all duration-300 ease-in-out"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="modern-button w-full py-3 px-6 rounded-lg font-mono text-white
                       hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}