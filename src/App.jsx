import { useState, useEffect } from "react"
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
    <div style={{ minHeight:"100vh", background:"#0a0c0f", color:"#e8edf5", fontFamily:"Inter,sans-serif" }}>
      <nav style={{ background:"#0f1215", borderBottom:"1px solid #1e2535", padding:"0 20px", display:"flex", alignItems:"center", height:"52px", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginRight:"20px" }}>
          <div style={{ width:"28px", height:"28px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius:"7px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"13px" }}>Æ</div>
          <span style={{ fontWeight:700, fontSize:"14px" }}>Aether<span style={{ color:"#8b5cf6" }}>Ascent</span></span>
        </div>
        <div style={{ display:"flex", gap:"2px" }}>
          {nav.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{ padding:"5px 12px", borderRadius:"6px", border:"none", cursor:"pointer", fontSize:"12px", fontWeight:500, background:page===n.id?"#1a2030":"transparent", color:page===n.id?"#e8edf5":"#7a8ba0" }}>{n.label}</button>
          ))}
        </div>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"5px", background:"#001a10", border:"1px solid #00e89620", padding:"3px 10px", borderRadius:"20px", fontSize:"11px", color:"#00e896", fontWeight:600 }}>
          <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#00e896", display:"inline-block" }}></span>LIVE
        </div>
      </nav>
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"20px" }}>
        {loading ? (
          <div style={{ textAlign:"center", padding:"80px", color:"#4a5568" }}>AetherAscent loading...</div>
        ) : (
          <>
            {page==="dashboard" && <Dashboard signals={signals.filter(s=>s.status==="OPEN")} analytics={analytics} />}
            {page==="history" && <History signals={signals.filter(s=>s.status!=="OPEN")} />}
            {page==="analytics" && <Analytics signals={signals} analytics={analytics} />}
            {page==="admin" && <Admin API={API} fetchData={fetchData} />}
          </>
        )}
      </div>
      <Footer />
      <style>{`*{box-sizing:border-box;margin:0;padding:0} button{font-family:Inter,sans-serif} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
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
    <footer style={{ borderTop: "1px solid #1e2535", marginTop: "40px", padding: "24px 20px", textAlign: "center" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "12px" }}>
          {links.map(l => (
            <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", background: "#0f1215", border: "1px solid #1e2535", borderRadius: "8px", color: "#7a8ba0", fontSize: "12px", fontWeight: 500, textDecoration: "none" }}>
              <span>{l.icon}</span>{l.name}
            </a>
          ))}
        </div>
        <div style={{ fontSize: "11px", color: "#4a5568" }}>
          © 2026 AetherAscent Intelligence System · Follow us for live signals
        </div>
      </div>
    </footer>
  )
}
