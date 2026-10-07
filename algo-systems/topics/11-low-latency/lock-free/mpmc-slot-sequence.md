---
id: ll-mpmc-slot-sequence
kind: code
version: 1
level: 5
tags: [low-latency, lock-free, queues, concurrency]
input: chips
choices:
  c1:
    - "h + Ring::kCap"
    - "h + 1"
    - "h"
    - "h + Ring::kCap - 1"
compile:
  harness: |
    constexpr bool push(Ring& r, int v) {
      std::uint32_t t = r.tail; std::uint32_t& s = r.seq[t % Ring::kCap];
      if (s != t) return false;          // previous lap not yet consumed
      r.tail = t + 1; r.val[t % Ring::kCap] = v; s = t + 1;
      return true;
    }
    constexpr int run() {
      Ring r; int out = 0, sum = 0;
      for (int i = 1; i <= 4; ++i) if (!push(r, i)) return -1;
      if (push(r, 5)) return -2;         // full
      if (!pop(r, out) || out != 1) return -3;
      if (!push(r, 5)) return -4;        // the freed slot is reusable
      while (pop(r, out)) sum = sum * 10 + out;
      return sum;
    }
    static_assert(run() == 2345);
    int main() {}
requires:
  - ll-mpmc-queue
  - seq-ring-buffer-mask
refs:
  - https://www.1024cores.net/home/lock-free-algorithms/queues/bounded-mpmc-queue
---

Vyukov's bounded MPMC ring: slot `i` starts with sequence `i`; a producer
with ticket `t` may write only when its slot's sequence equals `t`, and
publishes `t + 1`. The atomics are modelled as plain integers so the
harness can run it at compile time. Complete what a consumer leaves
behind.

```cpp
#include <array>
#include <cstdint>
struct Ring {
  static constexpr std::uint32_t kCap = 4;
  std::array<std::uint32_t, kCap> seq{0, 1, 2, 3};
  std::array<int, kCap> val{};
  std::uint32_t tail = 0, head = 0;
};
constexpr bool pop(Ring& r, int& out) {
  std::uint32_t h = r.head; std::uint32_t& s = r.seq[h % Ring::kCap];
  if (s != h + 1) return false;      // not yet published
  r.head = h + 1; out = r.val[h % Ring::kCap]; s = {{c1::h + Ring\::kCap}};
  return true;
}
```

---

**The ticket of this slot's next producer: one lap later.** The producer
of ticket `h + kCap` waits for exactly that value, so each slot is handed
producer → consumer → next-lap producer by its own sequence, with no
global "committed" counter and no holes. `h + 1` would leave the slot
looking still full; the next lap's push would fail forever.

In the real queue, `tail`/`head` are claimed by CAS and `s` is a release
store read by an acquire load.
