const API_URL = "https://ml-api-nebk.onrender.com/api/v1/iris/predict";

const form = document.getElementById("f");
const btn = document.getElementById("btn");
const statusEl = document.getElementById("status");
const result = document.getElementById("result");
const predBadge = document.getElementById("predBadge");
const probsBox = document.getElementById("probs");

function toPayload(){
return {
    sepal_length: parseFloat(document.getElementById("sepal_length").value),
    sepal_width:  parseFloat(document.getElementById("sepal_width").value),
    petal_length: parseFloat(document.getElementById("petal_length").value),
    petal_width:  parseFloat(document.getElementById("petal_width").value),
};
}

function renderProbs(probObj){
probsBox.innerHTML = "";
const entries = Object.entries(probObj).sort((a,b)=>b[1]-a[1]); // tri desc
entries.forEach(([label, p])=>{
    const pct = Math.round(p*100);
    const row = document.createElement("div");
    row.className = "bar";
    row.innerHTML = `
    <div class="bar-row"><span>${label}</span><span>${pct}%</span></div>
    <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
    `;
    probsBox.appendChild(row);
});
}

form.addEventListener("submit", async (e) => {
e.preventDefault();
btn.disabled = true;
statusEl.textContent = "Predicting...";
result.style.display = "none";

try {
    const payload = toPayload();
    const res = await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
    });

    if(!res.ok){
    const err = await res.json().catch(()=>({detail:`HTTP ${res.status}`}));
    throw new Error(err.detail || `HTTP ${res.status}`);
    }

    const data = await res.json();
    statusEl.textContent = "Ok";
    predBadge.textContent = data.predicted_class_label ?? `Class ${data.predicted_class_index}`;
    renderProbs(data.probabilities || {});
    result.style.display = "block";
} catch (err){
    statusEl.textContent = "Error: " + err.message;
    console.error(err);
} finally {
    btn.disabled = false;
}
});