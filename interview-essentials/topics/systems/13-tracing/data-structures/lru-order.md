---
id: trace-lru-order
kind: trace
version: 6
level: 3
tags: [tracing, caching, containers]
probes:
  1: { "index.count(2)": "0", "order.size()": "1" }
  2: { "order.front()": "3", "order.back()": "1" }
requires:
  - lru-design-worked
  - trace-lru-splice
elaborate: Say in one sentence, as to an interviewer, why the map stores list iterators rather than positions.
refs:
  - https://en.cppreference.com/w/cpp/container/list
  - https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_(LRU)
---

An LRU cache of capacity 2 in which 1 was used after 2; key 3 is not
cached. `index.count(k)` is 1 if `k` is a key of `index`, else 0.

```cpp
int main() {
  std::list<int> order;                                // front = most recent
  std::unordered_map<int, std::list<int>::iterator> index;
  order.push_front(2);
  index[2] = order.begin();
  order.push_front(1);
  index[1] = order.begin();
  if (order.size() == 2) {         // full: evict before inserting 3
    index.erase(order.back());
    order.pop_back();              // @1
  }
  order.push_front(3);
  index[3] = order.begin();        // @2
}
```

---

The O(1) LRU: a list in recency order plus a map from key to its
**list iterator**. Probe 1: `index.erase` read `order.back()` while it
was still **2**, the least recent, so 2's key is gone; only then did
`pop_back` drop the node, leaving 1. Popping first would have erased
key 1. Probe 2: 3 is now the front, 1 the back.

(Values from running it under GCC 16.2.)
