---
id: book-match-cross
kind: code
version: 1
level: 3
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
      std::array<long, 8> qty{0, 0, 0, 5, 2, 0, 10, 0};
      int best = 3;
      long rest = buy(qty, best, limit, q);
      return {rest, best, best < 8 ? qty[best] : 0};
    }
    constexpr bool eq(Out x, Out y) { return x.rest == y.rest && x.best == y.best && x.left == y.left; }
    static_assert(eq(run(6, 12), {0, 6, 5}));    // sweeps 3 and 4, part of 6
    static_assert(eq(run(4, 4), {0, 3, 1}));     // partial fill at the touch
    static_assert(eq(run(4, 9), {2, 6, 10}));    // stops at the limit, 2 lots rest
    static_assert(eq(run(2, 7), {7, 3, 5}));     // limit below the best ask: no trade
    int main() {}
requires:
  - book-match-worked
  - cpp-essentials/iter-array-fixed-size
  - cpp-essentials/ptr-reference-must-bind
refs:
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms
  - https://web.archive.org/web/20110219155647/http://howtohft.wordpress.com/2011/02/15/how-to-build-a-fast-limit-order-book/
elaborate: Mirror this for an incoming sell against the bids. Which comparison and which direction of `best` change?
---

The interviewer: "a limit buy arrives; match it." `qty[t]` holds the
ask lots at price tick `t`; `best` is the lowest tick with lots, 8 if
none. `buy` returns the lots left to rest (`constexpr` lets the compiler
run it). Complete the loop.

```cpp
#include <array>
constexpr long buy(std::array<long, 8>& qty, int& best, int limit, long q) {
  while ({{c1::q > 0 && best <= limit}}) {
    long f = qty[best];
    if (q < f) f = q;                            // f: lots traded at best
    qty[best] -= f;  q -= f;
    while (best < 8 && qty[best] == 0) ++best;
  }
  return q;
}
```

---

**Trade while lots remain and the best ask is at or below the
limit.** A buy at 4 accepts an ask at 4, so `<` leaves a marketable
order resting. `>=` is the sell side's test. Without `q > 0` a filled
buy keeps looping forever on zero-lot trades.
