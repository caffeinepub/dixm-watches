# DIXM Watches

## Current State
New project. No existing frontend or backend code.

## Requested Changes (Diff)

### Add
- Full luxury watch brand website named "DIXM"
- 7-8 distinct pages/sections: Hero/Landing, Collections, Featured Watch, About, Craftsmanship, Technology, Contact, Footer
- Dark background on landing/hero page
- 3D animations using React Three Fiber / Three.js throughout
- Scroll-based animations and transitions
- Cloud/atmospheric effects (particle systems, fog, volumetric clouds)
- Brush stroke / paint effects as decorative elements
- Custom animated scrollbar
- Smooth page-to-page scroll with parallax
- Watch product listings (backend-driven: name, price, description, image placeholder)
- Contact form (stored in backend)

### Modify
- None (new project)

### Remove
- None (new project)

## Implementation Plan
1. Backend: Define watch product data model (id, name, collection, price, description, material), contact form submissions
2. Frontend:
   - Page 1 (Hero/Landing): Full-screen dark scene with 3D rotating watch model (Three.js), atmospheric fog, floating particles, dramatic lighting, DIXM logo
   - Page 2 (Collections): Grid of watch collections with hover 3D tilt effects and brush stroke dividers
   - Page 3 (Featured Watch): Large 3D watch showcase with orbital camera animation
   - Page 4 (Craftsmanship): Split-screen with animated brush/paint reveal effects and scroll-triggered text
   - Page 5 (About): Timeline with animated cloud/smoke background
   - Page 6 (Technology): Interactive 3D exploded watch diagram
   - Page 7 (Testimonials / Press): Scroll-animated quotes with particle effects
   - Page 8 (Contact): Dark form with animated background and submission to backend
3. Custom scrollbar styled to match brand
4. Smooth scroll library (or CSS scroll-snap) between sections
5. Global navigation bar that changes appearance on scroll
