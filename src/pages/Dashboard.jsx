export default function Dashboard({ signals, analytics }) {
  const stats = [
    { label:"Win Rate", value:`${analytics.winRate||0}%`, color:"#00e896" },
    { label:"Total Pips", value:`${(analytics.totalPips||0)>=0?"+":""}${analytics.totalPips||0}`, color:"#00e896" },
    { label:"Open Signals", value:signals.length, color:"#0099ff" },
    { label:"Total Signals", value:analytics.totalSignals||0, color:"#e8edf5" },
    { label:"Wins / Losses", value:`${analytics.wins||0} / ${analytics.losses||0}`, color:"#a78bfa" }
  ]
  return (
    <div>
      <div style={{ marginBottom:"20px" }}>
        <h1 style={{ fontSize:"18px", fontWeight:700, marginBottom:"4px" }}>Live Signal Dashboard</h1>
        <p style={{ fontSize:"12px", color:"#4a5568" }}>AetherAscent Intelligence System · Updates every hour</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"10px", marginBottom:"20px" }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:"#0f1215", border:"1px solid #1e2535", borderRadius:"10px", padding:"14px" }}>
            <div style={{ fontSize:"10px", color:"#4a5568", fontWeight:600, textTransform:"uppercase", marginBottom:"6px" }}>{s.label}</div>
            <div style={{ fontSize:"18px", fontWeight:700, color:s.color, fontFamily:"monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>
      {signals.length===0 ? (
        <div style={{ textAlign:"center", padding:"60px", background:"#0f1215", borderRadius:"12px", border:"1px solid #1e2535", color:"#4a5568" }}>
          <div style={{ fontSize:"28px", marginBottom:"10px" }}>🔍</div>
          <div style={{ fontSize:"14px", fontWeight:500, marginBottom:"4px" }}>No open signals right now</div>
          <div style={{ fontSize:"12px" }}>AetherAscent scans every hour. Next scan coming soon.</div>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"12px" }}>
          {signals.map(s => <SignalCard key={s.id} signal={s} />)}
        </div>
      )}
    </div>
  )
}

function SignalCard({ signal:s }) {
  const buy = s.direction==="BUY"
  const c = buy?"#00e896":"#ff4d6a"
  return (
    <div style={{ background:"#0f1215", border:"1px solid #1e2535", borderLeft:`3px solid ${c}`, borderRadius:"12px", padding:"16px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
        <span style={{ fontSize:"15px", fontWeight:700 }}>{s.pair}</span>
        <span style={{ padding:"2px 8px", borderRadius:"5px", fontSize:"10px", fontWeight:700, background:buy?"#001a12":"#1a0010", color:c }}>{s.direction}</span>
        <span style={{ marginLeft:"auto", fontSize:"10px", color:"#4a5568" }}>{new Date(s.created_at).toLocaleTimeString()}</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"8px", marginBottom:"12px" }}>
        {[["Entry",s.entry,"#e8edf5"],["Stop Loss",s.sl,"#ff4d6a"],["TP1",s.tp1,"#00e896"],["TP2",s.tp2,"#00e896"],["R:R",s.rr,"#a78bfa"],["Conf",s.confidence+"%",c]].map(([l,v,col])=>(
          <div key={l}>
            <div style={{ fontSize:"9px", color:"#4a5568", fontWeight:600, textTransform:"uppercase", marginBottom:"2px" }}>{l}</div>
            <div style={{ fontSize:"12px", fontWeight:600, fontFamily:"monospace", color:col }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ background:"#141820", borderRadius:"6px", padding:"8px 10px", fontSize:"11px", color:"#7a8ba0", lineHeight:"1.6", borderLeft:"2px solid #8b5cf6" }}>{s.short_reason}</div>
      <div style={{ marginTop:"8px" }}>
        <div style={{ height:"4px", background:"#1a2030", borderRadius:"2px", overflow:"hidden" }}>
          <div style={{ height:"100%", width:s.confidence+"%", background:c, borderRadius:"2px" }}></div>
        </div>
        <div style={{ fontSize:"10px", color:"#4a5568", marginTop:"3px" }}>{s.confidence}% confidence</div>
      </div>
    </div>
  )
}
