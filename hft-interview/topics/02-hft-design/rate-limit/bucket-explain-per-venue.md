---
id: bucket-explain-per-venue
kind: explain
version: 1
level: 5
tags: [hft, rate-limit, token-bucket, design, interview]
requires:
  - bucket-vs-window
  - bucket-truncation
  - bucket-monotonic-clock
refs:
  - https://www.rfc-editor.org/rfc/rfc2697
  - https://en.cppreference.com/w/cpp/chrono/steady_clock
  - https://blog.cloudflare.com/counting-things-a-lot-of-different-things/
elaborate: Write one venue's refill line, and say what breaks if `last` moves to now before it.
---
The interviewer: "Our gateway sends orders to several venues, and each
venue caps how many orders we may send per second. Add the check to
the order path." Walk through the design.
---
- [ ] Names one token bucket per venue, holding only credit and `last`, refilled at each check, so no timer thread
- [ ] Names capacity + rate × T ≤ the venue's limit for window T, since a full bucket bursts, then refills
- [ ] Rejects a counter reset at fixed window boundaries, because it admits twice the limit across a boundary whatever the count
- [ ] Names credit kept in integer nano-tokens, since whole tokens truncate a frequent check's earnings to 0
- [ ] Names a monotonic clock, since a wall clock set back makes elapsed time negative and blocks orders
