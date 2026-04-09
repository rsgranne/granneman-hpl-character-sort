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
// Render initial card set (Name A–Z default)
// ============================================================

function renderCards() {
	const grid = document.getElementById('card-grid');
	if (!grid) return;
	const sorted = [...window.characters].sort((a, b) => a.name.localeCompare(b.name));
	sorted.forEach(char => grid.appendChild(createCard(char)));
}

// ============================================================
// Boot
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
	renderCards();
});
