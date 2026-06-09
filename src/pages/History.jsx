export default function History({ signals }) {
  const sc = { TP1_HIT:"#00e896", TP2_HIT:"#00e896", SL_HIT:"#ff4d6a" }
  const sl = { TP1_HIT:"TP1 ✓", TP2_HIT:"TP2 🎯", SL_HIT:"SL ✗" }
  return (
    <div>
      <h1 style={{ fontSize:"18px", fontWeight:700, marginBottom:"4px" }}>Trade History</h1>
      <p style={{ fontSize:"12px", color:"#4a5568", marginBottom:"20px" }}>All closed signals</p>
      {signals.length===0 ? (
        <div style={{ textAlign:"center", padding:"60px", background:"#0f1215", borderRadius:"12px", border:"1px solid #1e2535", color:"#4a5568" }}>No closed trades yet.</div>
      ) : (
        <div style={{ background:"#0f1215", border:"1px solid #1e2535", borderRadius:"12px", overflow:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"12px" }}>
            <thead>
              <tr>{["Pair","Dir","Entry","SL","TP1","TP2","Pips","Conf","Result","Date"].map(h=>(
                <th key={h} style={{ padding:"10px 12px", fontSize:"10px", color:"#4a5568", fontWeight:600, textAlign:"left", textTransform:"uppercase", borderBottom:"1px solid #1e2535" }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {signals.map(s=>(
                <tr key={s.id} style={{ borderBottom:"1px solid #1e2535" }}>
                  <td style={{ padding:"10px 12px", fontWeight:600 }}>{s.pair}</td>
                  <td style={{ padding:"10px 12px", color:s.direction==="BUY"?"#00e896":"#ff4d6a", fontWeight:600 }}>{s.direction}</td>
                  <td style={{ padding:"10px 12px", fontFamily:"monospace" }}>{s.entry}</td>
                  <td style={{ padding:"10px 12px", fontFamily:"monospace", color:"#ff4d6a" }}>{s.sl}</td>
                  <td style={{ padding:"10px 12px", fontFamily:"monospace", color:"#00e896" }}>{s.tp1}</td>
                  <td style={{ padding:"10px 12px", fontFamily:"monospace", color:"#00e896" }}>{s.tp2}</td>
                  <td style={{ padding:"10px 12px", fontFamily:"monospace", color:s.pips_result>=0?"#00e896":"#ff4d6a" }}>{s.pips_result>=0?"+":""}{s.pips_result}</td>
                  <td style={{ padding:"10px 12px", fontFamily:"monospace" }}>{s.confidence}%</td>
                  <td style={{ padding:"10px 12px" }}><span style={{ fontSize:"10px", padding:"2px 7px", borderRadius:"4px", fontWeight:600, background:(sc[s.status]||"#7a8ba0")+"20", color:sc[s.status]||"#7a8ba0" }}>{sl[s.status]||s.status}</span></td>
                  <td style={{ padding:"10px 12px", color:"#4a5568" }}>{new Date(s.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
