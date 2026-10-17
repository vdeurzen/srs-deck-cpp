---
id: trace-lru-order
kind: trace
version: 2
level: 3
tags: [tracing, caching, containers]
probes:
  1: { "order.front()": "2", "order.back()": "1", "index.count(2)": "1" }
  2: { "order.front()": "1", "order.back()": "2", "index.count(2)": "1" }
  3: { "order.front()": "3", "order.back()": "1", "index.count(2)": "0" }
requires:
  - trace-lru-splice
  - db-lru-recency-bet
refs:
  - https://en.cppreference.com/w/cpp/container/list/splice
  - https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_(LRU)
---

```cpp
std::list<int> order;                                  // front = most recent
std::unordered_map<int, std::list<int>::iterator> index;
void touch(int k) {                                    // capacity 2
  if (auto it = index.find(k); it != index.end()) {
    order.splice(order.begin(), order, it->second);    // hit: move to front
    return;
  }
  if (order.size() == 2) { index.erase(order.back()); order.pop_back(); }
  order.push_front(k); index[k] = order.begin();
}
int main() {
  touch(1); touch(2);   // @1
  touch(1);             // @2
  touch(3);             // @3
}
```

---

The O(1) LRU: a list in recency order plus a map from key to its
**list iterator**, so "where is this key?" is a lookup, not a search.

Probe 2 is the hit: touching 1, the least recent, moves it to the front
and leaves 2 at the back. Probe 3 is the consequence: inserting 3
evicts the back — **2**, not 1. Without the touch at probe 2, 1 would
have gone. Note the eviction order: `index.erase` reads
`order.back()`, so popping first would erase the wrong key.

Verified by compiling and running this program (with `<list>` and
`<unordered_map>`) under GCC 16.2 and printing the values at each
probe.
