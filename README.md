# Nova Market

A responsive, front-end ecommerce storefront built with HTML, CSS, and vanilla JavaScript. Browse a curated product catalog, search or filter items, manage a shopping bag, review delivery options, and explore sample order and tracking pages.

> **Demo project:** This is a browser-only storefront. It does not connect to a real inventory, payment provider, account system, or order-processing backend.

## Features

- Responsive storefront with product search and category filters
- Product cards with ratings, quantity selection, and add-to-bag feedback
- Shopping bag persisted in browser `localStorage`
- Checkout summary with editable quantities, delivery options, shipping, and estimated tax
- Empty-bag state with a link back to the catalog
- Sample orders with working “Buy it again” bag updates
- Sample package-tracking page
- Jasmine browser tests for cart, order-summary, and currency behavior

## Getting started

No build step or package installation is required. Serve the project directory over HTTP so that browser JavaScript modules load correctly.

### Option 1: Python

From the project root, run:

```powershell
py -m http.server 8000
```

If the Python launcher is unavailable, try `python -m http.server 8000`.

### Option 2: Visual Studio Code

Open the project folder in Visual Studio Code and use the Live Server extension to serve `amazon.html`.

Then open:

- Storefront: <http://localhost:8000/amazon.html>
- Checkout: <http://localhost:8000/checkout.html>
- Orders: <http://localhost:8000/orders.html>
- Tracking: <http://localhost:8000/tracking.html>

The checkout uses Day.js from unpkg to calculate delivery dates. Google Fonts are also loaded remotely; without an internet connection the pages fall back to local system fonts, and checkout delivery dates may not render.

## Running the tests

Start the local HTTP server using one of the methods above, then open:

<http://localhost:8000/tests/tests.html>

The Jasmine runner displays the spec and failure counts in the browser. The suite currently covers cart operations, order-summary rendering, and currency formatting.

## Project structure

```text
.
├── amazon.html                 # Storefront and product catalog
├── checkout.html               # Shopping bag and checkout summary
├── orders.html                 # Sample order history
├── tracking.html               # Sample delivery-tracking view
├── backend/
│   └── products.json           # Example product data
├── data/
│   ├── cart.js                 # Cart state and localStorage persistence
│   ├── deliveryOptions.js      # Shipping choices and delivery estimates
│   └── products.js             # Product catalog data
├── images/                     # Product images, icons, and ratings
├── scripts/
│   ├── amazon.js               # Catalog rendering, search, filters, and bag actions
│   ├── orders.js               # Order-page bag actions
│   ├── store-header.js         # Shared bag-count display
│   ├── checkout.js             # Checkout page entry point
│   ├── checkout/               # Order and payment summaries
│   └── utils/                  # Shared helpers
├── styles/
│   ├── shared/                 # Design tokens and shared header styles
│   └── pages/                  # Page-specific styles
└── tests/                      # Jasmine browser test runner and specs
```

## Shopping bag behavior

The cart is stored under the `cart` key in the browser’s local storage and is shared by the pages served from the same origin. On a fresh browser profile, the project seeds a small sample cart so checkout has products to display. To try the empty-bag state, remove the items from checkout; to reset the demo cart, clear the site’s local storage and reload.

## Customizing the catalog

Edit the `products` array in `data/products.js` to update product names, images, prices, ratings, or keywords. Product images are stored in `images/products/`. Catalog search matches product names and keywords; category filters derive their categories from the product keywords.
