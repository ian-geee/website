const API_URL = "https://ml-api-nebk.onrender.com/api/v1/wine/predict";

const form = document.getElementById("f");
const btn = document.getElementById("btn");
const statusEl = document.getElementById("status");
const result = document.getElementById("result");
const qualityEl = document.getElementById("quality");

function toPayload(){
    return {
    volatile_acidity: parseFloat(document.getElementById("volatile_acidity").value / 1000),
    total_sulfur_dioxide: parseFloat(document.getElementById("total_sulfur_dioxide").value),
    sulphates: parseFloat(document.getElementById("sulphates").value / 100),
    alcohol: parseFloat(document.getElementById("alcohol").value),
    };
}

// Car on passe d'une échelle 3->8 vers 0->10
function formatResultMinMax(n, minLabel = 3, maxLabel = 8) {
  const clamped = Math.max(minLabel, Math.min(n, maxLabel));
  const scaled = ((clamped - minLabel) / (maxLabel - minLabel)) * 10; // 3..8 → 0..10
  return `${Number(scaled.toFixed(1)).toLocaleString('fr-BE', 
           {minimumFractionDigits:1, maximumFractionDigits:1})} / 10`;
}

async function fetchJson(url, opts={}){
    const res = await fetch(url, { ...opts, headers: {'Content-Type':'application/json', ...(opts.headers||{}) }});
    if(!res.ok){
    const err = await res.json().catch(()=>({detail:`HTTP ${res.status}`}));
    throw new Error(err.detail || `HTTP ${res.status}`);
    }
    return res.json();
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    btn.disabled = true;
    statusEl.textContent = "Predicting...";
    result.style.display = "none";

    try {
    const data = await fetchJson(API_URL, { method:"POST", body: JSON.stringify(toPayload()) });
    const quality = data.quality ?? 0; // robust fallback - not so robust : it was returning zero because 'data.price_euro' was missing
    qualityEl.textContent = formatResultMinMax(quality);
    result.style.display = "block";
    statusEl.textContent = "Ok";
    } catch (err){
    statusEl.textContent = "Error: " + err.message;
    console.error(err);
    } finally {
    btn.disabled = false;
    }
});