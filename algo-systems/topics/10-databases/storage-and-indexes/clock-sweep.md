---
id: db-clock-sweep
kind: trace
version: 1
level: 3
tags: [caching, databases, tracing]
requires:
  - db-lru-recency-bet
probes:
  1: { out: "2", hand: "2" }
  2: { out: "1", hand: "1", "ref[2]": "false" }
refs:
  - https://github.com/postgres/postgres/blob/master/src/backend/storage/buffer/README
  - https://en.wikipedia.org/wiki/Page_replacement_algorithm#Clock
---

Three frames, a reference bit per frame (set on every access), and a
clock hand. `out` is the page evicted.

```cpp
#include <array>

std::array<int, 3>  page{1, 2, 3};
std::array<bool, 3> ref{true, false, true};
int hand = 0;

int evict() {                                   // returns the victim frame
  while (ref[hand]) { ref[hand] = false; hand = (hand + 1) % 3; }
  int victim = hand;
  hand = (hand + 1) % 3;
  return victim;
}

int main() {
  int f = evict(); int out = page[f]; page[f] = 4; ref[f] = true;   // @1
  f = evict();     out = page[f];     page[f] = 5; ref[f] = true;   // @2
}
```

---

**CLOCK (second chance)**: a set bit buys a page one more lap — the hand
clears it and moves on — and the first page found with a clear bit is
evicted. Probe 1: page 1 is spared, page 2 goes. Probe 2: page 3 is
spared (its bit is now clear), and page 1, spared last lap, goes.

It approximates LRU with **one bit per frame**: a hit only sets that bit —
no list reordering and no lock — instead of moving a node to the front. Postgres's buffer
manager uses this clock sweep, with a small usage count (capped at 5)
instead of a single bit.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
