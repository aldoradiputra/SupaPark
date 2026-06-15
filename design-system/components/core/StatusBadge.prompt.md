**StatusBadge** — the canonical pill for lane / gate / payment / member status. Resolves label, color, and (for lane states) a leading status dot from a raw value.

```jsx
<StatusBadge value="online" />     {/* green + dot */}
<StatusBadge value="paid" />       {/* green */}
<StatusBadge value="pending" />    {/* amber */}
<StatusBadge value="error" />      {/* red */}
<StatusBadge value="override" />   {/* blue */}
```

Known values: lane `online/offline/syncing` · gate `open/closed/moving/error` · payment `paid/pending/override/failed` · member `active/expiring/expired`. Falls back to a neutral pill for unknown values.
