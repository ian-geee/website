// full-radar.js — init safe du radar dans #rolesRadar
(() => {
  // 1) Plugin des libellés d’anneaux
  const ringLabelsPlugin = {
    id: 'ringLabels',
    afterDatasetsDraw(chart, args, opts) {
      const r = chart.scales?.r;
      if (!r) return;
      const rings = (opts && opts.rings) || [];
      const ctx = chart.ctx;
      ctx.save();
      ctx.fillStyle = (opts && opts.color) || '#9aa0a6';
      ctx.font = `${(opts && opts.fontSize) || 12}px system-ui, -apple-system, Segoe UI, Roboto`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      rings.forEach(({ value, label }) => {
        const rad = (typeof r.getRadiusForValue === 'function')
          ? r.getRadiusForValue(value) : r.getDistanceFromCenterForValue(value);
        ctx.fillText(label, r.xCenter, r.yCenter - rad);
      });
      ctx.restore();
    }
  };

  const ROLE_LABELS = [
    'DS','MLE','Py Dev',
    'PIE/QHSE','DE','BI/DA'
  ];

  const ROLE_FULL = [
  'Data Scientist',
  'AI/ML Engineer',
  'Python Developer',
  'Process Improvement & QHSE Engineer',
  'Data Engineer',
  'Business Intelligence / Data Analyst'
];

  const CURRENT   = [60,40,40,60,40,70];

  const LEVEL_TICKS = {25:'novice',50:'junior',75:'medior',100:'senior'};
  const levelFromValue = v => (v<25?'blue-sky':v<50?'novice':v<75?'junior':'medior');

  let chart;

  function mountRadar() {
    const el = document.getElementById('rolesRadarShort');
    if (!el || !window.Chart) return false;        // ⟵ canvas pas là encore
    if (chart) { try { chart.destroy(); } catch(e){} }

    Chart.register(ringLabelsPlugin);

    chart = new Chart(el.getContext('2d'), {
      type: 'radar',
      data: {
        labels: ROLE_LABELS,
        datasets: [
          { label:'Current: 2025', data: CURRENT, fill:true,
            backgroundColor:'rgba(255,196,0,0.18)', borderColor:'rgba(255,196,0,1)', pointBackgroundColor:'rgba(255,196,0,1)' }
        ]
      },
      options: {
        responsive:true, maintainAspectRatio:false,
        scales:{ r:{
          min:0, max:100,
          angleLines:{ color:'#3a3f46' }, grid:{ color:'#262b31' },
          pointLabels:{ color:'#e9eef2', font:{ size:13 } },
          ticks:{ stepSize:25, display:false, showLabelBackdrop:false }
        }},
        plugins:{
          legend: { display: false },
          tooltip:{
            backgroundColor:'#111', borderColor:'#444', borderWidth:1,
            titleColor:'#e9eef2', bodyColor:'#e9eef2',
            callbacks:{ 
                title: (items)=> ROLE_FULL[ items[0].dataIndex ],
                label:(ctx)=>`${ctx.dataset.label}: ${levelFromValue(ctx.raw)} (${Math.round(ctx.raw)})` 
            }
          },
          ringLabels:{
            rings:[
              {value:25,label:LEVEL_TICKS[25]},
              {value:50,label:LEVEL_TICKS[50]},
              {value:75,label:LEVEL_TICKS[75]},
              {value:100,label:LEVEL_TICKS[100]}
            ],
            color:'#9aa0a6', fontSize:12
          }
        }
      }
    });
    return true;
  }

  // Lance après le parse…
  const start = () => {
    if (!mountRadar()) {
      // …et surveille si le header/canvas est injecté plus tard
      const mo = new MutationObserver(() => { if (mountRadar()) mo.disconnect(); });
      mo.observe(document.body, { childList:true, subtree:true });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
