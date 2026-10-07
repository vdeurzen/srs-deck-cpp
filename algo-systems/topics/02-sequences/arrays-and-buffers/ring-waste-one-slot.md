---
id: seq-ring-waste-one-slot
kind: basic
version: 1
level: 2
requires:
  - algo-basics/linear-ring-full-empty-trace
tags: [ring-buffer, queues]
refs:
  - https://en.wikipedia.org/wiki/Circular_buffer
---

## A 16-slot ring keeps wrapped indices and declares itself full when `(tail + 1) % 16 == head`. How many items can it hold?

```cpp
bool full()  const { return (tail + 1) % 16 == head; }
bool empty() const { return tail == head; }
```

---

**15: one slot always stays empty.** Leaving a gap means full and empty
can never both read `head == tail`. It is the simplest fix with wrapped
indices, at the price of one slot of capacity.
