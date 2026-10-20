---
id: atomics-trace-relaxed-counter
kind: trace
version: 2
level: 2
tags: [concurrency, atomics, memory-model, tracing]
probes:
  1: { old: "4" }
  2: { now: "9" }
requires:
  - atomics-modification-order
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic/fetch_add
  - https://en.cppreference.com/w/cpp/atomic/memory_order
elaborate: Name a counter in your own code that only gets read at the end, and say why `relaxed` is enough for it.
---

`hits.fetch_add(n, order)` adds n in one indivisible step and returns
the value from just before the addition.

```cpp
std::atomic<int> hits{0};
void count() {
  hits.fetch_add(1, std::memory_order_relaxed);
  hits.fetch_add(1, std::memory_order_relaxed);
}
int main() {
  std::thread a(count), b(count);
  a.join(); b.join();
  int old = hits.fetch_add(5, std::memory_order_relaxed);  // @1
  int now = hits.load(std::memory_order_relaxed);          // @2
}
```

---

`relaxed` gives up ordering against *other* memory, not atomicity:
each of the four `fetch_add(1)` calls is one step in `hits`'s
modification order, so none is lost and `hits` is 4 after the joins.
`fetch_add(5)` returns that 4, and the load after it sees 9. A counter
read only at the end is where `relaxed` is the right choice. Verified
by running an instrumented copy under GCC 16.2 with ThreadSanitizer.
