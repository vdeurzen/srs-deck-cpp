---
id: heap-pq-adt-trace
kind: trace
version: 2
level: 1
tags: [foundations, heaps, priority-queue, adt, tracing]
probes:
  1: { a: "15" }
  2: { b: "5", n: "1" }
refs:
  - https://xlinux.nist.gov/dads/HTML/priorityque.html
  - https://en.cppreference.com/w/cpp/container/priority_queue
elaborate: Say aloud where else a "smallest first, whatever the arrival order" promise appears in software you have used.
---

`q` is a min-priority queue: `insert(x)` adds a key, `extract_min()`
removes and returns one, `size()` counts what is left. How it stores the
keys is hidden.

```cpp
MinPQ q;
q.insert(40);
q.insert(15);
int a = q.extract_min();   // @1
q.insert(5);
int b = q.extract_min();
int n = q.size();          // @2
```

---

The promise is **the smallest key present**, whatever the arrival order:
15 beats the earlier 40, and 5, inserted last, leaves next. A FIFO
queue would have answered 40 first. After @2 the queue holds only 40.

That promise is the whole abstract data type: it says what comes out,
not how or at what cost. An array, a sorted array or a heap can all keep
it; they differ only in what each operation costs.

(Values from running it under GCC 16.2.)
