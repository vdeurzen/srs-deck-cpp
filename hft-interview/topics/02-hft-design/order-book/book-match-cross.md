---
id: book-match-cross
kind: code
version: 1
level: 4
tags: [hft, order-book, matching, implement-it]
input: chips
choices:
  c1:
    - "q > 0 && best <= limit"
    - "q > 0 && best < limit"
    - "q > 0 && best >= limit"
    - "best <= limit"
compile:
  harness: |
    struct Out { long rest; int best; long left; };   // remainder, new best, qty resting there
    constexpr Out run(int limit, long q) {
      Asks a{{0, 0, 0, 5, 2, 0, 10, 0}, 3};
      long rest = buy(a, limit, q);
      return {rest, a.best, a.best < 8 ? a.qty[a.best] : 0};
    }
    constexpr bool eq(Out x, Out y) { return x.rest == y.rest && x.best == y.best && x.left == y.left; }
    static_assert(eq(run(6, 12), {0, 6, 5}));    // sweeps 3 and 4, part of 6
    static_assert(eq(run(4, 4), {0, 3, 1}));     // partial fill at the touch
    static_assert(eq(run(4, 9), {2, 6, 10}));    // stops at the limit, 2 lots rest
    static_assert(eq(run(2, 7), {7, 3, 5}));     // limit below the best ask: no trade
    int main() {}
requires:
  - algo-systems/ll-order-book-best
refs:
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms
  - https://web.archive.org/web/20110219155647/http://howtohft.wordpress.com/2011/02/15/how-to-build-a-fast-limit-order-book/
elaborate: Mirror this for an incoming sell against the bids. Which comparison and which direction of `best` change?
---

The interviewer: "on a price-time (FIFO) venue, an aggressive limit
buy arrives; match it." Asks are indexed by price tick; `buy` trades against them and returns what
is left to rest on the bid side. Complete the loop.

```cpp
#include <algorithm>
#include <array>
struct Asks { std::array<long, 8> qty{}; int best = 8; };   // best: lowest tick with qty > 0, 8 if none
constexpr long buy(Asks& a, int limit, long q) {            // pre: 0 <= limit < 8
  auto& [qty, best] = a;
  while ({{c1::q > 0 && best <= limit}}) {
    long f = std::min(q, qty[best]);
    qty[best] -= f;  q -= f;                                  // trade f lots at tick best
    while (best < 8 && qty[best] == 0) ++best;
  }
  return q;
}
```

---

**Trade while lots remain and the best ask is at or below the
limit.** A buy at 4 accepts an ask at 4, so `<` leaves a marketable
order resting. `>=` is the sell side's test. Without `q > 0` a filled
buy keeps looping on zero-lot trades (the compiler's loop limit
rejects it).
