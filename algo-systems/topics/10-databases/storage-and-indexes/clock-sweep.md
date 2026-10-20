---
id: db-clock-sweep
kind: trace
version: 2
level: 3
tags: [caching, databases, tracing]
requires:
  - db-clock-sweep-worked
  - interview-essentials/db-lru-recency-bet
probes:
  1: { out: "1", hand: "1" }
refs:
  - https://github.com/postgres/postgres/blob/master/src/backend/storage/buffer/README
  - https://github.com/postgres/postgres/blob/master/src/include/storage/buf_internals.h
  - https://en.wikipedia.org/wiki/Page_replacement_algorithm#Clock
elaborate: Postgres keeps a small usage count per frame instead of one bit. What does a count buy that a bit cannot?
---

Three frames, a reference bit per frame (set on every access), and a
clock hand. Every page has been accessed since the hand last moved.
`out` is the page evicted.

```cpp
int page[3] = {1, 2, 3};
bool ref[3] = {true, true, true};
int hand = 0;

int evict() {                                   // returns the victim frame
  while (ref[hand]) { ref[hand] = false; hand = (hand + 1) % 3; }
  int victim = hand;
  hand = (hand + 1) % 3;
  return victim;
}

int main() {
  int out = page[evict()];   // @1
}
```

---

**CLOCK (second chance)**: every set bit buys its page one more lap.
Here all three bits are set, so the hand clears each in turn and comes
back round to frame 0, whose bit is now clear: page 1 goes, and the
hand stops one past it. With every page hot, the sweep degrades to
evicting in the hand's order, like FIFO.

Postgres's buffer manager runs this sweep with a small usage count
(capped at 5) instead of a single bit.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
