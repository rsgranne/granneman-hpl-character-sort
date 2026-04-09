# H.P. Lovecraft Character Sort — Design Spec

Date: 2026-04-08

## Overview

A single-page web application that presents 22 H.P. Lovecraft and Cthulhu Mythos characters as filterable, sortable cards. Intended as a demo of Claude Code. Served via a local web server (e.g., VS Code Live Preview); never loaded via `file:///`.

---

## Technology Stack

- **HTML/CSS:** Bootstrap 5 (CDN)
- **JavaScript:** Vanilla JS, no frameworks or build tools
- **Data:** Separate `characters.js` file exporting an array of character objects
- **Images:** `.webp` files in `images/managers/`
- **Server:** Any local web server (VS Code Live Preview, etc.)

---

## File Structure

```
/
├── index.html
├── characters.js
├── app.js
└── images/
    └── managers/
        ├── managers-hero.webp        (cropped hero, used on page)
        ├── managers-hero-full.webp   (unused)
        ├── abdul-alhazred.webp
        ├── azathoth.webp
        └── … (22 character images total)
```

---

## Character Data

Each character object in `characters.js` has the following shape:

```js
{
  id:          "cthulhu",                      // kebab-case, matches image filename
  name:        "Cthulhu",
  description: "The Great Old One who lies dead but dreaming in the sunken city of R'lyeh, his psychic influence haunting sensitive minds worldwide.",
  publication: "Weird Tales",
  date:        "Feb. 1928",                    // display string
  sortDate:    192802,                         // YYYYMM integer for chronological sorting
  story:       "The Call of Cthulhu",
  author:      "H.P. Lovecraft",
  alignment:   "Evil",                         // Good | Neutral | Evil | Cosmic
  type:        "Great Old One",                // see Type values below
  environment: "Ocean",                        // see Environment values below
}
```

### Filter Values

**Alignment**

| Value   | Description                                      |
| :------ | :----------------------------------------------- |
| Good    | Aligned with or protective of humanity           |
| Neutral | Indifferent to humanity                          |
| Evil    | Actively harmful to humanity                     |
| Cosmic  | Beyond human morality entirely                   |

**Type**

| Value        | Description                                               |
| :----------- | :-------------------------------------------------------- |
| Outer God    | Supreme cosmic entities (Azathoth, Yog-Sothoth, etc.)    |
| Great Old One | Powerful alien gods (Cthulhu, Hastur, Tsathoggua, etc.) |
| Ancient Race | Pre-human species (Elder Things, Deep Ones, Star-Spawn)  |
| Monster      | Non-sapient or semi-sapient creatures (Shoggoth, etc.)   |
| Human        | Fully human characters                                    |
| Hybrid       | Part-human, part-cosmic (Wilbur Whateley)                 |
| Cultist      | Human devotees of a cosmic entity                         |

**Environment**

| Value       | Description                             |
| :---------- | :-------------------------------------- |
| Cosmic      | The void, outer space, beyond reality   |
| Ocean       | Seas, ocean depths, coastal regions     |
| Arctic      | Polar regions, frozen wastes            |
| Underground | Caves, subterranean caverns             |
| Urban       | Cities, towns, civilized settings       |
| Rural       | Countryside, forests, isolated villages |
| Dreamlands  | The Dream-cycle / Dreamlands            |

### Full Character Roster

| id                    | Name                  | Alignment | Type          | Environment |
| :-------------------- | :-------------------- | :-------- | :------------ | :---------- |
| abdul-alhazred        | Abdul Alhazred        | Evil      | Human         | Urban       |
| azathoth              | Azathoth              | Cosmic    | Outer God     | Cosmic      |
| charles-dexter-ward   | Charles Dexter Ward   | Evil      | Human         | Urban       |
| cthulhu               | Cthulhu               | Evil      | Great Old One | Ocean       |
| deep-one              | Deep One              | Evil      | Ancient Race  | Ocean       |
| elder-thing           | Elder Thing           | Neutral   | Ancient Race  | Arctic      |
| hastur                | Hastur                | Evil      | Outer God     | Cosmic      |
| herbert-west          | Herbert West          | Evil      | Human         | Urban       |
| inspector-legrasse    | Inspector Legrasse    | Good      | Human         | Urban       |
| king-in-yellow        | King in Yellow        | Evil      | Outer God     | Cosmic      |
| nyarlathotep          | Nyarlathotep          | Evil      | Outer God     | Cosmic      |
| randolph-carter       | Randolph Carter       | Good      | Human         | Dreamlands  |
| rhan-tegoth           | Rhan-Tegoth           | Evil      | Great Old One | Arctic      |
| shoggoth              | Shoggoth              | Evil      | Monster       | Arctic      |
| shub-niggurath        | Shub-Niggurath        | Cosmic    | Outer God     | Rural       |
| sleeper-cultist       | Sleeper Cultist       | Evil      | Cultist       | Underground |
| star-spawn            | Star-Spawn            | Evil      | Ancient Race  | Ocean       |
| star-vampire          | Star Vampire          | Evil      | Monster       | Cosmic      |
| tsathaggua            | Tsathoggua            | Evil      | Great Old One | Underground |
| wilbur-whateley       | Wilbur Whateley       | Evil      | Hybrid        | Rural       |
| yig-father-of-serpents | Yig                  | Neutral   | Great Old One | Rural       |
| yog-sothoth           | Yog-Sothoth           | Cosmic    | Outer God     | Cosmic      |

### First Appearance Citations

| Name                | Publication              | Date      | Story                           | Author                              |
| :------------------ | :----------------------- | :-------- | :------------------------------ | :---------------------------------- |
| Abdul Alhazred      | The Wolverine            | Nov. 1921 | The Nameless City               | H.P. Lovecraft                      |
| Azathoth            | Weird Tales              | Aug. 1931 | The Whisperer in Darkness       | H.P. Lovecraft                      |
| Charles Dexter Ward | Weird Tales              | May 1941  | The Case of Charles Dexter Ward | H.P. Lovecraft                      |
| Cthulhu             | Weird Tales              | Feb. 1928 | The Call of Cthulhu             | H.P. Lovecraft                      |
| Deep One            | Visionary Publishing     | 1936      | The Shadow over Innsmouth       | H.P. Lovecraft                      |
| Elder Thing         | Astounding Stories       | Feb. 1936 | At the Mountains of Madness     | H.P. Lovecraft                      |
| Hastur              | Weird Tales              | Aug. 1931 | The Whisperer in Darkness       | H.P. Lovecraft                      |
| Herbert West        | Home Brew                | Feb. 1922 | Herbert West—Reanimator         | H.P. Lovecraft                      |
| Inspector Legrasse  | Weird Tales              | Feb. 1928 | The Call of Cthulhu             | H.P. Lovecraft                      |
| King in Yellow      | Weird Tales              | Aug. 1931 | The Whisperer in Darkness       | H.P. Lovecraft                      |
| Nyarlathotep        | The United Amateur       | Nov. 1920 | Nyarlathotep                    | H.P. Lovecraft                      |
| Randolph Carter     | The Vagrant              | May 1920  | The Statement of Randolph Carter | H.P. Lovecraft                     |
| Rhan-Tegoth         | Weird Tales              | Jul. 1933 | The Horror in the Museum        | H.P. Lovecraft & Hazel Heald        |
| Shoggoth            | Astounding Stories       | Feb. 1936 | At the Mountains of Madness     | H.P. Lovecraft                      |
| Shub-Niggurath      | Weird Tales              | Nov. 1928 | The Last Test                   | H.P. Lovecraft & Adolphe de Castro  |
| Sleeper Cultist     | Weird Tales              | Aug. 1931 | The Whisperer in Darkness       | H.P. Lovecraft                      |
| Star-Spawn          | Weird Tales              | Feb. 1928 | The Call of Cthulhu             | H.P. Lovecraft                      |
| Star Vampire        | Weird Tales              | Sep. 1935 | The Shambler from the Stars     | Robert Bloch                        |
| Tsathoggua          | Weird Tales              | Aug. 1931 | The Whisperer in Darkness       | H.P. Lovecraft                      |
| Wilbur Whateley     | Weird Tales              | Apr. 1929 | The Dunwich Horror              | H.P. Lovecraft                      |
| Yig                 | Weird Tales              | Nov. 1929 | The Curse of Yig                | H.P. Lovecraft & Zealia Bishop      |
| Yog-Sothoth         | Weird Tales              | Apr. 1929 | The Dunwich Horror              | H.P. Lovecraft                      |

---

## Page Structure

### Hero

- Full-width image: `images/managers/managers-hero.webp`
- Title: "H.P. Lovecraft & the Cthulhu Mythos" — `1.953rem` (31.25px), bold
- Subtitle: "Characters, creatures, and cosmic horrors" — `1.25rem` (20px)
- Dark navy background (`#1a1a2e`), warm tan/gold text (`#c9b99a`)

### Controls Bar

- **Search input:** live filter on name and description fields as user types
- **Three filter rows:** Alignment, Type, Environment — each with an "All" default button plus one button per value
- **Filter logic:** AND across categories (selecting Evil + Ocean shows only Evil Ocean characters); selecting a button within a category replaces the previous selection for that category
- **Results count:** "Showing N characters" — updates live
- **Sort dropdown:** Name A–Z (default) | Name Z–A | First Appearance (chronological by publication date)

### Card Grid

- Bootstrap responsive grid: 3 columns on desktop (`col-md-4`), 2 on tablet, 1 on mobile
- Cards sorted and filtered in real time; non-matching cards are hidden (not removed from DOM)

### Card Layout (top to bottom)

1. **Image** — full square `.webp`, `width: 100%`, natural aspect ratio (no cropping)
2. **Name** — `1.25rem` (20px), bold, `#c9b99a`
3. **Description** — `1rem` (16px), `#bbb`, `line-height: 1.5`
4. **Citation** — `1rem` (16px), `#bbb`, italic — format: `Publication, Mon. YYYY · "Story Title" · Author`
5. **Badges** — three colored pill badges (Alignment, Type, Environment); `1rem` (16px); wrap naturally on narrow cards

### Footer

- `© 2026 Scott Granneman`
- `0.875rem` (14px), `#aaa` on `#0a0a0a`

---

## Typography

Major Third modular scale (×1.25), base 16px:

| Step | Size (rem) | Size (px) | Usage                                     |
| ---: | ---------: | --------: | :---------------------------------------- |
|   −1 |  0.875rem  |     14px  | Footer copyright only                     |
|    0 |  1rem      |     16px  | Body, descriptions, citations, badges, controls |
|    1 |  1.25rem   |     20px  | Card names, filter category labels, hero subtitle |
|    2 |  1.563rem  |     25px  | (Reserved for future section headings)    |
|    3 |  1.953rem  |  31.25px  | Hero title                                |

Minimum font size anywhere on the page (except footer): **16px**.

---

## Color Palette & Contrast

All pairs verified against WCAG AA (4.5:1 normal text, 3:1 large text).

| Element                     | Text       | Background | Ratio  | Level |
| :-------------------------- | :--------- | :--------- | -----: | :---- |
| Hero title / card names     | `#c9b99a`  | `#1a1a2e`  |  8.8:1 | AAA   |
| Body text / descriptions    | `#bbb`     | `#1a1a2e`  |  8.9:1 | AAA   |
| Filter labels / subtitle    | `#aaa`     | `#111`     |  8.1:1 | AAA   |
| Inactive filter buttons     | `#ccc`     | `#222`     |  9.9:1 | AAA   |
| Search placeholder          | `#999`     | `#1e1e1e`  |  5.9:1 | AA    |
| Alignment "All" button      | `#fff`     | `#2d6a4f`  |  6.4:1 | AA    |
| Type "All" button           | `#fff`     | `#3a0ca3`  | 11.9:1 | AAA   |
| Environment "All" button    | `#fff`     | `#023e8a`  | 10.2:1 | AAA   |
| Evil badge                  | `#fff`     | `#9b2226`  |  7.9:1 | AAA   |
| Outer God badge             | `#fff`     | `#560bad`  | 10.3:1 | AAA   |
| Cosmic badge                | `#c9b99a`  | `#1b263b`  |  7.9:1 | AAA   |
| Footer copyright            | `#aaa`     | `#0a0a0a`  |  9.1:1 | AAA   |

### Badge Color Assignments

| Value        | Background | Text    |
| :----------- | :--------- | :------ |
| Good         | `#2d6a4f`  | `#fff`  |
| Neutral      | `#6c757d`  | `#fff`  | (4.69:1 — passes AA, tightest pair in the palette) |
| Evil         | `#9b2226`  | `#fff`  |
| Cosmic       | `#1b263b`  | `#c9b99a` (+ border `#4a4e69`) |
| Outer God    | `#3a0ca3`  | `#fff`  |
| Great Old One | `#560bad` | `#fff`  |
| Ancient Race | `#7b2d8b`  | `#fff`  |
| Monster      | `#4a4e69`  | `#fff`  |
| Human        | `#774936`  | `#fff`  |
| Hybrid       | `#5c4033`  | `#fff`  |
| Cultist      | `#3d405b`  | `#fff`  |
| Ocean        | `#023e8a`  | `#fff`  |
| Cosmic (env) | `#1b263b`  | `#c9b99a` (+ border `#4a4e69`) |
| Arctic       | `#415a77`  | `#fff`  |
| Rural        | `#1b4332`  | `#fff`  |
| Underground  | `#5c4033`  | `#fff`  |
| Urban        | `#4a4e69`  | `#fff`  |
| Dreamlands   | `#6d3b47`  | `#fff`  |

---

## JavaScript Behavior

### `characters.js`

Assigns an array of 22 character objects to `window.characters`. No module system — loaded via a plain `<script>` tag before `app.js`.

### `app.js`

- On `DOMContentLoaded`: render all 22 cards into the grid
- **Search:** `input` event on search field — filter cards where `name` or `description` includes the search string (case-insensitive)
- **Filter buttons:** `click` event on each button — update active filter state per category; re-apply all active filters
- **Sort:** `change` event on sort select — re-sort the visible card order
- **Active state:** the currently selected filter button gets a colored active style; "All" is active by default
- **Results count:** update on every filter/search/sort change
- Cards are hidden with `display: none` rather than removed from the DOM

---

## Out of Scope

- No backend, no API calls (except the `fetch`-free `characters.js` include)
- No animations or transitions (can be added later)
- No pagination (22 cards fit comfortably on one page)
- No detail/modal view on card click
- No URL state or shareable filter links
