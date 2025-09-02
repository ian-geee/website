// books.js (safe version) — remplace intégralement ton fichier
(() => {
  // ---------- Data ----------
  const BOOKS = [
    {
      title: "Statistical Foundations of Machine Learning: The Handbook (2022)",
      authors: "Bontempi (ULB)",
      domain: "Machine Learning",
      chapters: "Probability recap; estimation; bias-variance; regularization; model selection; resampling."
    },
    {
      title: "Hands-on Machine Learning with Scikit-Learn, Keras & TensorFlow (3e, 2022)",
      authors: "Géron (O'Reilly)",
      domain: "Deep Learning",
      chapters: "End-to-end ML; pipelines; feature engineering; TF; CNNs; RNNs."
    },
    {
      title: "Deep Learning (2016)",
      authors: "Goodfellow et al. (MIT Press)",
      domain: "Deep Learning",
      chapters: "Linear algebra; optimization; CNN/RNN basics; regularization; representation learning."
    },
    {
      title: "An Introduction to Statistical Learning with Applications in Python (2e, 2023)",
      authors: "James et al. (Springer)",
      domain: "Machine Learning",
      chapters: "Resampling; linear models; tree-based; SVM; PCA; model selection."
    },
    {
      title: "Probabilistic Machine Learning: An Introduction (2022)",
      authors: "Murphy (MIT Press)",
      domain: "Machine Learning",
      chapters: "Graphical models; inference; predictive uncertainty; Bayesian methods."
    },
    {
      title: "Understanding Deep Learning (2023)",
      authors: "Prince (MIT Press)",
      domain: "Deep Learning",
      chapters: "Optimization; generalization; convnets; attention; generative models."
    },
    {
      title: "CS229: Machine Learning (Stanford, Andrew Ng, 2018)",
      authors: "Ng (Stanford University)",
      domain: "Machine Learning",
      chapters: "Linear regression; logistic regression; GLMs; generative models; SVM; neural nets; learning theory; unsupervised learning."
    },
    {
      title: "Analysis of Generalized Linear Mixed Models in Agricultural and Natural Resources Sciences (2012)",
      authors: "Gbur et al.",
      domain: "Generalized Linear Mixed Models",
      chapters: "Generalized linear mixed models and their use in inference."
    },
    {
      title: "Probability and Statistics for Engineering and the Sciences (9e éd., 2015)",
      authors: "Devore",
      domain: "Statistics",
      chapters: "Probabilities; distributions; estimation; tests; ANOVA; regression."
    },
    {
      title: "Pattern Recognition and Machine Learning (2006)",
      authors: "Bishop",
      domain: "Machine Learning",
      chapters: "Probabilistic models; linear models; kernel methods; graphical models; approximate inference."
    }
  ];

  // ---------- Guards ----------
  const table = document.getElementById("booksTable");
  if (!table) { console.warn("[books.js] #booksTable not found"); return; }
  const tbody = table.querySelector("tbody");

  // ---------- Build rows ----------
  BOOKS.forEach(b => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${b.title}</strong></td>
      <td>${b.authors}</td>
      <td>${b.domain}</td>
      <td>${b.chapters}</td>
    `;
    tbody.appendChild(tr);
  });

  // ---------- Search ----------
  const search = document.getElementById("bookSearch");
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.toLowerCase();
      [...tbody.rows].forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(q) ? "" : "none";
      });
    });
  }

  // ---------- Sort ----------
  table.querySelectorAll("thead th").forEach((th, idx) => {
    th.classList.add("sortable");
    th.addEventListener("click", () => {
      const rowsArr = [...tbody.rows];
      const asc = th.dataset.sort !== "asc";

      table.querySelectorAll("thead th").forEach(col => col.classList.remove("sort-asc", "sort-desc"));

      rowsArr.sort((a, b) => {
        const ta = (a.cells[idx].innerText || "").toLowerCase();
        const tb = (b.cells[idx].innerText || "").toLowerCase();
        return asc ? ta.localeCompare(tb) : tb.localeCompare(ta);
      });

      th.dataset.sort = asc ? "asc" : "desc";
      th.classList.add(asc ? "sort-asc" : "sort-desc");
      rowsArr.forEach(r => tbody.appendChild(r));
    });
  });
})();
