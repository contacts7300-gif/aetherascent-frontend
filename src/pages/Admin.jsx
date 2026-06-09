import { useState } from "react"
export default function Admin({ API, fetchData }) {
  const [pw, setPw] = useState("")
  const [auth, setAuth] = useState(false)
  const [msg, setMsg] = useState("")
  const [scanning, setScanning] = useState(false)
  const [form, setForm] = useState({ pair:"EUR/USD", direction:"BUY", entry:"", sl:"", tp1:"", tp2:"", confidence:"85", short_reason:"" })

  if (!auth) return (
    <div style={{ maxWidth:"340px", margin:"60px auto" }}>
      <div style={{ background:"#0f1215", border:"1px solid #1e2535", borderRadius:"12px", padding:"28px" }}>
        <div style={{ fontSize:"15px", fontWeight:700, marginBottom:"16px", textAlign:"center" }}>Admin Access</div>
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Admin password"
          style={{ width:"100%", background:"#141820", border:"1px solid #253045", borderRadius:"7px", padding:"9px 12px", color:"#e8edf5", fontSize:"13px", marginBottom:"10px", outline:"none" }} />
        <button onClick={()=>{ if(pw==="aetherascent_admin_2024") setAuth(true); else setMsg("Wrong password") }}
          style={{ width:"100%", padding:"10px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:"7px", color:"#fff", fontWeight:600, cursor:"pointer" }}>Login</button>
        {msg && <div style={{ marginTop:"8px", fontSize:"12px", color:"#ff4d6a", textAlign:"center" }}>{msg}</div>}
      </div>
    </div>
  )

  const submit = async () => {
    try {
      const res = await fetch(`${API}/api/admin/signal`, { method:"POST", headers:{ "Content-Type":"application/json", "x-admin-password":pw }, body:JSON.stringify(form) })
      const d = await res.json()
      if(d.success){ setMsg("Signal posted to Telegram!"); fetchData() } else setMsg("Error: "+d.error)
    } catch { setMsg("Network error") }
  }

  const scan = async () => {
    setScanning(true)
    try {
      await fetch(`${API}/api/admin/scan`, { method:"POST", headers:{ "x-admin-password":pw } })
      setMsg("Scan triggered!")
      setTimeout(fetchData, 15000)
    } catch { setMsg("Failed") }
    setScanning(false)
  }

  const inp = (field, ph) => (
    <input value={form[field]} onChange={e=>setForm({...form,[field]:e.target.value})} placeholder={ph}
      style={{ width:"100%", background:"#141820", border:"1px solid #253045", borderRadius:"7px", padding:"8px 12px", color:"#e8edf5", fontSize:"12px", marginBottom:"8px", outline:"none", fontFamily:"inherit" }} />
  )

  return (
    <div>
      <h1 style={{ fontSize:"18px", fontWeight:700, marginBottom:"4px" }}>Admin Panel</h1>
      <p style={{ fontSize:"12px", color:"#4a5568", marginBottom:"20px" }}>AetherAscent control center</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
        <div style={{ background:"#0f1215", border:"1px solid #1e2535", borderRadius:"12px", padding:"18px" }}>
          <div style={{ fontSize:"11px", fontWeight:600, color:"#7a8ba0", textTransform:"uppercase", marginBottom:"14px" }}>Create Manual Signal</div>
          <select value={form.pair} onChange={e=>setForm({...form,pair:e.target.value})} style={{ width:"100%", background:"#141820", border:"1px solid #253045", borderRadius:"7px", padding:"8px 12px", color:"#e8edf5", fontSize:"12px", marginBottom:"8px", outline:"none" }}>
            {["EUR/USD","GBP/USD","USD/JPY","AUD/USD","USD/CAD","GBP/JPY","EUR/GBP"].map(p=><option key={p}>{p}</option>)}
          </select>
          <select value={form.direction} onChange={e=>setForm({...form,direction:e.target.value})} style={{ width:"100%", background:"#141820", border:"1px solid #253045", borderRadius:"7px", padding:"8px 12px", color:"#e8edf5", fontSize:"12px", marginBottom:"8px", outline:"none" }}>
            <option>BUY</option><option>SELL</option>
          </select>
          {inp("entry","Entry")}
          {inp("sl","Stop Loss")}
          {inp("tp1","TP1")}
          {inp("tp2","TP2")}
          {inp("short_reason","Reason")}
          <button onClick={submit} style={{ width:"100%", padding:"10px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:"7px", color:"#fff", fontWeight:600, cursor:"pointer" }}>Post to Telegram</button>
        </div>
        <div style={{ background:"#0f1215", border:"1px solid #1e2535", borderRadius:"12px", padding:"18px" }}>
          <div style={{ fontSize:"11px", fontWeight:600, color:"#7a8ba0", textTransform:"uppercase", marginBottom:"14px" }}>System Controls</div>
          <button onClick={scan} disabled={scanning} style={{ width:"100%", padding:"12px", background:"#001a12", border:"1px solid #00e89630", borderRadius:"8px", color:"#00e896", fontWeight:600, cursor:"pointer", fontSize:"13px", marginBottom:"10px" }}>
            {scanning?"Scanning...":"🔍 Trigger Manual Scan"}
          </button>
          <div style={{ fontSize:"11px", color:"#4a5568", lineHeight:"1.8", padding:"12px", background:"#141820", borderRadius:"8px" }}>
            ✅ Auto scan: every 1 hour<br/>
            ✅ TP/SL check: every 15 min<br/>
            ✅ Daily summary: 9 PM PKT<br/>
            ✅ Min confidence: 80%<br/>
            ✅ Pairs: 7 major Forex
          </div>
        </div>
      </div>
      {msg && <div style={{ marginTop:"16px", padding:"12px", background:"#001a12", border:"1px solid #00e89620", borderRadius:"8px", fontSize:"13px", color:"#00e896" }}>{msg}</div>}
    </div>
  )
}
