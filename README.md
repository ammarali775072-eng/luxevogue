# LUXEVOGUE — Luxury Digital Experience & Haute Horlogerie / Fashion Atelier

> **Tagline:** STYLE • QUALITY • YOU  
> **Secondary Tagline:** Luxury in Every Detail  

An Awwwards-inspired luxury fashion and lifestyle ecommerce experience featuring real-time 3D storytelling, continuous scroll-scrubbed product choreography, procedural Three.js luxury geometry, an interactive 3D product customization laboratory, and a production-grade full-stack ecommerce architecture.

---

## ✦ Key Architectural Features

1. **Cinematic Preloader & Vertical Split**: Custom GSAP timeline with gold monogram emergence, brand tracking reveal, numerical counter, and dual vertical curtain split.
2. **Immersive 3D Viewport Hero**: Real-time WebGL studio rendering with physical standard materials (carbon fiber, 18k champagne gold, DLC titanium), ACES Filmic tone mapping, three-point studio lighting, and smooth mouse inertia damping.
3. **500vh Scroll Storytelling Sequence**: Pinned 3D scene driven by GSAP ScrollTrigger through 5 narrative phases (Discover, Precision, Exploded Anatomy, Materiality, Atelier Reality) culminating in direct ecommerce card morphing.
4. **Interactive 3D Product Laboratory ("Customize Your Style")**: Real-time 3D sneaker configurator supporting dynamic color finishes, material textures (Matte, French Calf, Liquid Titanium), and live price updates.
5. **Horizontal Category Rails**: High-craft swipeable and draggable horizontal rails showcasing curated collections with image scale and gold accents.
6. **Contiguous Purchase Module (PDP)**: 360° interactive 3D studio viewer with instant toggle to high-resolution editorial photography gallery, swatch selection, size selector, and quick add.
7. **Complete Ecommerce State**: Powered by Zustand with persistent local storage for cart, item count, pricing math (subtotal, white-glove shipping threshold, totals), and curated wishlist.
8. **Multi-Step Checkout & Celebration**: 4-step progressive checkout supporting Credit Cards, Cash on Delivery (White-Glove), JazzCash, and Easypaisa, concluding in a full-screen confirmation state with gold confetti.
9. **Fluid Custom Cursor**: Desktop-only interpolated cursor halo with adaptive modes (`default`, `hover`, `product`, `drag`, `magnetic`).
10. **Design Discipline**: Adheres strictly to the Frontend Design Constitution (60-30-10 color discipline, zero generic pills, balanced typographic scale, WCAG compliance).

---

## ✦ Project Structure

```
src/
├── app/
│   ├── App.tsx             # Root router, Lenis provider & global overlay manager
│   └── routes.tsx
├── assets/
│   └── images/             # Generated luxury high-resolution assets
├── components/
│   ├── cart/               # Slide-over cart drawer & bag items
│   ├── hero/               # 3D canvas, typography & scroll choreography
│   ├── layout/             # Header, monumental footer & navigation
│   ├── navigation/         # Navbar (3-zone contract) & mobile animated menu
│   ├── products/           # Product cards, grids, category rails & filters
│   ├── search/             # Instant search overlay with autocomplete
│   ├── sections/           # 3D signature installation, customizer lab, marquee, stats
│   ├── three/              # R3F Canvas components & procedural luxury meshes
│   └── ui/                 # Custom cursor, preloader, scroll progress & toasts
├── data/
│   ├── products.ts         # High-craft products dataset with specifications
│   └── products.json       # Mock JSON feed
├── hooks/
│   ├── useLenis.ts         # Smooth inertia scrolling with GSAP ScrollTrigger
│   ├── useMagnetic.ts      # Elastic magnetic button physics
│   ├── useMediaQuery.ts    # Responsive viewport queries
│   └── useReducedMotion.ts # Accessibility motion preference hook
├── lib/
│   ├── constants.ts        # Luxury palette and brand definitions
│   └── utils.ts            # Currency formatting & mathematical helpers
├── pages/
│   ├── Home.tsx            # Pinned scroll storytelling & home showcase
│   ├── Shop.tsx            # Complete catalog with real-time filters & search
│   ├── Product.tsx         # PDP with 3D studio viewer & gallery
│   ├── Category.tsx        # Collection-specific views
│   ├── Wishlist.tsx        # Saved private archives
│   ├── Cart.tsx            # Dedicated cart review
│   ├── Checkout.tsx        # Multi-step checkout & order receipt
│   ├── About.tsx           # Atelier manifesto & heritage
│   ├── Contact.tsx         # Global salon concierge
│   └── NotFound.tsx        # Styled 404 sanctuary
├── services/
│   ├── productService.ts   # Product query abstraction
│   └── orderService.ts     # Order placement & serialization
├── store/
│   ├── cartStore.ts        # Zustand persistent shopping bag
│   ├── wishlistStore.ts    # Zustand persistent wishlist
│   └── uiStore.ts          # Drawer, theme, cursor, and toast state
└── styles/
    └── globals.css         # Theme CSS custom properties & noise grain
```

---

## ✦ Installation & Local Development

### Prerequisites
- Node.js 18+ or 20+
- npm or bun

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server (port 3000)
npm run dev

# 3. Compile and verify production build
npm run build

# 4. Preview production build locally
npm run preview
```

---

## ✦ 3D Model Placement & Customization

The project uses React Three Fiber (`@react-three/fiber`) and `@react-three/drei`.

1. **Adding Custom GLB / GLTF Models:**
   Place your compressed `.glb` files in `public/models/` or `src/assets/models/`.
2. **Integrating with `Product3DViewer`:**
   Import `useGLTF` from `@react-three/drei`:
   ```tsx
   import { useGLTF } from '@react-three/drei';
   const { scene } = useGLTF('/models/your_sneaker.glb');
   return <primitive object={scene} />;
   ```
3. **Procedural Fallback Safety:**
   `Product3DViewer.tsx` has built-in procedural meshes (`ProceduralSneaker`, `ProceduralWatch`, `ProceduralRing`) and automatically falls back to high-resolution studio photography if WebGL or the model fails to load.

---

## ✦ Editing Product Data

All products are defined in `src/data/products.ts`. Each product contains:
- `id`, `slug`, `name`, `brand`, `category`, `price`, `compareAtPrice`
- `description`, `shortDescription`
- `images`, `thumbnail`
- `colors` (name, hex, material)
- `sizes`
- `threeDConfig` (modelType, defaultColor, defaultMaterial, scale)
- `specs` (origin, materials, caliber, water resistance)

---

## ✦ Theme Customization

LUXEVOGUE supports both dark obsidian luxury and warm ivory daylight modes:
- **Dark (Default):** `#08090D` background, `#101118` secondary, `#161821` surface, `#D6B36A` gold.
- **Light:** `#F4EFE6` warm ivory background, `#DFD8C8` surface, `#966C22` burnished brass.
- Toggle between themes using the navbar sun/moon icon or via `useUIStore.getState().toggleTheme()`.

---

## ✦ Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.

### Netlify Deployment
1. Connect your repository to Netlify.
2. Build Command: `npm run build`.
3. Publish directory: `dist`.

---

© 2026 LUXEVOGUE ATELIER. All rights reserved.
