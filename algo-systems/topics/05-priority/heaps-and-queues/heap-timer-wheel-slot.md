---
id: heap-timer-wheel-slot
kind: code
version: 1
level: 5
requires:
  - heap-timer-wheel
  - interview-essentials/seq-ring-buffer-mask
tags: [timers, queues, low-latency]
input: chips
choices:
  c1: ["(now + delay) & (N - 1)", "delay & (N - 1)", "(now + delay) % (N - 1)", "now + delay"]
compile:
  harness: |
    constexpr std::uint32_t tick(Wheel& w) {
      const unsigned slot = ++w.now & (N - 1);
      const std::uint32_t fired = w.bucket[slot];
      w.bucket[slot] = 0;
      return fired;
    }
    constexpr std::array<std::uint32_t, 5> run() {
      Wheel w;
      for (int i = 0; i < 6; ++i) tick(w);    // now == 6
      w.schedule(0, 3);                        // due at tick 9
      w.schedule(1, 1);                        // due at tick 7
      w.schedule(2, 4);                        // due at tick 10
      std::array<std::uint32_t, 5> fired{};
      for (auto& f : fired) f = tick(w);       // ticks 7, 8, 9, 10, 11
      return fired;
    }
    static_assert(run() == std::array<std::uint32_t, 5>{0b010, 0, 0b001, 0b100, 0});
    int main() {}
refs:
  - https://doi.org/10.1145/41457.37504
---

A single-level timing wheel of 8 one-tick buckets; a bucket's bit `t` set
means timer `t` fires when the cursor reaches it. Each tick does
`++now`, then fires and clears bucket `now & (N - 1)`. Complete the
bucket a new timer goes into.

```cpp
#include <array>
#include <cstdint>
constexpr unsigned N = 8;                         // a power of two
struct Wheel {
  std::array<std::uint32_t, N> bucket{};
  unsigned now = 0;                               // ticks since start
  constexpr void schedule(unsigned id, unsigned delay) {  // 0 < delay < N
    bucket[{{c1::(now + delay) & (N - 1)}}] |= 1u << id;
  }
};
```

---

**A bucket is an absolute tick mod N; the mask is that mod.** Scheduling
is one index computation and one store, with no comparison against any
other timer: the wheel's advantage over a heap.

`delay & (N - 1)` forgets the cursor, so timers fire early or late once
`now` is past 0. `% (N - 1)` uses a modulus the cursor does not. The
unmasked sum indexes past the array: undefined behaviour. Delays ≥ N need a rounds count or a coarser wheel.
