---
id: ll-order-book-best
kind: code
version: 1
level: 5
tags: [low-latency, hft, data-structures]
input: chips
choices:
  c1:
    - "while (best >= 0 && qty[best] == 0) --best;"
    - "if (qty[t] == 0) --best;"
    - "while (qty[best] == 0) --best;"
    - "best = t - 1;"
compile:
  harness: |
    constexpr int after(auto f) { Bids b; f(b); return b.best; }
    static_assert(after([](Bids& b) { b.add(5, 10); b.add(2, 3); b.remove(5, 10); }) == 2);
    static_assert(after([](Bids& b) { b.add(5, 10); b.add(3, 1); b.remove(3, 1); }) == 5);
    static_assert(after([](Bids& b) { b.add(5, 10); b.remove(5, 4); }) == 5);
    static_assert(after([](Bids& b) { b.add(1, 2); b.remove(1, 2); }) == -1);
    int main() {}
requires:
  - ll-order-book-levels
refs:
  - https://web.archive.org/web/20110219155647/http://howtohft.wordpress.com/2011/02/15/how-to-build-a-fast-limit-order-book/
---

Bid levels sit in an array indexed by tick, and `best` caches the highest
non-empty one so the query every event asks is a load. Complete
`remove` so `best` stays correct.

```cpp
#include <array>
struct Bids {
  std::array<long, 8> qty{};   // resting quantity per tick
  int best = -1;               // highest tick with qty > 0, or -1 if none
  constexpr void add(int t, long q) { qty[t] += q; if (t > best) best = t; }
  constexpr void remove(int t, long q) {
    qty[t] -= q;
    {{c1::while (best >= 0 && qty[best] == 0) --best;}}
  }
};
```

---

**Move `best` only when the best level empties, scanning down to the next
non-empty tick.** A partial fill or a deeper level's cancel leaves it
alone; an emptied book must stop at −1, not read `qty[-1]`. The scan is
over ticks, usually one or two, because liquidity is dense near the
touch.
