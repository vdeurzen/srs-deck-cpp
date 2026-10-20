---
id: bucket-refill-worked
kind: basic
version: 1
level: 2
tags: [hft, rate-limit, token-bucket, worked-example]
requires:
  - bucket-burst-bound
refs:
  - https://www.rfc-editor.org/rfc/rfc2697
---

A token bucket earns 2 tokens per tick and holds at most 4; it starts
full at tick 0. Each order check first refills by the ticks since the
last check times 2, capped at 4, then spends one token.

| check at tick | refill | credit after order |
| --- | --- | --- |
| 0 | 4 + 0 × 2 = 4 | 3 |
| 1 | 3 + 1 × 2 = 5, cap → 4 | 3 |
| 1 | 3 + 0 × 2 = 3 | 2 |
| 10 | 2 + 9 × 2 = 20, cap → 4 | 3 |

## Why does the check at tick 10 refill only to 4, after 9 idle ticks?

---

**The capacity caps the credit: idle time cannot bank more than one full burst.**

Without the cap, those 20 tokens would allow a burst of 20 orders at
once, breaking the limit the capacity exists to enforce. The second
check at tick 1 adds nothing because no time has passed since the last.
