---
id: heap-sorted-insert-trace
kind: trace
version: 1
level: 2
tags: [foundations, heaps, priority-queue, arrays, complexity, tracing]
requires:
  - interview-essentials/heap-pq-adt-trace
probes:
  1: { s: "0" }
  2: { s: "5" }
  3: { m: "10" }
refs:
  - https://xlinux.nist.gov/dads/HTML/priorityque.html
  - https://en.wikipedia.org/wiki/Insertion_sort
---

A min-priority queue kept as a vector in **decreasing** order.
`insert_desc` returns how many keys it moved.

```cpp
int insert_desc(std::vector<int>& a, int x) {
  a.push_back(x);
  int i = a.size() - 1, shifts = 0;
  for (; i > 0 && a[i - 1] < x; --i, ++shifts) a[i] = a[i - 1];
  a[i] = x;
  return shifts;
}
std::vector<int> a{90, 70, 50, 30};
int s = insert_desc(a, 10);      // @1
s = insert_desc(a, 95);          // @2
int m = a.back();  a.pop_back(); // @3
```

---

Decreasing order parks the minimum at the back, so extract-min is
`back()` plus `pop_back()`: **O(1)**. The price moves to insert: every
key smaller than the new one shifts one slot right. 10 is the new
minimum and moves nothing; 95 is the new maximum and moves all 5.
So **insert O(n)**.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
