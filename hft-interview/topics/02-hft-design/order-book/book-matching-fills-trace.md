---
id: book-matching-fills-trace
kind: trace
version: 1
level: 4
tags: [hft, order-book, matching, tracing]
probes:
  1: { front1: "6", left1: "3" }
  2: { front2: "1", left2: "1" }
  3: { rest3: "8", front3: "0" }
requires:
  - book-fifo-fill
refs:
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms
---

`Level` and `fill(q)` are from `book-fifo-fill`: `fill` trades up to
`q` lots against the orders at one price, front first, and returns the
lots it could not fill. Three aggressive buys arrive in turn.

```cpp
// The queue at this price, front to back (slot 0 is the sentinel):
//   slot 3: 2 lots  ->  slot 6: 5 lots  ->  slot 1: 4 lots
Level l = queued();
l.fill(4);
int front1 = l.n[0];  long left1 = l.qty[front1];   // @1
l.fill(6);
int front2 = l.n[0];  long left2 = l.qty[front2];   // @2
long rest3 = l.fill(9);
int front3 = l.n[0];                                // @3
```

---

The first buy takes all 2 lots of slot 3, which leaves the queue, then
2 of slot 6's 5. Slot 6 stays at the front with 3: a partial fill keeps
its place. The second buy finishes slot 6 and takes 3 of slot 1's 4.

The third wants 9 but only 1 lot is left: slot 1 leaves, the ring is
back to the bare sentinel (`n[0] == 0`), and 8 lots go on to the next
price level or rest. Fill order follows the queue, not slot numbers.

Values from compiling and running an instrumented copy (non-constexpr,
with `queued()` building that ring) under GCC 16.2 (`g++ -std=c++23
-Wall -Wextra -fsanitize=address,undefined`, clean).
