---
id: ll-cas-retry-loop
kind: code
version: 1
level: 4
tags: [low-latency, lock-free, atomics, concurrency]
input: chips
choices:
  c1:
    - "cur < x && !a.compare_exchange_weak(cur, x)"
    - "!a.compare_exchange_weak(cur, x)"
    - "!a.compare_exchange_weak(cur, x) && cur < x"
    - "cur < x && !a.compare_exchange_weak(x, cur)"
    - "cur < x && a.compare_exchange_weak(cur, x)"
compile:
  harness: |
    // The atomic, modelled: atomics are not constant expressions. The first
    // CAS finds that another thread has already stored `race`.
    struct Racy {
      int v, race, cas_calls = 0;
      constexpr int load() const { return v; }
      constexpr bool compare_exchange_weak(int& expected, int desired) {
        if (cas_calls++ == 0) v = race;
        if (v != expected) { expected = v; return false; }
        v = desired;
        return true;
      }
    };
    constexpr Racy run(int start, int race, int x) {
      Racy a{start, race};
      store_max(a, x);
      return a;
    }
    static_assert(run(1, 9, 5).v == 9);           // the other thread went higher
    static_assert(run(1, 3, 5).v == 5);           // still lower: retry and win
    static_assert(run(1, 3, 5).cas_calls == 2);
    static_assert(run(9, 9, 5).v == 9);           // already higher: no CAS at all
    static_assert(run(9, 9, 5).cas_calls == 0);
    int main() {}
requires:
  - cpp-essentials/atomics-chunk-cas-loop
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic/compare_exchange
  - https://en.cppreference.com/w/cpp/atomic/atomic/fetch_max
elaborate: Which other read-modify-write in your code (a high-water mark, a saturating counter) must give up rather than retry when another thread gets there first?
---

Several threads record the highest price seen with `store_max`. Complete
the loop condition so `a` ends up holding the larger of its value and `x`,
whatever other threads store meanwhile. `Atomic` is `std::atomic<int>`,
or any type with the same `load` and `compare_exchange_weak`.

```cpp
template <class Atomic>
constexpr void store_max(Atomic& a, int x) {
  int cur = a.load();
  while ({{c1::cur < x && !a.compare_exchange_weak(cur, x)}}) {
  }
}
```

---

**Re-test the precondition against the refreshed `cur` before every
retry.** A failed CAS writes the value it found into `cur`; if another
thread stored something larger, the update is no longer wanted and the
loop must stop, not overwrite it.

Retrying on `!compare_exchange_weak` alone lowers the maximum from 9 back
to 5; testing `cur < x` only after the CAS writes before checking. The
arguments are (expected, desired): swapped, the loop stores the stale
`cur` over the value it raced with. C++26 adds
`fetch_max`, which is this loop.
