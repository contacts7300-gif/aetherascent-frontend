import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Dashboard from "./pages/Dashboard"
import History from "./pages/History"
import Analytics from "./pages/Analytics"
import Admin from "./pages/Admin"

const API = "https://web-production-09eba.up.railway.app"

export default function App() {
  const [page, setPage] = useState("dashboard")
  const [signals, setSignals] = useState([])
  const [analytics, setAnalytics] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [sigRes, anaRes] = await Promise.all([
        fetch(`${API}/api/signals`),
        fetch(`${API}/api/analytics`)
      ])
      const sigData = await sigRes.json()
      const anaData = await anaRes.json()
      if (sigData.success) setSignals(sigData.signals)
      if (anaData.success) setAnalytics(anaData.analytics)
    } catch (err) {
      console.error("Failed:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  const nav = [
    { id: "dashboard", label: "Live Signals" },
    { id: "history", label: "History" },
    { id: "analytics", label: "Analytics" },
    { id: "admin", label: "Admin" }
  ]

  return (
    <div style={{ minHeight: "100vh", background: "#070708", color: "#f4f4f5", fontFamily: "'Inter', system-ui, sans-serif", WebkitFontSmoothing: "antialiased" }}>
      
      {/* Premium Ambient Radial Glow */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "1400px", height: "320px", background: "radial-gradient(50% 50% at 50% 0%, rgba(99, 102, 241, 0.07) 0%, rgba(0, 0, 0, 0) 100%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Glassmorphic Navigation Bar */}
      <nav style={{ background: "rgba(10, 11, 13, 0.75)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", padding: "0 24px", display: "flex", alignItems: "center", height: "56px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginRight: "32px" }}>
          <div style={{ width: "26px", height: "26px", background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px", color: "#fff", boxShadow: "0 0 12px 0 rgba(99, 102, 241, 0.25)" }}>Æ</div>
          <span style={{ fontWeight: 600, fontSize: "14px", letterSpacing: "-0.01em", color: "#ffffff" }}>
            Aether<span style={{ color: "#a5b4fc", fontWeight: 500 }}>Ascent</span>
          </span>
        </div>

        {/* Premium Tabs */}
        <div style={{ display: "flex", gap: "4px" }}>
          {nav.map(n => {
            const isActive = page === n.id
            return (
              <button 
                key={n.id} 
                onClick={() => setPage(n.id)} 
                className="nav-tab-btn"
                style={{ 
                  padding: "6px 14px", 
                  borderRadius: "6px", 
                  border: "none", 
                  cursor: "pointer", 
                  fontSize: "13px", 
                  fontWeight: 500, 
                  background: isActive ? "rgba(255, 255, 255, 0.07)" : "transparent", 
                  color: isActive ? "#ffffff" : "#88888f",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                {n.label}
              </button>
            )
          })}
        </div>

        {/* Live System Indicator */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.06)", border: "1px solid rgba(16, 185, 129, 0.15)", padding: "4px 10px", borderRadius: "99px", fontSize: "11px", color: "#34d399", fontWeight: 600, letterSpacing: "0.05em" }}>
          <span className="live-pulse" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>LIVE
        </div>
      </nav>

      {/* Main Content Layout Wrapper */}
      <main style={{ maxWidth: "1150px", margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 1 }}>
        {loading ? (
          <div style={{ padding: "140px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <div className="skeleton-spinner" style={{ width: "24px", height: "24px", border: "2px solid rgba(255,255,255,0.05)", borderTopColor: "#6366f1", borderRadius: "50%" }}></div>
            <div style={{ fontSize: "13px", color: "#88888f", fontWeight: 500 }}>AetherAscent Intelligence System loading...</div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {page === "dashboard" && <Dashboard signals={signals.filter(s => s.status === "OPEN")} analytics={analytics} />}
              {page === "history" && <History signals={signals.filter(s => s.status !== "OPEN")} />}
              {page === "analytics" && <Analytics signals={signals} analytics={analytics} />}
              {page === "admin" && <Admin API={API} fetchData={fetchData} />}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      <Footer />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { font-family: 'Inter', sans-serif; outline: none; }
        .nav-tab-btn:hover { color: #ffffff !important; background: rgba(255, 255, 255, 0.04) !important; }
        .live-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .skeleton-spinner { animation: spin 0.8s linear infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .4; transform: scale(0.95); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

function Footer() {
  const links = [
    { name: "Telegram", url: "https://t.me/AetherAscent", icon: "✈️" },
    { name: "X / Twitter", url: "https://x.com/AscentAether", icon: "𝕏" },
    { name: "Reddit", url: "https://www.reddit.com/u/Aether_Ascent", icon: "👽" },
    { name: "Medium", url: "https://medium.com/@ascentaether", icon: "📝" }
  ]
  
  return (
    <footer style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)", marginTop: "80px", padding: "32px 24px", background: "#0a0b0d" }}>
      <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
          {links.map(l => (
            <a 
              key={l.name} 
              href={l.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link-chip"
              style={{ 
                display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", 
                background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", 
                borderRadius: "8px", color: "#88888f", fontSize: "12px", fontWeight: 500, 
                textDecoration: "none", transition: "all 0.2s ease"
              }}
            >
              <span>{l.icon}</span>{l.name}
            </a>
          ))}
        </div>
        <div style={{ fontSize: "11px", color: "#4b4b52", textAlign: "center" }}>
          © 2026 AetherAscent Intelligence System · Enterprise Signal Terminal. All rights reserved.
        </div>
      </div>
      <style>{`
        .footer-link-chip:hover { color: #ffffff !important; background: rgba(255, 255, 255, 0.05) !important; border-color: rgba(255, 255, 255, 0.12) !important; transform: translateY(-1px); }
      `}</style>
    </footer>
  )
}
