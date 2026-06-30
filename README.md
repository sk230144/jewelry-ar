# LuxeAR — AR/VR Jewelry E-Commerce Platform

A next-generation luxury jewelry shopping experience powered by **Augmented Reality** and **3D visualization**, built for the Grovyn assignment.

---

## Live Features

| Feature | Description |
|---|---|
| **AR Virtual Try-On** | Real-time camera overlay to try on rings, necklaces, bracelets & earrings |
| **3D Product Viewer** | Interactive Three.js models with orbit controls, materials & lighting |
| **Authentication** | JWT-based auth with bcrypt password hashing |
| **Product Catalog** | Full CRUD with search, filtering (category, material, price), sorting, pagination |
| **Cart & Checkout** | Persistent cart via Zustand, multi-step checkout flow |
| **Wishlist** | Save and manage favourite items |
| **Contact System** | Inquiry form with API handler |
| **Responsive Design** | Mobile-first, dark luxury aesthetic with gold accents |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| 3D / AR | Three.js, @react-three/fiber, @react-three/drei, WebRTC |
| Backend | Next.js API Routes (serverless) |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| State | Zustand (persisted to localStorage) |
| Deployment | Vercel (recommended) |

---

## Getting Started

### 1. Install
```bash
cd jewelry-ar
npm install
```

### 2. Environment Variables
Create `.env.local`:
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/jewelry-ar
JWT_SECRET=your-super-secret-key-min-32-characters
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Seed the Database
```bash
npm run dev
# then open:
http://localhost:3000/api/products/seed
```

### 4. Run
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment to Vercel

1. Push to GitHub
2. Import at vercel.com
3. Add the three env vars in Vercel dashboard
4. Deploy

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── products/             # Listing + [id] detail with 3D + AR
│   ├── auth/                 # Login / Register
│   ├── cart/                 # Shopping cart
│   ├── checkout/             # Multi-step checkout
│   ├── wishlist/             # Saved items
│   ├── contact/              # Contact form
│   └── api/                  # auth, products, orders, wishlist, contact
├── components/
│   ├── 3d/JewelryViewer     # Three.js viewer
│   ├── ar/ARTryOn           # WebRTC camera + canvas AR overlay
│   ├── layout/              # Navbar, Footer
│   └── ui/                  # ProductCard, FilterSidebar, FeaturedProducts
├── models/                  # Mongoose: User, Product, Order
├── lib/                     # mongodb.ts, auth.ts (JWT)
├── store/                   # Zustand global state (cart, wishlist, user)
└── types/                   # TypeScript interfaces
```

---

## AR Technology

Uses **WebRTC** `getUserMedia` + **HTML5 Canvas** overlay:
- Category-specific jewelry overlays (ring on finger, necklace arc, bracelet band, earring drops)
- Animated golden sparkle pulse effects
- Photo capture & save to device
- No app install, no third-party SDK — browser-native

---

## Evaluation Highlights

- **Innovation**: Real AR try-on + interactive 3D viewer with material customization
- **UX**: Immersive dark luxury aesthetic with gold accents, smooth Framer Motion
- **Architecture**: Clean Next.js App Router, Mongoose models, Zustand store
- **Performance**: Dynamic imports for Three.js (SSR excluded), Next/Image optimization
- **Code Quality**: TypeScript throughout, clean component boundaries
