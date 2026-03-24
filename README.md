# Products Frontend

This is a Next.js frontend that fetches products from a `/products` API endpoint and renders them using shadcn/ui cards.

## Features

- Fetches product data with `axios` from `${NEXT_PUBLIC_API_BASE_URL}/products`
- Shows a loading state using shadcn/ui `Spinner`
- Shows API errors in a styled error block
- Renders each product in a shadcn/ui `Card` with:
	- Name and category
	- In-stock / out-of-stock badge
	- Price
	- Created date

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui

## Getting Started

### 1) Install dependencies

```bash
pnpm install
```

### 2) Run the app

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

The frontend will request products from:

- `${NEXT_PUBLIC_API_BASE_URL}/products`

If this variable is not set, it falls back to `http://localhost:3000`.

## API Shape Expected

The page expects this response structure from `GET /products`:

```json
{
	"products": [
		{
			"_id": "697a01b9261e6ef33cbd9cf9",
			"name": "Gaming Mouse",
			"price": 79.99,
			"category": "Electronics",
			"inStock": false,
			"createdAt": "2026-01-28T12:31:53.700Z"
		}
	]
}
```

## Scripts

- `pnpm dev` — run local development server
- `pnpm build` — build for production
- `pnpm start` — run production server
- `pnpm lint` — run ESLint

## Main File

- `app/page.tsx` — fetches and renders the product list UI
