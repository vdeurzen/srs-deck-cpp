---
id: book-fifo-vs-prorata
kind: basic
version: 1
level: 4
tags: [hft, order-book, matching]
requires:
  - book-fifo-fill
refs:
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms
elaborate: On a pro-rata product, what would a trader do instead of racing to be first in the queue?
---

## A buy for 10 lots hits a level holding A (first, 10 lots) and B (second, 30 lots). Who gets what under FIFO, and under pro-rata?

---

**FIFO: A gets all 10. Pro-rata: A gets 3, B gets 7.** Pro-rata
splits by share of the level, rounded down (10 × 10/40 → 2,
10 × 30/40 → 7), and CME hands the leftover lot out in time order, to A.
Real products also set a minimum allocation. Only FIFO rewards queue
position; pro-rata rewards size.
