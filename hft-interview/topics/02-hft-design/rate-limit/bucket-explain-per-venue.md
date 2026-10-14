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
- [ ] Names one token bucket per venue, its state only credit and `last`, refilled on demand at each check, because then the order path needs no timer thread
- [ ] Names sizing each bucket so capacity + rate × T ≤ the venue's limit for its window T, because a full bucket admits its burst plus the refill in any span
- [ ] Rejects a counter reset at fixed window boundaries, because it admits twice the limit across a boundary whatever the count
- [ ] Names credit kept as integer nano-tokens with no division, because whole tokens truncate a frequent check's earnings to 0 and the bucket never refills
- [ ] Names a monotonic clock for `now`, because a wall clock set back makes the elapsed time negative and blocks orders until the lost credit is earned back
