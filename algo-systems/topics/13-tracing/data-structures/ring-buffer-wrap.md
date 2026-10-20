---
id: trace-ring-buffer-wrap
kind: trace
version: 3
level: 3
tags: [tracing, ring-buffer, low-latency]
probes:
  1: { "r.tail": "5", "r.slot[0]": "50" }
  2: { "r.tail - r.head": "4", "r.slot[1]": "20" }
requires:
  - interview-essentials/seq-ring-buffer-full-vs-empty
refs:
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.wikipedia.org/wiki/Circular_buffer
elaborate: A market-data feed outruns its consumer and this ring fills. Where would you rather lose data, at the producer or the consumer, and why?
---

A ring of 4 slots with counters that only grow. 10, 20 and 30 have been
pushed and 10 consumed, so `head` is 1 and `tail` is 3.

```cpp
struct Ring {
  int slot[4]{};
  unsigned head = 0, tail = 0;
  void push(int v) {
    if (tail - head == 4) return;   // full: refuse
    slot[tail & 3] = v;
    ++tail;
  }
};
int main() {
  Ring r{{10, 20, 30, 0}, 1, 3};
  r.push(40); r.push(50);   // @1
  r.push(60);               // @2
}
```

---

The counters **never wrap**; only the indexing does. 40 goes to
`slot[3 & 3]`, slot 3, and 50 to `slot[4 & 3]`, slot 0, over the 10
already consumed. Nothing shifts; the overwrite is the ring. Now
`tail − head` is 4, full, so 60 is refused and 20, not yet consumed,
survives: back-pressure, not unbounded growth or lost data.

Verified by compiling and running this program under GCC 16.2 and
printing each value at the probes.
