**MetricCard** — the dashboard KPI tile: uppercase tertiary label, big tabular value, optional colored delta.

```jsx
<MetricCard label="Today's Revenue" value="Rp 2,4jt" delta="+12%" deltaColor="up" />
<MetricCard label="Active Sessions" value="47" delta="3 pending" />
<MetricCard label="Lanes Online" value="4/4" delta="All synced" deltaColor="up" />
```

`deltaColor`: `up` (green) · `down` (red) · `muted` (default). Values use tabular numerals. Lay out four-up in a grid.
