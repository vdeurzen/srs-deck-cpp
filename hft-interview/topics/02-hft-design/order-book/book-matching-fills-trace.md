---
id: book-matching-fills-trace
kind: trace
version: 2
level: 4
tags: [hft, order-book, matching, tracing]
probes:
  1: { front: "6", left: "3" }
requires:
  - book-fill-worked
  - book-fifo-fill
refs:
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms
elaborate: The next buy wants 10 lots and this price holds 7. Where do the other 3 go, and who decides?
---

One price level of a FIFO book, kept as a ring of pool slots: `n[s]` is
the slot after `s`, slot 0 is the sentinel, so `n[0]` is the front.
`qty[s]` is slot `s`'s open lots, and `unlink(s)` removes `s` from the
queue. A buy for 4 lots arrives.

```cpp
// Front to back: slot 3 (2 lots) -> slot 6 (5 lots) -> slot 1 (4 lots)
long fill(long q) {                       // trade up to q lots; return the rest
  for (int s = n[0]; q > 0 && s != 0; s = n[0]) {
    long f = std::min(q, qty[s]);  qty[s] -= f;  q -= f;
    if (qty[s] == 0) unlink(s);
  }
  return q;
}
long rest = fill(4);
int front = n[0];  long left = qty[front];   // @1
```

---

The buy takes all 2 lots of slot 3, which leaves the queue, then 2 of
slot 6's 5. Slot 6 stays at the front with 3: **a partial fill keeps
its place**. The order follows the queue's links, not the slot numbers,
and `rest` is 0.

Values from compiling and running an instrumented copy (with `unlink`
relinking the ring) under GCC 16.2 (`g++ -std=c++23 -Wall -Wextra
-fsanitize=address,undefined`, clean).
