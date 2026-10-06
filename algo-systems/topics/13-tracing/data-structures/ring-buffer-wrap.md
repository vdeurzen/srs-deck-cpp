---
id: trace-ring-buffer-wrap
kind: trace
version: 1
level: 3
tags: [tracing, ring-buffer, low-latency]
probes:
  1: { "r.head": "0", "r.tail": "3", "r.tail - r.head": "3", "r.slot[0]": "10", "ok": "true" }
  2: { "r.head": "1", "r.tail": "3", "r.tail - r.head": "2", "r.slot[0]": "10", "ok": "true" }
  3: { "r.head": "1", "r.tail": "5", "r.tail - r.head": "4", "r.slot[0]": "50", "ok": "true" }
  4: { "r.head": "1", "r.tail": "5", "r.tail - r.head": "4", "r.slot[0]": "50", "ok": "false" }
requires:
  - seq-ring-buffer-full-vs-empty
refs:
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.wikipedia.org/wiki/Circular_buffer
---

```cpp
#include <cstdint>

struct Ring {                       // capacity 4, free-running counters
  int slot[4]{};
  std::uint64_t head = 0, tail = 0;

  bool push(int v) {
    if (tail - head == 4) return false;
    slot[tail & 3] = v;
    ++tail;
    return true;
  }
  bool pop(int& out) {
    if (head == tail) return false;
    out = slot[head & 3];
    ++head;
    return true;
  }
};

int main() {
  Ring r;
  int out = 0;
  bool ok = true;
  r.push(10); r.push(20); r.push(30);   // @1
  r.pop(out);                           // @2
  r.push(40); r.push(50);               // @3
  ok = r.push(60);                      // @4
}
```

---

The counters **never wrap**; only the indexing does. `tail − head` is
the size, so "empty" is `0` and "full" is `4`, with no ambiguity and no
sacrificed slot — the design the ring-buffer Cards argue for.

Probe 3 is the one to sit with. After popping once, `head` is 1, so
pushing 40 and 50 takes `tail` to 5: 40 goes to `slot[3 & 3] ==
slot[3]` and 50 to `slot[4 & 3] == slot[0]` — the buffer has wrapped,
and `slot[0]` now holds **50**, overwriting the
10 that was consumed at probe 2. Nothing is shifted or moved; the
overwrite is the whole point of a ring.

Probe 4 shows the bound holding: `tail − head` is already 4, so the
push is refused and both counters stand still. A fixed-capacity queue
that refuses is a *feature* — it is back-pressure, and it is what keeps
a slow consumer from turning into unbounded memory growth.

The subtraction is also what makes the counters safe to leave
unwrapped: unsigned arithmetic gives the right size even across the
64-bit wrap, which at a billion pushes per second is 584 years away.

Verified by compiling and running this program under GCC 13.3
(`g++ -std=c++23 -Wall -Wextra`) and printing each value at the
probes.
