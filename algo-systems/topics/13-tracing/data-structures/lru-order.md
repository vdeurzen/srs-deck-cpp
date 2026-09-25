---
id: trace-lru-order
kind: trace
version: 1
level: 3
tags: [tracing, caching, containers]
probes:
  1: { "order.front()": "1", "order.back()": "1", "order.size()": "1", "index.count(2)": "0" }
  2: { "order.front()": "3", "order.back()": "1", "order.size()": "3", "index.count(2)": "1" }
  3: { "order.front()": "1", "order.back()": "2", "order.size()": "3", "index.count(2)": "1" }
  4: { "order.front()": "4", "order.back()": "3", "order.size()": "3", "index.count(2)": "0" }
refs:
  - https://en.cppreference.com/w/cpp/container/list/splice
  - https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_(LRU)
---

```cpp
#include <list>
#include <unordered_map>

std::list<int> order;                              // front = most recent
std::unordered_map<int, std::list<int>::iterator> index;

void touch(int k) {
  auto it = index.find(k);
  if (it != index.end()) {
    order.splice(order.begin(), order, it->second);  // move to front
    return;
  }
  if (order.size() == 3) {                           // capacity 3
    index.erase(order.back());
    order.pop_back();
  }
  order.push_front(k);
  index[k] = order.begin();
}

int main() {
  touch(1);              // @1
  touch(2); touch(3);    // @2
  touch(1);              // @3
  touch(4);              // @4
}
```

---

The classic O(1) LRU: a list holding the keys in recency order, and a
hash map from key to that key's **iterator** in the list. Both
operations are constant time because the map turns "find this key's
position" into a lookup instead of a search.

`splice` is what makes the hit path cheap and — crucially —
**iterator-stable**: moving a node between positions (or between
lists) relinks pointers without copying the element, so the iterator
stored in the map stays valid. That is the property `std::list`
provides and `std::vector` cannot, and it is the whole reason a
node-based list is the right container here despite its poor locality.

Probe 3 shows the reordering: touching 1, which was the least recent,
moves it to the front and pushes 2 to the back. Probe 4 shows the
consequence — inserting 4 evicts the back, which is now **2**, not 1.
Had the trace not touched 1, the eviction would have taken 1 instead.
Note the order of the two lines in the eviction: `index.erase` reads
`order.back()`, so popping first would erase the wrong key.

A production cache replaces this with an intrusive list inside the
entries and an open-addressed map, removing both allocations per
insert; and a concurrent one usually abandons strict LRU for CLOCK or
a sharded approximation, since a global recency list is a contended
write on every *read*.

Verified by compiling and running this program under GCC 13.3
(`g++ -std=c++23 -Wall -Wextra`) and printing the four values at each
probe.
