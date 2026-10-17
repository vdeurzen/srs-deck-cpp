---
id: atomics-chunk-cas-loop
kind: chunk
version: 1
level: 3
tags: [concurrency, atomics, lock-free, idioms]
expose_ms: 7000
compile:
  harness: |
    int main() {}
requires:
  - atomics-compare-exchange-failure
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic/compare_exchange
---

```cpp
#include <atomic>
std::atomic<unsigned> v{1};
void double_it() {
  unsigned old = v.load(std::memory_order_relaxed);
  while (!v.compare_exchange_weak(old, old * 2)) {
  }
}
```

---

The **CAS loop**: read a snapshot, compute from it, and
`compare_exchange` the result in only if nobody changed the object
meanwhile. On failure `compare_exchange` overwrites `old` with the
current value, so the loop body is empty: the retry recomputes from the
refreshed snapshot. (`weak` may also fail spuriously; the loop retries
that too.)
