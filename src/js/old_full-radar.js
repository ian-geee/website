  // --- Plugin: écrit les labels d’anneaux par-dessus les courbes ---
  const ringLabelsPlugin = {
    id: 'ringLabels',
    afterDatasetsDraw(chart, args, opts) {
      const {ctx, scales: {r}} = chart;
      const rings = opts.rings || [];
      ctx.save();
      ctx.fillStyle = opts.color || '#9aa0a6';
      ctx.font = (opts.fontSize || 12) + 'px system-ui, -apple-system, Segoe UI, Roboto';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      rings.forEach(({value, label}) => {
        const rad = (r.getRadiusForValue ? r.getRadiusForValue(value)
                                         : r.getDistanceFromCenterForValue(value));
        const x = r.xCenter;
        const y = r.yCenter - rad; // en haut du cercle
        ctx.fillText(label, x, y);
      });
      ctx.restore();
    }
  };
  Chart.register(ringLabelsPlugin);

  const ROLE_LABELS = [
    'Data Scientist',
    'AI/ML Engineer',
    'Full Stack / Cloud Developer',
    'Process Improvement & QHSE Engineer',
    'Data Engineer',
    'Business Intelligence / Data Analyst'
  ];
  const year_2022 = [20, 1, 20, 50, 1, 40]
  const CURRENT = [60,40,40,60,40,70];
  const GOAL    = [100,100,80,65,70,80];

  // Libellés par anneau
  const LEVEL_TICKS = { 25:'novice', 50:'junior', 75:'medior', 100:'senior' };
  const levelFromValue = (v)=> (v<25?'blue-sky':v<50?'novice':v<75?'junior':'medior');

  const ctx = document.getElementById('rolesRadar').getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ROLE_LABELS,
      datasets: [
        { label:'Past: 2022', data: year_2022, fill:true,
          backgroundColor:'rgba(230,145,156,0.18)', borderColor:'rgba(230,145,156,1)', pointBackgroundColor:'rgba(230,145,156,1)' },
        { label:'Current: 2025', data: CURRENT, fill:true,
          backgroundColor:'rgba(96,165,250,0.18)', borderColor:'rgba(96,165,250,1)', pointBackgroundColor:'rgba(96,165,250,1)' },
        { label:'Goal: 2035', data: GOAL, fill:true,
          backgroundColor:'rgba(34,197,94,0.14)', borderColor:'rgba(34,197,94,1)', pointBackgroundColor:'rgba(34,197,94,1)' }
      ]
    },
    options: {
      scales: {
        r: {
          min:0, max:100,
          angleLines:{ color:'#3a3f46' },
          grid:{ color:'#262b31' },
          pointLabels:{ color:'#e9eef2', font:{ size:13 } },
          ticks:{
            stepSize:25,
            display:false,              // on cache les ticks natifs (dessous)
            showLabelBackdrop:false
          }
        }
      },
      plugins: {
        legend:{ labels:{ color:'#e9eef2' } },
        tooltip:{
          backgroundColor:'#111', borderColor:'#444', borderWidth:1,
          titleColor:'#e9eef2', bodyColor:'#e9eef2',
          callbacks:{ label:(ctx)=>`${ctx.dataset.label}: ${levelFromValue(ctx.raw)} (${Math.round(ctx.raw)})` }
        },
        // Options de notre plugin : valeurs + libellés, couleur, taille de police
        ringLabels: {
          rings: [
            {value:25, label:LEVEL_TICKS[25]},
            {value:50, label:LEVEL_TICKS[50]},
            {value:75, label:LEVEL_TICKS[75]},
            {value:100,label:LEVEL_TICKS[100]}
          ],
          color:'#9aa0a6',
          fontSize:12
        }
      }
    }
  });