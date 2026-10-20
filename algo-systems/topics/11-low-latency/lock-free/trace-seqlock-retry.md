---
id: ll-trace-seqlock-retry
kind: trace
version: 2
level: 4
tags: [low-latency, concurrency, seqlock, tracing]
probes:
  1: { rx: "2", ry: "1" }
  2: { after: "1", retry: "true" }
requires:
  - ll-seqlock-reader
refs:
  - https://www.kernel.org/doc/html/latest/locking/seqlock.html
elaborate: Say in one sentence why the writer must make the counter odd before touching the data, not after.
---

One seqlock read attempt, with the writer's steps interleaved by hand.
The writer keeps `x == y`, bumping `seq` before and after each update.

```cpp
unsigned seq = 0; int x = 1, y = 1;
bool must_retry(unsigned b, unsigned a) { return (b & 1) || b != a; }

++seq; x = 2;                             // writer: begin, half the update
unsigned before = seq;                    // reader starts
int rx = x, ry = y;                       // @1
unsigned after = seq;
bool retry = must_retry(before, after);   // @2
```

---

The copy is torn, `rx != ry`, yet the counter did not move during it:
the writer was already inside its update when the reader began.
**An odd `before` alone forces the retry**; a test of `before != after`
by itself would keep this copy. Verified by running an instrumented
copy under GCC 16.2 (`g++ -std=c++23`); single-threaded, so the
interleaving is exactly the one shown.
