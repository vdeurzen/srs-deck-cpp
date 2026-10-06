---
id: atomics-trace-relaxed-counter
kind: trace
version: 1
level: 2
tags: [concurrency, atomics, memory-model, tracing]
probes:
  1: { old: "2000" }
  2: { now: "2005" }
requires:
  - atomics-modification-order
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic/fetch_add
  - https://en.cppreference.com/w/cpp/atomic/memory_order
---

```cpp
std::atomic<int> hits{0};
void count() {
  for (int i = 0; i < 1000; ++i)
    hits.fetch_add(1, std::memory_order_relaxed);
}
int main() {
  {
    std::jthread a(count), b(count);
  }
  int old = hits.fetch_add(5, std::memory_order_relaxed);  // @1
  int now = hits.load(std::memory_order_relaxed);          // @2
}
```

---

`relaxed` gives up ordering against *other* memory, not atomicity: each
`fetch_add` is one indivisible step in `hits`'s modification order, so
2000 increments are 2000 increments. The `jthread`s join at the closing
brace, which is what makes the later reads see the final count.
`fetch_add` returns the value *before* the addition (2000), and the
load after it sees 2005. This is the one place `relaxed` is the right
default: a counter whose value is never used to decide whether other
data is ready. Verified by running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -pthread`).
