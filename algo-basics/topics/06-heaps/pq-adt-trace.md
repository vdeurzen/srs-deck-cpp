---
id: heap-pq-adt-trace
kind: trace
version: 1
level: 1
tags: [foundations, heaps, priority-queue, adt, tracing]
probes:
  1: { a: "15" }
  2: { b: "5", n: "3" }
  3: { c: "20" }
refs:
  - https://xlinux.nist.gov/dads/HTML/priorityque.html
  - https://en.cppreference.com/w/cpp/container/priority_queue
---

`q` is a min-priority queue: `insert(x)` adds a key, `extract_min()`
removes and returns one, `size()` counts what is left. How it stores the
keys is hidden.

```cpp
MinPQ q;
q.insert(40);  q.insert(15);  q.insert(70);
int a = q.extract_min();                    // @1
q.insert(5);   q.insert(20);
int b = q.extract_min(), n = q.size();      // @2
int c = q.extract_min();                    // @3
```

---

The promise is **the smallest key present**, whatever the arrival order:
15 beats the earlier 40, and 5, inserted late, leaves first. A FIFO
queue would have answered 40 first. After @2 the queue holds 40, 70, 20.

That promise is the whole abstract data type: it says what comes out,
not how or at what cost. An array, a sorted array or a heap can all keep
it; they differ only in what each operation costs.

Verified by compiling and running an instrumented copy (with
`std::priority_queue<int, std::vector<int>, std::greater<>>` as `MinPQ`)
under GCC 16.2 (`g++ -std=c++23 -Wall -Wextra`).
