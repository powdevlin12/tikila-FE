# TIKILA Frontend - Next.js Migration

This project has been successfully migrated from **Vite + React** to **Next.js 15** with the App Router.

## 🚀 Migration Summary

### Major Changes

1. **Build System**: Migrated from Vite to Next.js
2. **Routing**: Changed from React Router DOM to Next.js App Router (file-based routing)
3. **Data Fetching**: Hybrid approach - Server Components for initial data + SWR for client-side updates
4. **Styling**: Maintained styled-components with proper SSR configuration
5. **Environment Variables**: Changed from `VITE_*` to `NEXT_PUBLIC_*` prefix

### Project Structure

```
tikila-FE/
├── app/                          # Next.js App Router (NEW)
│   ├── layout.tsx               # Root layout with Header/Footer
│   ├── page.tsx                 # Home page (server component)
│   ├── HomeClient.tsx           # Client component for home
│   ├── registry.tsx             # Styled-components SSR registry
│   ├── contact/
│   │   ├── page.tsx
│   │   └── ContactClient.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   └── ProductsClient.tsx
│   ├── product/[id]/
│   │   ├── page.tsx            # Dynamic route with generateMetadata
│   │   └── DetailProductClient.tsx
│   └── introduce/
│       ├── page.tsx
│       └── IntroduceClient.tsx
├── src/
│   ├── components/              # Reusable components (marked with 'use client')
│   ├── services/                # API client & SWR hooks
│   ├── hooks/                   # Custom hooks (useMediaQuery, etc.)
│   ├── interfaces/              # TypeScript interfaces
│   ├── contants/                # Constants (colors, sizes)
│   └── utils/                   # Utility functions
├── public/                      # Static assets
├── .env.development            # Development environment
├── .env.production             # Production environment
├── next.config.js              # Next.js configuration
├── .babelrc                    # Babel config for styled-components SSR
└── tsconfig.json               # TypeScript configuration with path aliases

```

## 📦 Installation & Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create `.env.development` and `.env.production` files:

```env
# .env.development
NEXT_PUBLIC_API_BASE_URL=http://localhost:1236

# .env.production
NEXT_PUBLIC_API_BASE_URL=https://powdevlin68.info/api
```

## 🔧 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

The development server runs at **http://localhost:3000**

## 🏗️ Architecture Decisions

### Server vs Client Components

**Server Components** (default):

- `app/page.tsx` - Home page with initial data fetching
- `app/products/page.tsx` - Products list
- `app/product/[id]/page.tsx` - Product details with dynamic metadata
- `app/introduce/page.tsx` - Introduction page

**Client Components** (`'use client'`):

- All components in `src/components/` (use hooks, styled-components, or interactivity)
- All custom hooks in `src/hooks/`
- Client wrappers for pages (e.g., `HomeClient.tsx`)

### Data Fetching Strategy

1. **Server-side**: Initial page load uses `fetch()` with revalidation in page.tsx
2. **Client-side**: Interactive updates use SWR hooks from `src/services/hooks.ts`
3. **Caching**:
   - Static content: 1 hour revalidation
   - Products: 30 minutes revalidation
   - Uses Next.js automatic request deduplication

### Routing Migration

| Old Route (React Router) | New Route (Next.js)         |
| ------------------------ | --------------------------- |
| `/`                      | `app/page.tsx`              |
| `/contact`               | `app/contact/page.tsx`      |
| `/products`              | `app/products/page.tsx`     |
| `/product/:id`           | `app/product/[id]/page.tsx` |
| `/introduce`             | `app/introduce/page.tsx`    |

### Navigation Updates

- `<Link>` from `react-router-dom` → `<Link>` from `next/link`
- `useNavigate()` → `useRouter()` from `next/navigation`
- `useLocation()` → `usePathname()` from `next/navigation`

## 🎨 Styling

### Styled-Components SSR Setup

The project uses a custom SSR registry (`app/registry.tsx`) to ensure styled-components works correctly with Next.js server-side rendering.

**Babel Configuration** (`.babelrc`):

```json
{
	"presets": ["next/babel"],
	"plugins": [
		[
			"babel-plugin-styled-components",
			{
				"ssr": true,
				"displayName": true
			}
		]
	]
}
```

### Responsive Design

- Maintained the `useMediaQuery` hook for client-side responsive logic
- Mobile breakpoint: 768px (`MOBILE_MAX_WIDTH`)
- Separate mobile/desktop components for home page

## 🔍 SEO & Metadata

Each page now uses Next.js Metadata API:

```typescript
export const metadata: Metadata = {
	title: 'Page Title - TIKILA',
	description: 'Page description',
};
```

Dynamic pages use `generateMetadata()` for product-specific SEO.

## 🚨 Known Issues & Considerations

1. **React Bootstrap**: Works with SSR but may show hydration warnings in development. These are cosmetic and don't affect functionality.

2. **SWR + Server Components**: The project uses a hybrid approach - initial data from server components, then SWR for updates. This is intentional for optimal performance.

3. **Babel vs SWC**: Using Babel for styled-components SSR support. SWC compiler is disabled but this doesn't impact performance significantly.

## 🔄 API Integration

### API Client (`src/services/api.ts`)

- Updated to check `typeof window !== 'undefined'` before accessing `localStorage`
- Uses `NEXT_PUBLIC_API_BASE_URL` environment variable
- Maintains axios interceptors for authentication

### SWR Hooks (`src/services/hooks.ts`)

- Marked with `'use client'` directive
- Available hooks:
  - `useApi<T>(url)` - Basic data fetching
  - `useApiWithQuery<T>(url, query)` - With query parameters
  - `useApiWithPagination<T>(url, page, limit)` - Paginated data
  - `useApiConditional<T>(url, condition)` - Conditional fetching

## 📈 Performance Improvements

1. **Automatic Code Splitting**: Each route is automatically split
2. **Image Optimization**: Ready for `next/image` component (to be implemented)
3. **Server-side Rendering**: Initial page loads are faster
4. **Request Deduplication**: Next.js automatically deduplicates same requests
5. **Prefetching**: Links are automatically prefetched on hover

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Traditional VPS/Server

```bash
# Build the application
npm run build

# Start production server
npm start
```

Ensure Node.js 18+ is installed and PM2 or similar process manager is used for production.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Styled-Components with Next.js](https://nextjs.org/docs/app/building-your-application/styling/css-in-js)
- [SWR Documentation](https://swr.vercel.app)

## 🤝 Contributing

When adding new pages:

1. Create `page.tsx` in appropriate `app/` folder
2. Use Server Component for initial data fetch
3. Create `*Client.tsx` for interactive features
4. Add metadata using Metadata API
5. Mark components with `'use client'` when needed

## 📝 License

[Your License Here]

---

**Migration completed**: November 2025
**Next.js Version**: 15.5.6
**React Version**: 19.1.1
