export default function Analytics({ signals, analytics }) {
  const cards = [
    { label:"Win Rate", value:`${analytics.winRate||0}%`, color:"#00e896" },
    { label:"Total Pips", value:`${(analytics.totalPips||0)>=0?"+":""}${analytics.totalPips||0}`, color:"#00e896" },
    { label:"Total Signals", value:analytics.totalSignals||0, color:"#e8edf5" },
    { label:"Wins", value:analytics.wins||0, color:"#00e896" },
    { label:"Losses", value:analytics.losses||0, color:"#ff4d6a" },
    { label:"Open Now", value:analytics.openSignals||0, color:"#0099ff" }
  ]
  return (
    <div>
      <h1 style={{ fontSize:"18px", fontWeight:700, marginBottom:"4px" }}>Analytics</h1>
      <p style={{ fontSize:"12px", color:"#4a5568", marginBottom:"20px" }}>Platform performance</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px", marginBottom:"24px" }}>
        {cards.map(c=>(
          <div key={c.label} style={{ background:"#0f1215", border:"1px solid #1e2535", borderRadius:"10px", padding:"16px" }}>
            <div style={{ fontSize:"10px", color:"#4a5568", fontWeight:600, textTransform:"uppercase", marginBottom:"8px" }}>{c.label}</div>
            <div style={{ fontSize:"22px", fontWeight:700, color:c.color, fontFamily:"monospace" }}>{c.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background:"#0f1215", border:"1px solid #1e2535", borderRadius:"12px", padding:"20px" }}>
        <div style={{ fontSize:"11px", fontWeight:600, color:"#7a8ba0", textTransform:"uppercase", marginBottom:"12px" }}>Performance Chart</div>
        {signals.length===0 ? (
          <div style={{ color:"#4a5568", fontSize:"13px" }}>No data yet.</div>
        ) : (
          <div style={{ display:"flex", alignItems:"flex-end", gap:"6px", height:"100px" }}>
            {signals.slice(0,20).map((s,i)=>(
              <div key={i} style={{ flex:1 }}>
                <div style={{ width:"100%", height:Math.max(Math.abs(s.pips_result||0)/10,5)+"px", background:s.pips_result>=0?"#00e896":"#ff4d6a", borderRadius:"2px 2px 0 0", opacity:.8 }}></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
