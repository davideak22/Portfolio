# Developer & AI Agent Guidelines: Local SEO Architecture

This document tracks the comprehensive local SEO optimizations implemented in this repository and outlines the core constraints and context that future developers and AI agents must preserve.

---

## 1. Project Context & Branding
- **Name**: David Deak (Hungarian: *Deák Dávid*)
- **Specialties**: Graphic Designer, Event Photographer, Documentary Style Photographer, Videographer, Cinematic Video
- **Primary Geolocation Targets**: Sfântu Gheorghe, Covasna County (Județul Covasna / Kovászna megye), Transylvania (Transilvania / Erdély), Romania

---

## 2. Core SEO Target Keywords
Any content additions, blog updates, or layout changes must preserve and leverage the following primary keyword configurations:

| Language | Graphic Designer | Event Photographer | Documentary Photographer | Videographer | Cinematic Video | Regional Geotargets |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **English** | Graphic Designer | Event Photographer | Documentary Style Photographer | Videographer | Cinematic video | Transylvania, Covasna County, Sfântu Gheorghe, Romania |
| **Hungarian** | Grafikus / Grafikai tervező | Eseményfotós | Dokumentarista stílusú fotós | Videós / Videográfus | Cinematic videó / Filmes videó | Erdély, Kovászna megye, Sepsiszentgyörgy, Románia |
| **Romanian** | Designer grafic | Fotograf de evenimente | Fotograf în stil documentar | Videograf | Video cinematic | Transilvania, județul Covasna, Sfântu Gheorghe, România |

---

## 3. Implemented Fixes & File Changes

The following optimizations have been implemented across the project files:

### A. Global Translations & Meta Mappings
- **File**: `src/_data/translations.js`
- **Updates**:
  - Rewrote `seo.title` and `seo.description` for all three locales (`en`, `hu`, `ro`) to weave in the target search terms and precise regional geolocations.
  - Rewrote the homepage introduction block `mainaboutme.about` in all three locales to embed target keywords naturally for crawler indexing while retaining engaging, high-end copy.
  - Rectified Romanian grammar in `mainaboutme.about` from `"identităților digitalelor"` to `"identități digitale"`.

### B. Rich Structured Data (JSON-LD Schema)
- **File**: `src/_includes/base.njk`
- **Updates**:
  - Enriched the global `@type: "ProfessionalService"` schema.
  - Added a compliant `"priceRange": "$$"` attribute to pass Google Search Console validation.
  - Embedded a geo-targeting `"areaServed"` array targeting Covasna, Transylvania, and Romania administrative regions.
  - Configured a `"knowsAbout"` expertise catalog consisting of: `["Graphic Design", "Event Photography", "Documentary Style Photography", "Videography", "Cinematic Video Production"]`.
  - Synced correct and active social media URLs in the `"sameAs"` array:
    - Instagram: `https://www.instagram.com/davideak_/`
    - LinkedIn: `https://www.linkedin.com/in/david-de-ak-b1a43437b/`

### C. Unique Page-Specific Metadata
- **Files**: All index templates in `src/en/`, `src/hu/`, and `src/ro/`.
- **Updates**:
  - Replaced the default fallback titles and empty/duplicate descriptions with specialized keyword-rich frontmatter metadata blocks:
    - **About pages**: `about.njk` (EN), `rolam.njk` (HU), `despremine.njk` (RO)
    - **Projects pages**: `projects.njk` (EN), `projektek.njk` (HU), `proiecte.njk` (RO)
    - **Blog index pages**: `blog.njk` (EN, HU, RO)
    - **Contact pages**: `contact.njk` (EN, RO), `kapcsolat.njk` (HU)

---

## 4. Preservation Guidelines for Future Agents
When modifying or updating this repository, future developers and AI agents **MUST**:
1. **Prevent Duplicate Descriptions**: Avoid deleting page-specific `description` properties in the frontmatter of individual templates.
2. **Preserve JSON-LD Attributes**: Ensure that any structural or layout updates to the master `base.njk` file do not degrade or remove the newly implemented `areaServed`, `knowsAbout`, `priceRange`, or corrected `sameAs` array elements in the schema script.
3. **Respect Locale Alignment**: When adding new project articles, blog posts, or translations, maintain consistent local geotargeting terminology matching the target list in Section 2.
4. **Build Validation**: Always verify site generation correctness by ensuring that templates compile cleanly via the Eleventy static build engine.
