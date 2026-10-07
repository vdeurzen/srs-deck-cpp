---
id: heap-timer-wheel-slot
kind: code
version: 1
level: 5
requires:
  - heap-timer-wheel
  - seq-ring-buffer-mask
tags: [timers, queues, low-latency]
input: chips
choices:
  c1: ["(now + delay) & (N - 1)", "delay & (N - 1)", "(now + delay) % (N - 1)", "now + delay"]
compile:
  harness: |
    constexpr std::array<std::uint32_t, 5> run() {
      Wheel w;
      for (int i = 0; i < 6; ++i) w.tick();   // now == 6
      w.schedule(0, 3);                        // due at tick 9
      w.schedule(1, 1);                        // due at tick 7
      w.schedule(2, 4);                        // due at tick 10
      std::array<std::uint32_t, 5> fired{};
      for (auto& f : fired) f = w.tick();      // ticks 7, 8, 9, 10, 11
      return fired;
    }
    static_assert(run() == std::array<std::uint32_t, 5>{0b010, 0, 0b001, 0b100, 0});
    int main() {}
refs:
  - https://doi.org/10.1145/41457.37504
---

A single-level timing wheel of 8 one-tick buckets; a bucket's bit `t` set
means timer `t` fires when the cursor reaches it. Complete the bucket a
new timer goes into.

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
  constexpr std::uint32_t tick() {
    const unsigned slot = ++now & (N - 1);
    const std::uint32_t fired = bucket[slot];
    bucket[slot] = 0;
    return fired;
  }
};
```

---

A bucket is an *absolute* tick modulo the wheel size, so a timer due
`delay` ticks from now goes in `(now + delay) mod N`, and the mask is
that modulo for a power-of-two N. Scheduling is one index computation and
one store: no comparison with any other timer, which is the wheel's whole
advantage over a heap.

`delay & (N − 1)` forgets the cursor, so timers fire at the wrong time
once `now` is past 0. `% (N − 1)` uses a modulus the cursor does not, and
the unmasked sum indexes past the array — undefined behaviour, which a
constant evaluation rejects. Delays of N or more need either a "rounds
remaining" count per timer or a coarser wheel above this one.
