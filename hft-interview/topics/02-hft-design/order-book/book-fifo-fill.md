---
id: book-fifo-fill
kind: code
version: 1
level: 4
tags: [hft, order-book, matching, intrusive, implement-it]
input: chips
choices:
  c1:
    - "if (qty[s] == 0) cancel(s, gen[s]);"
    - "cancel(s, gen[s]);"
    - "if (qty[s] == 0) n[0] = n[s];"
    - "if (q == 0) cancel(s, gen[s]);"
compile:
  harness: |
    constexpr bool Level::cancel(int s, int g) {   // book-cancel-o1
      if (gen[s] != g) return false;
      n[p[s]] = n[s];  p[n[s]] = p[s];  ++gen[s];
      return true;
    }
    constexpr Level queued() {                     // FIFO 5 (4 lots) -> 2 (3) -> 7 (6)
      Level l;  int ring[] = {0, 5, 2, 7, 0};
      for (int i = 0; i < 4; ++i) { l.n[ring[i]] = ring[i + 1]; l.p[ring[i + 1]] = ring[i]; }
      l.qty[5] = 4;  l.qty[2] = 3;  l.qty[7] = 6;
      return l;
    }
    constexpr bool test() {
      Level a = queued();
      bool ok = a.fill(2) == 0 && a.n[0] == 5 && a.qty[5] == 2 && a.gen[5] == 0;   // partial: keeps its place
      Level b = queued();
      ok = ok && b.fill(9) == 0 && b.n[0] == 7 && b.p[0] == 7 && b.p[7] == 0
              && b.qty[7] == 4 && b.gen[5] == 1 && b.gen[2] == 1 && b.gen[7] == 0;
      Level c = queued();
      ok = ok && c.fill(20) == 7 && c.n[0] == 0 && c.p[0] == 0;                     // level emptied
      return ok;
    }
    static_assert(test());
    int main() {}
requires:
  - book-cancel-o1
refs:
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms
elaborate: An aggressor sweeps a level of 300 tiny orders. Which cache lines does each fill touch, and how would you keep them few?
---

On a FIFO venue the aggressor trades with the orders at one price in
arrival order. `Level` is the one from `book-cancel-o1`, plus open
quantity per slot. Complete the loop so each resting order leaves the
queue at the right moment.

```cpp
#include <algorithm>
#include <array>
struct Level {                                  // slot 0 is the sentinel: n[0] = front, p[0] = back
  std::array<long, 8> qty{};  std::array<int, 8> n{}, p{}, gen{};   // per pool slot
  constexpr bool cancel(int s, int g);          // as in book-cancel-o1: unlink s, ++gen[s]
  constexpr long fill(long q) {                 // trade up to q lots; return the rest
    for (int s = n[0]; q > 0 && s != 0; s = n[0]) {
      long f = std::min(q, qty[s]);  qty[s] -= f;  q -= f;
      {{c1::if (qty[s] == 0) cancel(s, gen[s]);}}
    }
    return q;
  }
};
```

---

**Remove the front order only when it is fully filled; a partial fill
stays at the front.** It keeps its time priority for the next
aggressor. Unconditional removal drops a partial order's rest. Moving
`n[0]` alone leaves `p` and the generation stale. Testing `q` instead
spins on an empty front order.
