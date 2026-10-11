---
id: ll-trace-seqlock-retry
kind: trace
version: 1
level: 4
tags: [low-latency, concurrency, seqlock, tracing]
probes:
  1: { rx: "1", ry: "2", after: "2", retry: "true" }
  2: { before: "3", rx: "3", ry: "2", retry: "true" }
  3: { before: "4", rx: "3", ry: "3", retry: "false" }
requires:
  - ll-seqlock-reader
refs:
  - https://www.kernel.org/doc/html/latest/locking/seqlock.html
---

A seqlock reader's three attempts, with the writer's steps interleaved
by hand. The writer keeps `x == y`.

```cpp
unsigned seq = 0; int x = 1, y = 1;
void begin() { ++seq; }                     // odd: update in progress
void end()   { ++seq; }                     // even: stable
bool must_retry(unsigned b, unsigned a) { return (b & 1) || b != a; }

unsigned before = seq; int rx = x;
begin(); x = 2; y = 2; end();
int ry = y; unsigned after = seq;
bool retry = must_retry(before, after);                                    // @1

begin(); x = 3;
before = seq; rx = x; ry = y; after = seq; retry = must_retry(before, after);  // @2
y = 3; end();
before = seq; rx = x; ry = y; after = seq; retry = must_retry(before, after);  // @3
```

---

The first two copies are torn (`rx != ry`), and the counter catches each
a different way. At @1 both counter values are even but differ: a whole
write happened inside the copy. At @2 the counter did not change during
the copy, but it is odd: the copy started inside a write. At @3 the
write has finished and nothing overlaps, so the copy is kept. Verified
by running an instrumented copy under GCC 16.2 (`g++ -std=c++23`);
single-threaded, so the interleaving is exactly the one shown.
