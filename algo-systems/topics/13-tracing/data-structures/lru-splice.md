---
id: trace-lru-splice
kind: trace
version: 1
level: 3
tags: [tracing, containers, iterators]
probes:
  1: { "order.front()": "1", "order.back()": "2", "*it": "1" }
  2: { "order.front()": "7", "order.back()": "2", "*it": "7" }
requires:
  - seq-invalidation-rules
refs:
  - https://en.cppreference.com/w/cpp/container/list/splice
---

```cpp
#include <iterator>
#include <list>

int main() {
  std::list<int> order{3, 2, 1};              // front = most recent
  auto it = std::next(order.begin(), 2);      // the node holding 1
  order.splice(order.begin(), order, it);     // @1
  *it = 7;                                    // @2
}
```

---

`splice` **relinks the node** rather than copying the element, so `it`
still points at the same node, now at the front. Writing through `it`
at probe 2 changes the front element: the iterator followed the node.

That stability is why an LRU cache can store list iterators in its
hash map and move entries on every hit in O(1). A `std::vector` would
shift the elements and leave every stored iterator pointing at the
wrong one.

Verified by compiling and running this program under GCC 16.2 and
printing the values at each probe.
