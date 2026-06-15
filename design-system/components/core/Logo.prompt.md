**Logo** — the barrier-gate "P" mark, with optional `SUPAPARK` wordmark. Minimum size 24px.

```jsx
<Logo size={40} />                                  {/* amber mark */}
<Logo size={32} wordmark />                          {/* amber lockup */}
<Logo size={48} color="#FFF" wordmark wordmarkColor="#F5A623" /> {/* booth */}
```

The mark's vertical stroke is the gate post, the curve is the raised arm. Default amber; use white (`#FFF`) on the pure-black booth. Wordmark is always uppercase, `0.15em` tracked, weight 700.
