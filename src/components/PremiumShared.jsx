import React from 'react';

// 1. Premium Stat/Metric Card
export const PremiumMetricCard = ({ title, value, change, isPositive }) => {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden', borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.06)', background: '#121214',
      padding: '24px', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 4px 20px -4px rgba(0,0,0,0.3)'
    }} className="premium-card-hover">
      
      <p style={{ fontSize: '11px', fontWeight: 600, tracking: '0.05em', color: '#88888f', textTransform: 'uppercase' }}>{title}</p>
      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'baseline', justifyContent: 'between', width: '100%' }}>
        <h3 style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.02em', color: '#ffffff' }}>{value}</h3>
        {change && (
          <span style={{
            fontSize: '11px', fontFamily: 'monospace', padding: '2px 8px', borderRadius: '99px', marginLeft: 'auto',
            color: isPositive ? '#34d399' : '#f87171', background: isPositive ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)'
          }}>{change}</span>
        )}
      </div>
      <style>{`.premium-card-hover:hover { border-color: rgba(255,255,255,0.12) !important; transform: translateY(-1px); }`}</style>
    </div>
  );
};

// 2. High-Fidelity Data Table 
export const PremiumTable = ({ headers, children }) => {
  return (
    <div style={{
      overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)',
      background: '#121214', boxShadow: '0 8px 32px -4px rgba(0, 0, 0, 0.4)'
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(255, 255, 255, 0.01)' }}>
            {headers.map((h, i) => (
              <th key={i} style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 600, color: '#88888f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ width: '100%' }} className="table-body-rows">
          {children}
        </tbody>
      </table>
      <style>{`.table-body-rows tr { border-bottom: 1px solid rgba(255,255,255,0.03); transition: background 0.2s ease; } .table-body-rows tr:hover { background: rgba(255,255,255,0.01); }`}</style>
    </div>
  );
};
