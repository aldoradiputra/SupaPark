**PlateDisplay** — renders a license plate as the brand's signature mono-amber chip. The plate is the ticket, so it always looks the same.

```jsx
<PlateDisplay plate="B 1234 ABC" />
<PlateDisplay plate="d 5678 xy" size="sm" />
<PlateDisplay plate="L 9012 ZZ" size="lg" />
```

Always JetBrains Mono, amber, `0.1em` tracking, amber-10% fill. Sizes `sm/md/lg`. On the booth, plates render at 48px white — that's the booth context, not this chip.
