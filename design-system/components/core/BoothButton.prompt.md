**BoothButton** — the big touchscreen button for the kiosk. 80px min height, ultra-contrast, 24px label. Use only inside the pure-black booth context.

```jsx
<BoothButton>Bayar Sekarang</BoothButton>
<BoothButton variant="outline">Tap Kartu e-money</BoothButton>
<BoothButton variant="danger">Masukkan Kode Override</BoothButton>
```

Variants: `primary` (amber on black) · `outline` (white on black, gray border) · `danger` (red). Press state darkens. Never smaller than 80px tall.
