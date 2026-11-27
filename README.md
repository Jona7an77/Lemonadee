# Lemonadee

Website template for **Lemonadee**, a 3D-print shop for gamers and anime fans.
It's a plain HTML/CSS/JS site: no build step, no framework. It runs on GitHub Pages for free.

**Pixel edition look:** Lemonadee palette (Lighthouse, Distant Cloud, Cocoon, June Ivy, Teal Spill + Lemon), square corners, 2px outlines, hard pixel shadows and Silkscreen pixel headings.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: hero + featured drops |
| `shop.html` | Catalog with category filters (`shop.html?category=lamps`) |
| `product.html` | Product detail (`product.html?id=8-bit-cat-lamp`) |
| `custom.html` | Custom order form, How it works, About and Contact |
| `404.html` | Not-found page |

## Edit your products

All products live in **`assets/js/products.js`**. For each one you can change the name, category, price, badge, description, colors and details.

- Prices show `[PRICE]` until you replace them, e.g. `price: "$24.00"`.
- Products show pixel-art placeholders. To use a real photo, put it in `assets/img/` and add `image: "assets/img/my-photo.jpg"` to the product.
- `featured: true` puts a product on the homepage (first 4).

## Things still to fill in

Search the files for `[` to find the placeholders:

- `[PRICE]` in `assets/js/products.js`
- `[X] days` for shipping and quote times (footer and `custom.html`)
- `[YOUR EMAIL]`, social links, local pickup and your story in `custom.html`

## Connect the custom-order form

GitHub Pages can't receive form submissions by itself. The free and easy fix:

1. Create a free form at [formspree.io](https://formspree.io).
2. Copy your form URL (looks like `https://formspree.io/f/abcdwxyz`).
3. In `custom.html`, paste it into `action=""` on the `<form id="custom-form">`.

Until then, the form shows a friendly "not connected yet" message.

## Checkout (decide later)

"Add to cart" currently counts items in the visitor's browser and shows a "checkout coming soon" message. When you're ready, the usual free or low-cost options for a static site are:

- **Stripe Payment Links:** one link per product, no monthly fee.
- **Snipcart:** a full cart for static sites, takes a fee per sale.
- **Shopify Starter / Buy Button:** a paid plan, but handles inventory and shipping.

## Hosting on GitHub Pages

Repo → **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)`** → Save.
The site goes live at `https://<your-username>.github.io/lemonadee/` within a minute or two.

## Fonts

Silkscreen and Inter load from Google Fonts.
