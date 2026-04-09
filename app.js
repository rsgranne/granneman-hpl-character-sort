// ============================================================
// State
// ============================================================

const state = {
	search:  '',
	filters: { alignment: 'All', type: 'All', environment: 'All' },
	sort:    'name-asc',
};

// ============================================================
// Helpers
// ============================================================

function slugify(str) {
	return str.toLowerCase().replace(/\s+/g, '-');
}

// ============================================================
// Card creation
// ============================================================

function createCard(char) {
	const col = document.createElement('div');
	col.className = 'col character-card';
	col.dataset.id = char.id;

	const alignSlug = slugify(char.alignment);
	const typeSlug  = slugify(char.type);
	const envSlug   = slugify(char.environment);

	col.innerHTML = `
		<div class="card">
			<img
				src="images/managers/${char.id}.webp"
				class="card-img-top"
				alt="${char.name}"
				loading="lazy">
			<div class="card-body">
				<h2 class="card-title">${char.name}</h2>
				<p class="card-description">${char.description}</p>
				<p class="card-citation"><em>${char.publication}, ${char.date} &middot; &ldquo;${char.story}&rdquo; &middot; ${char.author}</em></p>
				<div class="card-badges">
					<span class="badge-pill badge-alignment-${alignSlug}">${char.alignment}</span>
					<span class="badge-pill badge-type-${typeSlug}">${char.type}</span>
					<span class="badge-pill badge-environment-${envSlug}">${char.environment}</span>
				</div>
			</div>
		</div>`;

	return col;
}

// ============================================================
// Sorting
// ============================================================

function getSortedCharacters() {
	const chars = [...window.characters];
	switch (state.sort) {
		case 'name-asc':  return chars.sort((a, b) => a.name.localeCompare(b.name));
		case 'name-desc': return chars.sort((a, b) => b.name.localeCompare(a.name));
		case 'date-asc':  return chars.sort((a, b) => a.sortDate - b.sortDate);
		default:          return chars.sort((a, b) => a.name.localeCompare(b.name));
	}
}

// ============================================================
// Filter matching
// ============================================================

function matchesFilters(char) {
	const q = state.search.toLowerCase();
	if (q && !char.name.toLowerCase().includes(q) && !char.description.toLowerCase().includes(q)) {
		return false;
	}
	if (state.filters.alignment !== 'All' && char.alignment !== state.filters.alignment) return false;
	if (state.filters.type      !== 'All' && char.type      !== state.filters.type)      return false;
	if (state.filters.environment !== 'All' && char.environment !== state.filters.environment) return false;
	return true;
}

// ============================================================
// Apply filters + sort to existing DOM cards
// ============================================================

function applyFilters() {
	const grid = document.getElementById('card-grid');
	if (!grid) return;
	const sorted = getSortedCharacters();

	// Re-order DOM nodes to match current sort
	sorted.forEach(char => {
		const node = grid.querySelector(`[data-id="${char.id}"]`);
		if (node) grid.appendChild(node); // move to end in sorted order
	});

	// Show/hide based on search + filter state; count visible
	let count = 0;
	grid.querySelectorAll('.character-card').forEach(card => {
		const char = window.characters.find(c => c.id === card.dataset.id);
		const visible = matchesFilters(char);
		card.style.display = visible ? '' : 'none';
		if (visible) count++;
	});

	document.getElementById('results-count').textContent = count;
}

// ============================================================
// Initial render
// ============================================================

function renderCards() {
	const grid = document.getElementById('card-grid');
	if (!grid) return;
	getSortedCharacters().forEach(char => grid.appendChild(createCard(char)));
	document.getElementById('results-count').textContent = window.characters.length;
}

// ============================================================
// Event listeners
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
	renderCards();

	// Search
	document.getElementById('search').addEventListener('input', e => {
		state.search = e.target.value;
		applyFilters();
	});

	// Filter buttons
	document.querySelectorAll('.filter-buttons').forEach(group => {
		const category = group.dataset.filter;
		group.querySelectorAll('.filter-btn').forEach(btn => {
			btn.addEventListener('click', () => {
				group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
				btn.classList.add('active');
				state.filters[category] = btn.dataset.value;
				applyFilters();
			});
		});
	});

	// Sort
	document.getElementById('sort').addEventListener('change', e => {
		state.sort = e.target.value;
		applyFilters();
	});
});
