// --- Filtrage & recherche ---
const buttons = document.querySelectorAll('#filters .btn');
const cards = [...document.querySelectorAll('#cards .card')];
const search = document.getElementById('search');

let activeFilter = 'all';

function applyFilters(){
    const q = search.value.trim().toLowerCase();
    cards.forEach(card => {
    const tags = card.dataset.tags || '';
    const text = card.dataset.text || '';
    const matchFilter = (activeFilter === 'all') || tags.includes(activeFilter);
    const matchSearch = !q || (tags+" "+text).toLowerCase().includes(q);
    card.classList.toggle('hidden', !(matchFilter && matchSearch));
    });
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
    buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    activeFilter = btn.dataset.filter;
    applyFilters();
    });
});

search.addEventListener('input', applyFilters);

// Accessibilité: Enter déclenche le lien principal
cards.forEach(card => {
    card.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        const primary = card.querySelector('.link.primary') || card.querySelector('.link');
        if(primary && primary.href && !primary.getAttribute('aria-disabled')){
        window.location.href = primary.href;
        }
    }
    });
});

// Init
applyFilters();