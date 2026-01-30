# Project Overview & Documentation

## Introduction

This project is a static portfolio website built using the **11ty (Eleventy)** static site generator. It features a modern, responsive design powered by **Tailwind CSS** and supports multi-language content (English, Hungarian, Romanian) via the **eleventy-plugin-i18n**. The site is integrated with **Netlify CMS** for content management and uses **Nunjucks** for templating.

## Tech Stack

- **Core Framework:** [11ty (Eleventy) v3.1.2](https://www.11ty.dev/)
- **Styling:** [Tailwind CSS v4.1.11](https://tailwindcss.com/)
  - **Plugins:** `@tailwindcss/typography` (for styling markdown content prose)
- **Internationalization:** `eleventy-plugin-i18n`
- **Templating:** Nunjucks (`.njk`)
- **CMS:** Netlify CMS (configured in `src/admin`)
- **Deployment/Hosting:** Netlify (inferred from Identity widget)

---

## Directory Structure

- `./.eleventy.js`: Main configuration file for 11ty.
- `./tailwind.config.js`: Configuration for Tailwind CSS (theme, content paths, plugins).
- `./package.json`: Project dependencies and scripts.
- `./src/`: Source code directory.
  - `_data/`: Global data files available to all templates.
    - `translations.js`: Contains dictionary for i18n strings.
    - `site.json`: Global site metadata (e.g., URL).
  - `_includes/`: Reusable template partials (layouts, components).
    - `base.njk`: The main base layout wrapper.
    - `header.njk`, `footer.njk`: Site navigation and footer.
    - `hero.njk`, `projectshero.njk`, etc.: Section specific components.
  - `admin/`: Configuration for Netlify CMS.
    - `config.yml`: CMS collection, field, and backend settings.
    - `index.html`: Entry point for the CMS admin UI.
  - `assets/`: Static assets (images, fonts, user uploads).
  - `en/`, `hu/`, `ro/`: Content directories for each supported language. Each contains:
    - `index.njk`: Landing page for that language.
    - Content pages (e.g., `about.njk`, `blog.njk`, `projects.njk`).
    - Sub-collections (e.g., `blog/`, `projects/`).

---

## Configuration Details

### 1. `package.json`

Defines the project metadata and scripts.

- `"scripts"`:
  - `"start"`: `eleventy --serve` - Runs the local development server with hot-reloading.
  - `"build"`: `eleventy` - Compiles the site for production into the `public` folder.
- `"dependencies"` / `"devDependencies"`: Lists key libraries like `@11ty/eleventy`, `tailwindcss`, and plugins.

### 2. `.eleventy.js`

This is the brain of the build process.

- **Plugins**:
  - `eleventy-plugin-i18n`: Configured with:
    - `translations`: Loaded from `./src/_data/translations.js`.
    - `languages`: `['en', 'hu', 'ro']`.
    - `defaultLanguage`: `'en'`.
    - `fallbackLocales`: Maps explicit fallbacks to `'en'`.
- **Passthrough Copies** (`addPassthroughCopy`):
  - Moves files directly from `src` to `public` without processing.
  - Includes `style.css`, specific root images (`photo1.jpg` etc.), `assets/`, and `admin/`.
- **Filters**:
  - `postDate`: Formats a date object to "Month Day, Year" (e.g., "August 8, 2025"). Uses `toLocaleDateString`.
  - `projectDate`: Formats a date object to show only the year (e.g., "2025").
- **Return Object**:
  - `dir`: Sets input to `src` and output to `public`.
  - Sets `njk` (Nunjucks) as the template engine for Markdown, Data, and HTML files.

### 3. `tailwind.config.js`

Configures the visual system.

- `content`: Scans `src/**/*.{html,njk,md}` for class usage to tree-shake unused styles.
- `theme.extend.typography`:
  - Customizes the `@tailwindcss/typography` plugin.
  - Overrides default prose colors to use specific white and red shades (e.g., `colors.red.100` for headings, `colors.white` for body text).
  - This ensures markdown content (like blogs) matches the dark-themed design of the site.
- `plugins`: Includes `require('@tailwindcss/typography')`.

---

## Features & Implementation

### Internationalization (i18n)

The site uses a dictionary-based approach in `src/_data/translations.js`.

- **Structure**: The file exports a hierarchical object.
  - Example: `navbar.home` contains objects for `'en'`, `'hu'`, and `'ro'`.
- **Usage**: In Nunjucks templates, you would access these using the directory structure, likely combined with a custom filter or helper provided by the plugin (or direct data access if passed efficiently).
- **Routing**: Distinct folders (`en`, `hu`, `ro`) create the URL structure (e.g., `/en/about`, `/hu/rolam`).

### Templates (`src/_includes/`)

#### `base.njk`

The master layout file.

1.  **`<head>`**:
    - Sets meta tags (charset, viewport, description).
    - Loads `style.css` (Tailwind output).
    - Injects **Netlify Identity Widget** script (for CMS auth).
    - Injects **Cookiebot** script (GDPR compliance).
2.  **`<body>`**:
    - **Loader:** A full-screen overlay (`#loader`) with a cube animation.
    - **Main Container:** `#main` div, initially hidden (`invisible` class implied or handled by JS), to prevent FOUC (Flash of Unstyled Content) or show after load.
    - **Layout:**
      - `header.njk`: Top navigation.
      - `{{ content | safe }}`: Where the specific page content is injected.
      - `footer.njk`: Site footer.
3.  **Scripts**:
    - Window load event listener: Hides `#loader` and shows `#main`.
    - Netlify Identity logic: Redirects to `/admin/` upon successful login.

#### Component Partials

- `header.njk`: Navigation bar. likely uses `translations.navbar` for localized links.
- `hero.njk`: Hero section for the homepage.
- `projectshero.njk`: Specific hero for the projects listing page.

### 404 & Error Handling

- `404.njk`: Custom 404 page.
- Error messages are also internationalized (visible into `translations.errors`).

---

## Content Management (CMS)

- **Location**: `src/admin/config.yml` defines the schema.
- **Media**: Uploads go to `src/assets/upload` or similar.
- **Collections**: Likely defined for 'Blog', 'Projects', etc., allowing the user to create Markdown files via the UI.

## Build & Deployment

1.  **Development**: Run `npm start`. Access at `http://localhost:8080`.
2.  **Production**: Run `npm run build`.
    - 11ty processes files.
    - Tailwind scans and generates CSS.
    - Output lands in `public/`.
3.  **Netlify**: Automatically detects `package.json`, runs `npm run build`, and serves the `public` folder.

---

## Template Details (`src/_includes/`)

Here is a detailed breakdown of the included template partials with examples of their key implementations:

### 1. `base.njk` (Main Layout)

The master layout file that wraps every page.

- **Infrastructure**: Loads global styles, scripts, and injects third-party tools (Cookiebot, Netlify Identity).
- **Structure**: Defines the standard `header` -> `main` -> `footer` flow.
- **Interactivity**: Includes a loading screen overlay.

**Example Usage**:

```njk
<!-- Defines the skeleton of the site -->
<body class="bg-black text-white">
    <div id="loader">...</div> <!-- Loading Screen -->

    <div id="main" class="invisible ...">
        {% include "header.njk" %}

        <!-- The specific page content is injected here -->
        <main class="flex-grow">
            {{ content | safe }}
        </main>

        {% include "footer.njk" %}
    </div>
</body>
```

### 2. `header.njk` (Navigation)

The top navigation bar handling routing and localization.

- **Key Features**: Responsive menu and dynamic language switching.
- **Logic**: Detects the current locale from the URL to generate correct links.

**Example Usage**:

```njk
<!-- 1. Detect environment locale -->
{% set currentUrl = page.url or '/' %}
{% if currentUrl.startsWith('/hu') %}
  {% set locale = 'hu' %}
{% endif %}

<!-- 2. Generate localized links -->
<a href="/{{ locale }}/{{ 'slugs.blog' | i18n }}">
  {{ 'navbar.blog' | i18n }} <!-- Outputs 'Blog' or 'Blog' (HU) -->
</a>

<!-- 3. Language Switcher Macro -->
{{ getFlag(locale) }}
```

### 3. `footer.njk` (Footer)

The site-wide footer with social links and automated copyright date.

**Example Usage**:

```html
<!-- Auto-updating year -->
&copy;
<script>
  document.write(new Date().getFullYear());
</script>
{{ 'footer.copyright' | i18n }}
```

### 4. `hero.njk` (Homepage Hero)

The main landing visual featuring a stacked-card animation and typing effect.

**Example Usage**:

```html
<style>
  /* Animation definition for the back card */
  @keyframes card-fade-move-back {
    100% {
      transform: rotate(10deg)...;
      opacity: 1;
    }
  }
</style>

<div class="relative ...">
  <!-- Stacked Images with staggered animations -->
  <img src="/photo2.jpg" class="... animate-card-back" />
  <img src="/photo3.jpg" class="... animate-card-middle" />
  <img src="/cover.jpg" class="... animate-card-front" />

  <!-- Typing text effect -->
  <span class="typing-mask">{{ 'landinghero.title' | i18n }}</span>
</div>
```

### 5. `about-hero-section.njk` (About Page Hero)

The introduction section of the "About Me" page.

- **Design**: Two-column layout (Portrait | Text).

**Example Usage**:

```njk
<!-- Fetching translated content keys -->
<h2 class="...">
  <span class="text-red-600">
    {{ 'aboutherosection.title1' | i18n }} <!-- "A modern renaissance approach" -->
  </span>
</h2>
<p>
  {{ 'aboutherosection.text1' | i18n }}
</p>
```

### 6. `creative-tools.njk` (Skills Section)

Displays software proficiency and services.

**Example Usage**:

```njk
<!-- Loop through tools list -->
{% set tools = ['Pr', 'Ae', 'Ps', 'Lr', 'Id', 'VS'] %}
{% for tool in tools %}
  <div class="... bg-white text-black ...">{{ tool }}</div>
{% endfor %}

<!-- List services with icons -->
{% set services = ['creativetools.list1' | i18n, ...] %}
{% for service in services %}
  <li><svg>...</svg> {{ service }}</li>
{% endfor %}
```

### 7. `featuredhero.njk` (Featured Projects Hero)

Handles the logic for displaying featured projects in the correct language.

**Example Usage**:

```njk
<!-- Logic to find the localized version of a project -->
{%- for en in enItems -%}
  {% set chosen = en %}
  {%- for loc in locItems -%}
    <!-- Match by custom ID or matching filename slug -->
    {% if loc.fileSlug == en.fileSlug %}
      {% set chosen = loc %}
    {% endif %}
  {%- endfor -%}

  <!-- Pass data to the child component -->
  {% set title = chosen.data.title %}
  {% include "featured.njk" %}
{%- endfor -%}
```

### 8. `featured.njk` (Featured Project Card)

The visual card component for a single featured project.

**Example Usage**:

```njk
<!-- Relies on variables set by the parent (featuredhero.njk) -->
<a href="{{ url }}">
    <div class="aspect-[4/3] ...">
        <!-- Scale image on hover -->
        <img src="{{ image }}" class="group-hover:scale-105 ..." />
    </div>
    <!-- Overlay Text -->
    <div class="absolute bottom-4 ...">
        {{ title }}
    </div>
</a>
```

### 9. `featuredblog.njk` (Featured Blogs Section)

Displays the latest blog posts on the home/landing page.

**Example Usage**:

```njk
<!-- Loop through blog collection and render cards -->
<div class="grid ...">
  {%- for featuredblog in collections.featuredblog | reverse -%}
      <!-- Extract data -->
      {% set title = featuredblog.data.title %}
      <!-- Render Card -->
      {% include "blogcard.njk" %}
  {%- endfor -%}
</div>
```

### 10. `blogcard.njk` (Blog Post Card)

Reusable component for blog previews.

**Example Usage**:

```html
<!-- Visual Card Structure -->
<div class="group ...">
  <img src="{{ image }}" />
  <div class="p-5">
    <!-- Clamp text to 2 lines to ensure cards are even height -->
    <h5 class="line-clamp-2">{{ title }}</h5>
  </div>
</div>
```

### 11. `indiblog.njk` (Single Blog Post Layout)

The template for rendering an individual blog post page.

**Example Usage**:

```njk
---
layout: "base.njk" <!-- Extends the main layout -->
---
<div class="lg:ml-42 ...">
    <!-- Post Header -->
    <img src="{{ image }}" class="..." />
    <time>{{ date | postDate(locale) }}</time>

    <!-- Render Markdown Content here -->
    <article class="prose prose-red">
        {{ content | safe }}
    </article>
</div>
```

### 12. `projectshero.njk` (Projects Page Header)

Simple static header for the projects page.

**Example Usage**:

```njk
<h1>
  {{ 'projectshero.title1' | i18n }} <br>
  {{ 'projectshero.title2' | i18n }}
</h1>
```

### 13. `projectscard.njk` (Project Card)

The standard card for the projects index page. Focuses on interactions.

**Example Usage**:

```html
<div class="group relative ...">
  <!-- Image blurs when group is hovered -->
  <img src="{{ image }}" class="group-hover:blur-sm transition ..." />

  <!-- "All Details" text fades in when group is hovered -->
  <div class="opacity-0 group-hover:opacity-100 absolute inset-0 ...">
    ( {{ 'projectcard.alldetails' | i18n }} )
  </div>

  <!-- Footer Info -->
  <div>{{ title }} - {{ location }}</div>
</div>
```

### 14. `scrollingtrust.njk` (Trust/Logos Banner)

Infinite scrolling marquee of client logos.

**Example Usage**:

```html
<div class="slider-container ...">
  <div class="slider-track animate-slide flex ...">
    <img src="client1.png" />
    <img src="client2.png" />
    <!-- ... -->
  </div>
</div>

<!-- JS Duplicate trick for seamless infinite loop -->
<script>
  const track = document.querySelector(".slider-track");
  track.innerHTML += track.innerHTML;
</script>
```

### 15. `faq.njk` (Accordion Section)

Interactive FAQ component.

**Example Usage**:

```javascript
// Accordion Toggle Logic
toggle.addEventListener("click", () => {
  const content = toggle.nextElementSibling;

  if (!isOpen) {
    // Set explicit height to animate transition
    content.style.maxHeight = inner.scrollHeight + "px";
    inner.classList.add("opacity-100"); // Fade in text
  } else {
    content.style.maxHeight = null; // Close
  }
});
```

### 16. `contactmeform.njk` (Contact Form)

Integration with Formspree for handling emails.

**Example Usage**:

```html
<form action="https://formspree.io/f/xwpgwnkr" method="POST">
  <input name="email" type="email" required />
  <textarea name="message" required></textarea>

  <button type="submit">{{ 'contactform.sendmessage' | i18n }}</button>
</form>
```

### 17. `formsuccessfulpage.njk` (Success Page)

The destination page after form submission.

**Example Usage**:

```html
<!-- Simple confirmation UI -->
<h1>Message sent</h1>
<p>Thanks for reaching out...</p>
<a href="/">Back to home</a>
```

### 18. `mainaboutme.njk` (Homepage About Section)

A teaser "About" section designed for the homepage.

**Example Usage**:

```njk
<section>
    <h1>{{ 'mainaboutme.title' | i18n }}</h1>

    <div class="grid md:grid-cols-2 ...">
        <img src="/assets/..." />
        <div>
            <h2>01</h2>
            <p>{{ 'mainaboutme.text1' | i18n }}</p>
        </div>
    </div>
</section>
```
