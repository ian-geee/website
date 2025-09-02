const API_URL = "https://ml-api-nebk.onrender.com/api/v1/house/predict";

const form = document.getElementById("f");
const btn = document.getElementById("btn");
const statusEl = document.getElementById("status");
const result = document.getElementById("result");
const priceEl = document.getElementById("price");

function toPayload(){
    return {
    habitable_surface: parseFloat(document.getElementById("habitable_surface").value),
    bedrooms_count:    parseInt(document.getElementById("bedrooms_count").value, 10),
    post_code:         String(document.getElementById("post_code").value).trim(),
    num_facade:        parseInt(document.getElementById("num_facade").value, 10),
    };
}

function fmtEUR(n){
    try {
    return new Intl.NumberFormat('fr-BE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
    } catch {
    return `${Math.round(n).toLocaleString('fr-BE')} €`;
    }
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
    const price = data.price_euro ?? data.prediction_eur ?? data.price ?? 0; // robust fallback - not so robust : it was returning zero because 'data.price_euro' was missing
    priceEl.textContent = fmtEUR(price);
    result.style.display = "block";
    statusEl.textContent = "Ok";
    } catch (err){
    statusEl.textContent = "Error: " + err.message;
    console.error(err);
    } finally {
    btn.disabled = false;
    }
});