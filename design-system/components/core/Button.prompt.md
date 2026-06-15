**Button** — SupaPark's primary action control; amber `default` variant carries authority, so reserve it for the main action on a screen.

```jsx
<Button>Tambah Member</Button>
<Button variant="secondary" size="sm">Batal</Button>
<Button variant="destructive">Hapus</Button>
<Button variant="outline" size="sm">Selesaikan</Button>
<Button variant="ghost">English</Button>
```

Variants: `default` (amber) · `destructive` (red) · `outline` · `secondary` · `ghost` · `link`. Sizes: `sm` (32px) · `default` (40px) · `lg` (48px) · `icon` (40×40). Carries its own hover/active/focus states. One amber button per view.
