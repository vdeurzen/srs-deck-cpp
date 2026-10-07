---
id: trace-ring-buffer-wrap
kind: trace
version: 2
level: 3
tags: [tracing, ring-buffer, low-latency]
probes:
  1: { "r.head": "0", "r.tail": "3", "r.tail - r.head": "3", "r.slot[0]": "10" }
  2: { "r.head": "1", "r.tail": "3", "r.tail - r.head": "2", "r.slot[0]": "10" }
  3: { "r.head": "1", "r.tail": "5", "r.tail - r.head": "4", "r.slot[0]": "50" }
  4: { "r.head": "1", "r.tail": "5", "r.tail - r.head": "4", "r.slot[0]": "50" }
requires:
  - seq-ring-buffer-full-vs-empty
refs:
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.wikipedia.org/wiki/Circular_buffer
---

```cpp
struct Ring {                       // capacity 4, free-running counters
  int slot[4]{};
  unsigned head = 0, tail = 0;
  void push(int v) {
    if (tail - head == 4) return;   // full: refuse
    slot[tail++ & 3] = v;
  }
};
int main() {
  Ring r;
  r.push(10); r.push(20); r.push(30);   // @1
  ++r.head;                             // @2  consume one
  r.push(40); r.push(50);               // @3
  r.push(60);                           // @4
}
```

---

The counters **never wrap**; only the indexing does. `tail − head` is
the size, so empty is 0 and full is 4, with no sacrificed slot.

Probe 3 is the one to sit with: `head` is 1, so 40 goes to `slot[3]`
and 50 to `slot[4 & 3] == slot[0]`, overwriting the 10 consumed at
probe 2. Nothing shifts; the overwrite is the ring. Probe 4: the size
is already 4, so the push is refused and nothing moves — back-pressure,
not unbounded growth. Unsigned subtraction keeps the size right even
when the counters wrap round.

Verified by compiling and running this program under GCC 16.2 and
printing each value at the probes.
