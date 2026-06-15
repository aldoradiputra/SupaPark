**Card** — dark raised surface (`#111`, 1px border, 12px radius). Elevation comes from the surface color, not shadow. `glow` adds the amber hero glow — feature cards only.

```jsx
<Card>
  <CardHeader><CardTitle>Pendapatan Hari Ini</CardTitle></CardHeader>
  <CardContent>
    <p style={{fontSize:28,fontWeight:700,color:'var(--text-primary)'}}>Rp 2,4jt</p>
  </CardContent>
</Card>

<Card glow>…hero…</Card>
```

Subcomponents: `Card`, `CardHeader`, `CardTitle`, `CardContent`. Never use a colored left-border-only card.
