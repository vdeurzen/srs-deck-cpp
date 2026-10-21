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
      unsigned t = r.tail; unsigned& s = r.seq[t % Ring::kCap];
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
  - interview-essentials/seq-ring-buffer-mask
refs:
  - https://www.1024cores.net/home/lock-free-algorithms/queues/bounded-mpmc-queue
---

Vyukov's bounded MPMC ring, atomics as plain integers. A producer with
ticket `t` writes only when its slot's sequence is `t`, then publishes
`t + 1`. Complete what a consumer leaves behind.

```cpp
struct Ring {
  static constexpr unsigned kCap = 4;
  unsigned seq[kCap] = {0, 1, 2, 3}; int val[kCap] = {};
  unsigned tail = 0, head = 0;
};
constexpr bool pop(Ring& r, int& out) {
  unsigned h = r.head; unsigned& s = r.seq[h % Ring::kCap];
  if (s != h + 1) return false;      // not yet published
  r.head = h + 1; out = r.val[h % Ring::kCap]; s = {{c1::h + Ring\::kCap}};
  return true;
}
```

---

**The ticket of this slot's next producer: one lap later.** That
producer waits for exactly `h + kCap`, so each slot passes from producer
to consumer to next-lap producer by its own sequence, with no global
counter. `h + 1` leaves the slot looking full, so the next lap's push
fails forever. In the real queue, tickets are claimed by CAS and `s` is
a release store read by an acquire load.
