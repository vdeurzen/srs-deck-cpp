---
id: ll-trace-seqlock-retry
kind: trace
version: 1
level: 4
tags: [low-latency, concurrency, seqlock, tracing]
probes:
  1: { rx: "1", ry: "2", after: "2", retry: "true" }
  2: { before: "3", rx: "3", ry: "2", retry: "true" }
requires:
  - ll-seqlock-reader
refs:
  - https://www.kernel.org/doc/html/latest/locking/seqlock.html
---

A seqlock reader's two attempts, with the writer's steps interleaved by
hand. The writer keeps `x == y`.

```cpp
unsigned seq = 0; int x = 1, y = 1;
void begin() { ++seq; }                     // odd: update in progress
void end()   { ++seq; }                     // even: stable

unsigned before = seq;
int rx = x;
begin(); x = 2; y = 2; end();               // a whole write lands mid-copy
int ry = y;
unsigned after = seq;
bool retry = (before & 1) || before != after;   // @1

begin(); x = 3;                             // writer stalls mid-update
before = seq; rx = x; ry = y; after = seq;
retry = (before & 1) || before != after;        // @2
```

---

Both copies are torn (`rx != ry`), and the counter catches both in
different ways. At @1 both counter values are even, but they differ: a
complete write happened inside the copy. At @2 the counter did not change
during the copy, but it is odd: the copy started inside a write. Hence
the reader's two-part test. Verified by running an instrumented copy
under GCC 16.2 (`g++ -std=c++23`); single-threaded, so the interleaving
is exactly the one shown.
