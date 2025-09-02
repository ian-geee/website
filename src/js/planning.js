// planning.js
(() => {
  const DATA = [
    { title:"Working as a Data Scientist", description:"Open to many industries; learning over salary.", priority:"priority" },
    { title:"Machine Learning & Deep Learning Mathematics", description:"Built my own DS curriculum; studying core books; notes available.", priority:"ongoing" },
    { title:"R Programming", description:"Started mid-Aug 2025 to diversify.", priority:"ongoing" },
    { title:"Python Developer", description:"Improving pure Python engineering skills.", priority:"ongoing" },
    { title:"Datacamp Certifications", description:"ML Scientist in R, Python Dev & MLOps.", priority:"ongoing" },
    { title:"Microsoft Certifications: PL-300 & DP-100", description:"Power BI + ML/Deep Learning on Azure (MLflow).", priority:"ongoing" },
    { title:"This Website & Resume", description:"HTML/CSS/JS; downloadable resume; dark theme.", priority:"done" },
    { title:"DataCamp & Coursera Certifications", description:"Passed 4 certs: Supervised ML, SQL Associate, DS Associate (Py), DS (Py).", priority:"done" }
  ];

  const priorityCell = p => {
    const map = {
      ongoing: { icon:"🟢", label:"Ongoing", sort:"2" },
      priority:{ icon:"🟠", label:"Priority", sort:"1" },
      done:    { icon:"🔴", label:"Done",    sort:"3" }
    };
    const {icon,label,sort} = map[(p||"").toLowerCase()] || {icon:"⚪",label:"Unknown",sort:"9"};
    return `<span data-sort="${sort}" title="${label}">${icon} ${label}</span>`;
  };

  const table = document.getElementById("projectsTable");
  if (!table) return;
  const tbody = table.querySelector("tbody");

  // render
  DATA.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${p.title}</strong></td>
      <td>${p.description}</td>
      <td class="priority-cell">${priorityCell(p.priority)}</td>
    `;
    tbody.appendChild(tr);
  });

  // search
  const search = document.getElementById("projSearch");
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.toLowerCase();
      [...tbody.rows].forEach(r => {
        r.style.display = r.innerText.toLowerCase().includes(q) ? "" : "none";
      });
    });
  }

  // sort
  table.querySelectorAll("thead th").forEach((th, idx) => {
    th.classList.add("sortable");
    th.addEventListener("click", () => {
      const rows = [...tbody.rows];
      const asc = th.dataset.sort !== "asc";
      table.querySelectorAll("thead th").forEach(h => h.classList.remove("sort-asc","sort-desc"));
      rows.sort((a,b) => {
        if (idx === 2) {
          const sa = Number(a.cells[2].querySelector("span")?.dataset.sort || 9);
          const sb = Number(b.cells[2].querySelector("span")?.dataset.sort || 9);
          return asc ? sa - sb : sb - sa;
        }
        const ta = (a.cells[idx].innerText||"").toLowerCase();
        const tb = (b.cells[idx].innerText||"").toLowerCase();
        return asc ? ta.localeCompare(tb) : tb.localeCompare(ta);
      });
      th.dataset.sort = asc ? "asc" : "desc";
      th.classList.add(asc ? "sort-asc" : "sort-desc");
      rows.forEach(r => tbody.appendChild(r));
    });
  });
})();
