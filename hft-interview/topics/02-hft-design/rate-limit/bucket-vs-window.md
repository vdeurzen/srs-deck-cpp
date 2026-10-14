---
id: bucket-vs-window
kind: basic
version: 1
level: 4
tags: [hft, rate-limit, token-bucket]
requires:
  - bucket-burst-bound
refs:
  - https://blog.cloudflare.com/counting-things-a-lot-of-different-things/
elaborate: Your fixed-window limiter is already live. What is the smallest change that keeps it inside the venue's limit, and what throughput does that cost?
---

## A venue allows at most 100 orders in any 1 s. Your limiter counts orders per clock second, resetting at each whole second, and admits 100 per second. At most how many orders can it send within 1 s?

---

**200: 100 just before a whole second and 100 just after it.** The
reset forgets the first batch, so both fit within milliseconds.
A token bucket is no cure by itself (capacity = rate also allows 200),
but you can size it: capacity + rate × T ≤ limit (10 and 90/s). A
fixed window always allows double.
