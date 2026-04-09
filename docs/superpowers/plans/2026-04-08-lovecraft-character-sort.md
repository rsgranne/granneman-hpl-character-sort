# H.P. Lovecraft Character Sort Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page web app displaying 22 H.P. Lovecraft/Cthulhu Mythos characters as filterable, sortable, live-searchable cards served via a local web server.

**Architecture:** Four files — `index.html` (full page structure with static filter buttons), `style.css` (dark gothic theme, Major Third type scale, badge/filter colors), `characters.js` (data array assigned to `window.characters`), `app.js` (card rendering + search/filter/sort interactivity). Cards are rendered into the DOM on load; filtering hides cards with `display: none` rather than removing them. All filter/search/sort state is tracked in a single plain JS object.

**Tech Stack:** HTML5, Bootstrap 5.3.3 (CDN), vanilla JS (no build tools, no modules), `.webp` images already present in `images/managers/`.

---

## File Map

| File              | Responsibility                                                      |
| :---------------- | :------------------------------------------------------------------ |
| `.gitignore`      | Exclude `.superpowers/`, `.DS_Store`, OS noise                      |
| `index.html`      | Page structure, Bootstrap CDN link, all static filter buttons       |
| `style.css`       | Colors, typography scale, hero, controls bar, cards, badges, footer |
| `characters.js`   | `window.characters` array — 22 character objects                    |
| `app.js`          | Render cards, search, filter, sort, results count                   |

---

### Task 1: Project scaffolding — `.gitignore` and `index.html`

**Files:**
- Create: `.gitignore`
- Create: `index.html`

- [ ] **Step 1: Create `.gitignore`**

```
.superpowers/
.DS_Store
```

- [ ] **Step 2: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>H.P. Lovecraft &amp; the Cthulhu Mythos</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="style.css">
</head>
<body>

	<header class="hero">
		<img src="images/managers/managers-hero.webp" class="hero-img" alt="Misty eldritch landscape evoking the Cthulhu Mythos">
		<div class="hero-text">
			<h1>H.P. Lovecraft &amp; the Cthulhu Mythos</h1>
			<p>Characters, creatures, and cosmic horrors</p>
		</div>
	</header>

	<div class="controls-bar">
		<div class="container-xl">

			<div class="search-wrap">
				<input
					type="search"
					id="search"
					class="search-input"
					placeholder="Search by name or description…"
					aria-label="Search characters">
			</div>

			<div class="filters">

				<div class="filter-group">
					<span class="filter-label">Alignment</span>
					<div class="filter-buttons" data-filter="alignment">
						<button class="filter-btn active" data-value="All">All</button>
						<button class="filter-btn" data-value="Good">Good</button>
						<button class="filter-btn" data-value="Neutral">Neutral</button>
						<button class="filter-btn" data-value="Evil">Evil</button>
						<button class="filter-btn" data-value="Cosmic">Cosmic</button>
					</div>
				</div>

				<div class="filter-group">
					<span class="filter-label">Type</span>
					<div class="filter-buttons" data-filter="type">
						<button class="filter-btn active" data-value="All">All</button>
						<button class="filter-btn" data-value="Outer God">Outer God</button>
						<button class="filter-btn" data-value="Great Old One">Great Old One</button>
						<button class="filter-btn" data-value="Ancient Race">Ancient Race</button>
						<button class="filter-btn" data-value="Monster">Monster</button>
						<button class="filter-btn" data-value="Human">Human</button>
						<button class="filter-btn" data-value="Hybrid">Hybrid</button>
						<button class="filter-btn" data-value="Cultist">Cultist</button>
					</div>
				</div>

				<div class="filter-group">
					<span class="filter-label">Environment</span>
					<div class="filter-buttons" data-filter="environment">
						<button class="filter-btn active" data-value="All">All</button>
						<button class="filter-btn" data-value="Cosmic">Cosmic</button>
						<button class="filter-btn" data-value="Ocean">Ocean</button>
						<button class="filter-btn" data-value="Arctic">Arctic</button>
						<button class="filter-btn" data-value="Underground">Underground</button>
						<button class="filter-btn" data-value="Urban">Urban</button>
						<button class="filter-btn" data-value="Rural">Rural</button>
						<button class="filter-btn" data-value="Dreamlands">Dreamlands</button>
					</div>
				</div>

			</div>

			<div class="sort-bar">
				<span class="results-count">Showing <strong id="results-count">22</strong> characters</span>
				<div class="sort-control">
					<label for="sort" class="sort-label">Sort:</label>
					<select id="sort" class="sort-select" aria-label="Sort characters">
						<option value="name-asc">Name A–Z</option>
						<option value="name-desc">Name Z–A</option>
						<option value="date-asc">First Appearance</option>
					</select>
				</div>
			</div>

		</div>
	</div>

	<main class="container-xl py-4">
		<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4" id="card-grid"></div>
	</main>

	<footer class="site-footer">
		<p>&copy; 2026 Scott Granneman</p>
	</footer>

	<script src="characters.js"></script>
	<script src="app.js"></script>
</body>
</html>
```

- [ ] **Step 3: Open the page in Live Preview**

Open `index.html` via VS Code Live Preview (or any local HTTP server). Verify:
- Page loads without errors (browser console is clean)
- No `style.css` yet — Bootstrap base styles are applied; raw HTML structure is visible
- Three filter rows with all buttons present

- [ ] **Step 4: Commit**

```bash
git add .gitignore index.html
git commit -m "chore: scaffold index.html and .gitignore"
```

---

### Task 2: `style.css` — full visual design

**Files:**
- Create: `style.css`

- [ ] **Step 1: Create `style.css`**

```css
/* ============================================================
   CSS Custom Properties — color tokens
   ============================================================ */
:root {
	/* Backgrounds */
	--bg-page:        #0d0d0d;
	--bg-hero:        #1a1a2e;
	--bg-controls:    #111;
	--bg-card:        #1a1a2e;
	--bg-footer:      #0a0a0a;
	--bg-btn-inactive:#222;
	--bg-search:      #1e1e1e;

	/* Text */
	--text-body:      #bbb;
	--text-accent:    #c9b99a;
	--text-muted:     #aaa;
	--text-btn:       #ccc;

	/* Borders */
	--border-card:    #2a2a3e;
	--border-controls:#333;

	/* Filter active colors (per category) */
	--active-alignment: #2d6a4f;
	--active-type:      #3a0ca3;
	--active-env:       #023e8a;

	/* Badge — Alignment */
	--badge-good:         #2d6a4f;
	--badge-neutral:      #6c757d;
	--badge-evil:         #9b2226;
	--badge-cosmic-align: #1b263b;

	/* Badge — Type */
	--badge-outer-god:      #3a0ca3;
	--badge-great-old-one:  #560bad;
	--badge-ancient-race:   #7b2d8b;
	--badge-monster:        #4a4e69;
	--badge-human:          #774936;
	--badge-hybrid:         #5c4033;
	--badge-cultist:        #3d405b;

	/* Badge — Environment */
	--badge-cosmic-env:   #1b263b;
	--badge-ocean:        #023e8a;
	--badge-arctic:       #415a77;
	--badge-underground:  #5c4033;
	--badge-urban:        #4a4e69;
	--badge-rural:        #1b4332;
	--badge-dreamlands:   #6d3b47;
	--badge-cosmic-border:#4a4e69;
}

/* ============================================================
   Base
   ============================================================ */
*,
*::before,
*::after {
	box-sizing: border-box;
}

body {
	background-color: var(--bg-page);
	color: var(--text-body);
	font-size: 1rem;
	line-height: 1.5;
	margin: 0;
}

/* ============================================================
   Hero
   ============================================================ */
.hero {
	background-color: var(--bg-hero);
	text-align: center;
}

.hero-img {
	width: 100%;
	display: block;
}

.hero-text {
	padding: 1.5rem 1rem 1.75rem;
}

.hero-text h1 {
	font-size: 1.953rem; /* Major Third step 3 */
	font-weight: bold;
	color: var(--text-accent);
	letter-spacing: 0.04em;
	margin: 0 0 0.4rem;
}

.hero-text p {
	font-size: 1.25rem; /* Major Third step 1 */
	color: var(--text-muted);
	margin: 0;
}

/* ============================================================
   Controls bar
   ============================================================ */
.controls-bar {
	background-color: var(--bg-controls);
	border-bottom: 1px solid var(--border-controls);
	padding: 1.25rem 0;
	position: sticky;
	top: 0;
	z-index: 100;
}

/* Search */
.search-wrap {
	margin-bottom: 1rem;
}

.search-input {
	width: 100%;
	background: var(--bg-search);
	border: 1px solid #555;
	border-radius: 4px;
	padding: 0.6rem 0.9rem;
	color: var(--text-body);
	font-size: 1rem;
	appearance: none;
}

.search-input::placeholder {
	color: #999;
}

.search-input:focus {
	outline: 2px solid var(--active-type);
	outline-offset: 1px;
}

/* Filters */
.filters {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	margin-bottom: 1rem;
}

.filter-group {
	display: flex;
	flex-wrap: wrap;
	align-items: baseline;
	gap: 0.5rem;
}

.filter-label {
	font-size: 1.25rem; /* Major Third step 1 */
	font-weight: 600;
	color: var(--text-muted);
	text-transform: uppercase;
	letter-spacing: 0.08em;
	min-width: 7rem;
}

.filter-buttons {
	display: flex;
	flex-wrap: wrap;
	gap: 0.4rem;
}

.filter-btn {
	background: var(--bg-btn-inactive);
	color: var(--text-btn);
	border: none;
	border-radius: 999px;
	padding: 0.35rem 0.8rem;
	font-size: 1rem;
	cursor: pointer;
	line-height: 1.4;
}

.filter-btn:hover {
	filter: brightness(1.25);
}

/* Active filter buttons — color per category */
[data-filter="alignment"] .filter-btn.active {
	background: var(--active-alignment);
	color: #fff;
}

[data-filter="type"] .filter-btn.active {
	background: var(--active-type);
	color: #fff;
}

[data-filter="environment"] .filter-btn.active {
	background: var(--active-env);
	color: #fff;
}

/* Sort bar */
.sort-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.results-count {
	font-size: 1rem;
	color: var(--text-muted);
}

.results-count strong {
	color: #ddd;
}

.sort-control {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.sort-label {
	font-size: 1rem;
	color: var(--text-muted);
}

.sort-select {
	background: #333;
	color: #ddd;
	border: none;
	border-radius: 4px;
	padding: 0.35rem 0.8rem;
	font-size: 1rem;
	cursor: pointer;
}

.sort-select:focus {
	outline: 2px solid var(--active-type);
	outline-offset: 1px;
}

/* ============================================================
   Card grid
   ============================================================ */
.character-card .card {
	background-color: var(--bg-card);
	border: 1px solid var(--border-card);
	border-radius: 8px;
	overflow: hidden;
	height: 100%;
}

.character-card .card-img-top {
	width: 100%;
	display: block;
}

.character-card .card-body {
	padding: 1rem;
}

.character-card .card-title {
	font-size: 1.25rem; /* Major Third step 1 */
	font-weight: bold;
	color: var(--text-accent);
	margin-bottom: 0.4rem;
}

.character-card .card-description {
	font-size: 1rem;
	color: var(--text-body);
	line-height: 1.5;
	margin-bottom: 0.5rem;
}

.character-card .card-citation {
	font-size: 1rem;
	color: var(--text-body);
	font-style: italic;
	margin-bottom: 0.75rem;
}

/* ============================================================
   Badge pills
   ============================================================ */
.card-badges {
	display: flex;
	flex-wrap: wrap;
	gap: 0.35rem;
}

.badge-pill {
	display: inline-block;
	padding: 0.25rem 0.6rem;
	border-radius: 999px;
	font-size: 1rem;
	line-height: 1.4;
	color: #fff;
}

/* Alignment badges */
.badge-alignment-good        { background: var(--badge-good); }
.badge-alignment-neutral     { background: var(--badge-neutral); }
.badge-alignment-evil        { background: var(--badge-evil); }
.badge-alignment-cosmic      { background: var(--badge-cosmic-align); color: var(--text-accent); border: 1px solid var(--badge-cosmic-border); }

/* Type badges */
.badge-type-outer-god        { background: var(--badge-outer-god); }
.badge-type-great-old-one    { background: var(--badge-great-old-one); }
.badge-type-ancient-race     { background: var(--badge-ancient-race); }
.badge-type-monster          { background: var(--badge-monster); }
.badge-type-human            { background: var(--badge-human); }
.badge-type-hybrid           { background: var(--badge-hybrid); }
.badge-type-cultist          { background: var(--badge-cultist); }

/* Environment badges */
.badge-environment-cosmic     { background: var(--badge-cosmic-env); color: var(--text-accent); border: 1px solid var(--badge-cosmic-border); }
.badge-environment-ocean      { background: var(--badge-ocean); }
.badge-environment-arctic     { background: var(--badge-arctic); }
.badge-environment-underground{ background: var(--badge-underground); }
.badge-environment-urban      { background: var(--badge-urban); }
.badge-environment-rural      { background: var(--badge-rural); }
.badge-environment-dreamlands { background: var(--badge-dreamlands); }

/* ============================================================
   Footer
   ============================================================ */
.site-footer {
	background-color: var(--bg-footer);
	border-top: 1px solid #222;
	text-align: center;
	padding: 0.75rem 1.25rem;
}

.site-footer p {
	font-size: 0.875rem; /* Major Third step −1 — footer only exception */
	color: var(--text-muted);
	margin: 0;
}
```

- [ ] **Step 2: Verify visually in browser**

Reload the page. Verify:
- Hero area: dark navy background, tan/gold `#c9b99a` title, muted subtitle
- Controls bar: dark `#111` background, filter buttons visible as pill shapes, `#222` inactive
- Alignment "All" button is active (green `#2d6a4f`)
- Type "All" button is active (purple `#3a0ca3`)
- Environment "All" button is active (blue `#023e8a`)
- Footer: near-black background with muted text at smaller size

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: add style.css with dark gothic theme and Major Third scale"
```

---

### Task 3: `characters.js` — all 22 character objects

**Files:**
- Create: `characters.js`

- [ ] **Step 1: Create `characters.js`**

```js
window.characters = [
	{
		id:          "abdul-alhazred",
		name:        "Abdul Alhazred",
		description: "The Mad Arab, a sorcerer and poet from Yemen who authored the dreaded Necronomicon after years of wandering the Empty Quarter and the ruins of Babylon, driven half-insane by what he witnessed.",
		publication: "The Wolverine",
		date:        "Nov. 1921",
		sortDate:    192111,
		story:       "The Nameless City",
		author:      "H.P. Lovecraft",
		alignment:   "Evil",
		type:        "Human",
		environment: "Urban",
	},
	{
		id:          "azathoth",
		name:        "Azathoth",
		description: "The Blind Idiot God, a mindless nuclear chaos seated at the center of ultimate confusion, piped to by a thin monotonous flute as lesser gods dance around it at the court of chaos.",
		publication: "Weird Tales",
		date:        "Aug. 1931",
		sortDate:    193108,
		story:       "The Whisperer in Darkness",
		author:      "H.P. Lovecraft",
		alignment:   "Cosmic",
		type:        "Outer God",
		environment: "Cosmic",
	},
	{
		id:          "charles-dexter-ward",
		name:        "Charles Dexter Ward",
		description: "A Providence antiquarian obsessed with his ancestor Joseph Curwen, who gradually unearthed forbidden techniques of resurrection and essential salts — with catastrophic consequences for his own identity.",
		publication: "Weird Tales",
		date:        "May 1941",
		sortDate:    194105,
		story:       "The Case of Charles Dexter Ward",
		author:      "H.P. Lovecraft",
		alignment:   "Evil",
		type:        "Human",
		environment: "Urban",
	},
	{
		id:          "cthulhu",
		name:        "Cthulhu",
		description: "The Great Old One who lies dead but dreaming in the sunken city of R'lyeh, his psychic influence haunting sensitive minds worldwide until the stars are right and he rises again.",
		publication: "Weird Tales",
		date:        "Feb. 1928",
		sortDate:    192802,
		story:       "The Call of Cthulhu",
		author:      "H.P. Lovecraft",
		alignment:   "Evil",
		type:        "Great Old One",
		environment: "Ocean",
	},
	{
		id:          "deep-one",
		name:        "Deep One",
		description: "An amphibious humanoid race that dwells in the ocean depths, interbreeding with isolated coastal communities and serving their masters Dagon and Cthulhu from the reef beneath Innsmouth.",
		publication: "Visionary Publishing",
		date:        "1936",
		sortDate:    193600,
		story:       "The Shadow over Innsmouth",
		author:      "H.P. Lovecraft",
		alignment:   "Evil",
		type:        "Ancient Race",
		environment: "Ocean",
	},
	{
		id:          "elder-thing",
		name:        "Elder Thing",
		description: "An ancient barrel-shaped creature who colonized Earth billions of years ago, creating all life including humanity as a byproduct, only to fall before the shoggoths they themselves engineered.",
		publication: "Astounding Stories",
		date:        "Feb. 1936",
		sortDate:    193602,
		story:       "At the Mountains of Madness",
		author:      "H.P. Lovecraft",
		alignment:   "Neutral",
		type:        "Ancient Race",
		environment: "Arctic",
	},
	{
		id:          "hastur",
		name:        "Hastur",
		description: "The Unspeakable One, a malevolent entity associated with the Yellow Sign and the dread play The King in Yellow, whose true nature and form remain deliberately obscure and maddening.",
		publication: "Weird Tales",
		date:        "Aug. 1931",
		sortDate:    193108,
		story:       "The Whisperer in Darkness",
		author:      "H.P. Lovecraft",
		alignment:   "Evil",
		type:        "Outer God",
		environment: "Cosmic",
	},
	{
		id:          "herbert-west",
		name:        "Herbert West",
		description: "A brilliant and coldly amoral physician whose obsession with conquering death through chemical reanimation produced only shambling, murderous horrors that ultimately turned on their creator.",
		publication: "Home Brew",
		date:        "Feb. 1922",
		sortDate:    192202,
		story:       "Herbert West—Reanimator",
		author:      "H.P. Lovecraft",
		alignment:   "Evil",
		type:        "Human",
		environment: "Urban",
	},
	{
		id:          "inspector-legrasse",
		name:        "Inspector Legrasse",
		description: "A New Orleans police inspector who raided a Louisiana swamp cult worshipping an unknown idol, and later brought the statuette to a folklore conference — inadvertently uncovering the global Cthulhu cult.",
		publication: "Weird Tales",
		date:        "Feb. 1928",
		sortDate:    192802,
		story:       "The Call of Cthulhu",
		author:      "H.P. Lovecraft",
		alignment:   "Good",
		type:        "Human",
		environment: "Urban",
	},
	{
		id:          "king-in-yellow",
		name:        "King in Yellow",
		description: "A masked cosmic entity whose identity is concealed even from itself, associated with the Yellow Sign and the mind-destroying play of the same name that drives all who read it to madness.",
		publication: "Weird Tales",
		date:        "Aug. 1931",
		sortDate:    193108,
		story:       "The Whisperer in Darkness",
		author:      "H.P. Lovecraft",
		alignment:   "Evil",
		type:        "Outer God",
		environment: "Cosmic",
	},
	{
		id:          "nyarlathotep",
		name:        "Nyarlathotep",
		description: "The Crawling Chaos — shapeshifting soul and messenger of the Outer Gods who, unlike his brethren, takes an active and malicious delight in spreading madness and destruction among humanity.",
		publication: "The United Amateur",
		date:        "Nov. 1920",
		sortDate:    192011,
		story:       "Nyarlathotep",
		author:      "H.P. Lovecraft",
		alignment:   "Evil",
		type:        "Outer God",
		environment: "Cosmic",
	},
	{
		id:          "randolph-carter",
		name:        "Randolph Carter",
		description: "A dreamer and mystic from Boston who can enter the Dreamlands at will, where he seeks the fabled Sunset City and encounters gods, ghouls, and the Ultimate Gate beyond the boundaries of space and time.",
		publication: "The Vagrant",
		date:        "May 1920",
		sortDate:    192005,
		story:       "The Statement of Randolph Carter",
		author:      "H.P. Lovecraft",
		alignment:   "Good",
		type:        "Human",
		environment: "Dreamlands",
	},
	{
		id:          "rhan-tegoth",
		name:        "Rhan-Tegoth",
		description: "A bloated, tentacled Great Old One who once ruled arctic Earth before going into a centuries-long torpor, requiring blood sacrifices to revive — displayed in a London wax museum as its unwitting caretaker plots his awakening.",
		publication: "Weird Tales",
		date:        "Jul. 1933",
		sortDate:    193307,
		story:       "The Horror in the Museum",
		author:      "H.P. Lovecraft & Hazel Heald",
		alignment:   "Evil",
		type:        "Great Old One",
		environment: "Arctic",
	},
	{
		id:          "shoggoth",
		name:        "Shoggoth",
		description: "A massive, amorphous mass of iridescent black protoplasm with hundreds of temporary eyes and pseudopods, created by the Elder Things as a servile beast of burden before turning on their makers.",
		publication: "Astounding Stories",
		date:        "Feb. 1936",
		sortDate:    193602,
		story:       "At the Mountains of Madness",
		author:      "H.P. Lovecraft",
		alignment:   "Evil",
		type:        "Monster",
		environment: "Arctic",
	},
	{
		id:          "shub-niggurath",
		name:        "Shub-Niggurath",
		description: "The Black Goat of the Woods with a Thousand Young — a perverse fertility deity of immense power whose goat-like form spawns the Dark Young that lumber through forests and desecrate the countryside.",
		publication: "Weird Tales",
		date:        "Nov. 1928",
		sortDate:    192811,
		story:       "The Last Test",
		author:      "H.P. Lovecraft & Adolphe de Castro",
		alignment:   "Cosmic",
		type:        "Outer God",
		environment: "Rural",
	},
	{
		id:          "sleeper-cultist",
		name:        "Sleeper Cultist",
		description: "A devoted worshipper of the Great Old Ones who keeps the faith alive in isolated cells, performing rituals in hidden underground spaces and awaiting the day the stars align for their masters' return.",
		publication: "Weird Tales",
		date:        "Aug. 1931",
		sortDate:    193108,
		story:       "The Whisperer in Darkness",
		author:      "H.P. Lovecraft",
		alignment:   "Evil",
		type:        "Cultist",
		environment: "Underground",
	},
	{
		id:          "star-spawn",
		name:        "Star-Spawn",
		description: "Cthulhu's own kindred who accompanied him from the stars and built R'lyeh — great winged beings that warred with the Elder Things before sinking with their city beneath the Pacific Ocean.",
		publication: "Weird Tales",
		date:        "Feb. 1928",
		sortDate:    192802,
		story:       "The Call of Cthulhu",
		author:      "H.P. Lovecraft",
		alignment:   "Evil",
		type:        "Ancient Race",
		environment: "Ocean",
	},
	{
		id:          "star-vampire",
		name:        "Star Vampire",
		description: "An invisible predatory entity from deep space that becomes briefly visible when engorged with blood — a bloated, crimson, tentacled horror that laughs as it feeds before vanishing back into the void.",
		publication: "Weird Tales",
		date:        "Sep. 1935",
		sortDate:    193509,
		story:       "The Shambler from the Stars",
		author:      "Robert Bloch",
		alignment:   "Evil",
		type:        "Monster",
		environment: "Cosmic",
	},
	{
		id:          "tsathaggua",
		name:        "Tsathoggua",
		description: "A formless, toad-like entity of immense antiquity who came to Earth from Saturn and now slumbers in caverns beneath N'kai, demanding little worship but consuming any who venture into his domain.",
		publication: "Weird Tales",
		date:        "Aug. 1931",
		sortDate:    193108,
		story:       "The Whisperer in Darkness",
		author:      "H.P. Lovecraft",
		alignment:   "Evil",
		type:        "Great Old One",
		environment: "Underground",
	},
	{
		id:          "wilbur-whateley",
		name:        "Wilbur Whateley",
		description: "A half-human, half-cosmic hybrid born in the Dunwich hills, who grew at an impossible rate and sought to obtain the complete Necronomicon to summon his invisible twin and open the gates for Yog-Sothoth.",
		publication: "Weird Tales",
		date:        "Apr. 1929",
		sortDate:    192904,
		story:       "The Dunwich Horror",
		author:      "H.P. Lovecraft",
		alignment:   "Evil",
		type:        "Hybrid",
		environment: "Rural",
	},
	{
		id:          "yig-father-of-serpents",
		name:        "Yig",
		description: "The Father of Serpents, a Great Old One worshipped across the American plains whose vengeance falls on any who harm his serpent children — inflicting transformation, madness, or death on transgressors.",
		publication: "Weird Tales",
		date:        "Nov. 1929",
		sortDate:    192911,
		story:       "The Curse of Yig",
		author:      "H.P. Lovecraft & Zealia Bishop",
		alignment:   "Neutral",
		type:        "Great Old One",
		environment: "Rural",
	},
	{
		id:          "yog-sothoth",
		name:        "Yog-Sothoth",
		description: "The All-in-One and One-in-All — an Outer God who is coterminous with all time and space, manifesting as a congeries of iridescent spheres and serving as the gate and the key to all dimensions.",
		publication: "Weird Tales",
		date:        "Apr. 1929",
		sortDate:    192904,
		story:       "The Dunwich Horror",
		author:      "H.P. Lovecraft",
		alignment:   "Cosmic",
		type:        "Outer God",
		environment: "Cosmic",
	},
];
```

- [ ] **Step 2: Verify in browser console**

Open browser DevTools console and run:

```js
window.characters.length
```

Expected output: `22`

Then verify one record is correct:

```js
window.characters.find(c => c.id === 'cthulhu')
```

Expected: object with `name: "Cthulhu"`, `sortDate: 192802`, `type: "Great Old One"`.

- [ ] **Step 3: Commit**

```bash
git add characters.js
git commit -m "feat: add characters.js with all 22 Lovecraft/Mythos character objects"
```

---

### Task 4: `app.js` — card rendering

**Files:**
- Create: `app.js`

- [ ] **Step 1: Create `app.js` with card rendering**

```js
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
	const sorted = [...window.characters].sort((a, b) => a.name.localeCompare(b.name));
	sorted.forEach(char => grid.appendChild(createCard(char)));
}

// ============================================================
// Boot
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
	renderCards();
});
```

- [ ] **Step 2: Verify all 22 cards render**

Reload the page. Verify:
- 22 cards appear in the grid in alphabetical order (Abdul Alhazred → Yog-Sothoth)
- Each card has: image, name (gold), description (gray), citation (italic), three colored badge pills
- Images load (check a few: Cthulhu, Nyarlathotep, Shoggoth)
- No console errors

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "feat: render all 22 character cards in alphabetical order"
```

---

### Task 5: `app.js` — search, filters, sort

**Files:**
- Modify: `app.js`

- [ ] **Step 1: Replace `app.js` with full interactive version**

```js
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
	const grid   = document.getElementById('card-grid');
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
```

- [ ] **Step 2: Verify search**

Type `cthulhu` into the search box. Verify:
- Only cards whose name or description contains "cthulhu" (case-insensitive) are visible
- Results count updates (expect: Cthulhu + any whose description mentions Cthulhu)
- Clear the search — all 22 cards reappear and count returns to 22

- [ ] **Step 3: Verify filter — single category**

Click the **Evil** button under Alignment. Verify:
- Only Evil-aligned cards are visible
- Results count shows correct number (expect: ~15 Evil characters)
- The Evil button becomes active (green `#2d6a4f`); All button loses active state
- Click **All** — all 22 cards reappear

- [ ] **Step 4: Verify filter — AND logic across categories**

Click **Evil** under Alignment, then **Ocean** under Environment. Verify:
- Only characters that are BOTH Evil AND Ocean are shown (expect: Cthulhu, Deep One, Star-Spawn — 3 cards)
- Results count shows 3
- Click **All** under both categories to reset

- [ ] **Step 5: Verify sort**

Select **Name Z–A** from the sort dropdown. Verify:
- Cards reorder: Yog-Sothoth first, Abdul Alhazred last
- Select **First Appearance** — cards reorder chronologically: Randolph Carter (May 1920) first, Charles Dexter Ward (May 1941) last

- [ ] **Step 6: Verify search + filter combined**

Type `ocean` in search, then click **Evil** under Alignment. Verify:
- Only cards matching BOTH conditions appear (search checks name + description)
- Results count reflects visible count accurately

- [ ] **Step 7: Commit**

```bash
git add app.js
git commit -m "feat: add search, filter, and sort interactivity to app.js"
```

---

## Self-Review Checklist

All spec requirements mapped to tasks:

| Spec requirement                                  | Task |
| :------------------------------------------------ | :--- |
| 22 character cards with image, name, description, citation, badges | Task 3 + 4 |
| Live search on name and description               | Task 5 |
| Three filter rows: Alignment, Type, Environment   | Task 1 + 5 |
| AND logic across filter categories                | Task 5 |
| Sort: Name A–Z (default), Name Z–A, First Appearance | Task 5 |
| Results count updates live                        | Task 5 |
| Cards hidden with `display: none`, not removed    | Task 5 |
| Bootstrap responsive grid (3/2/1 cols)            | Task 1 |
| Major Third type scale (16px min, 14px footer)    | Task 2 |
| Dark gothic color palette, WCAG AA contrast       | Task 2 |
| Badge pills with per-value colors                 | Task 2 + 4 |
| Hero image full-width, title + subtitle           | Task 1 + 2 |
| Footer: © 2026 Scott Granneman                    | Task 1 |
| `window.characters` (no module system)            | Task 3 |
| `.gitignore` excluding `.superpowers/`            | Task 1 |
