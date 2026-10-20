---
id: trace-lru-order
kind: trace
version: 5
level: 3
tags: [tracing, caching, containers]
probes:
  1: { "order.back()": "2", "index.count(2)": "0" }
  2: { "order.front()": "3", "order.back()": "1" }
requires:
  - trace-lru-splice
  - db-lru-recency-bet
elaborate: Say in one sentence, as to an interviewer, why the map stores list iterators rather than positions.
refs:
  - https://en.cppreference.com/w/cpp/container/list/splice
  - https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_(LRU)
---

An LRU cache of capacity 2 in which 1 was used after 2.
`index.count(k)` is 1 if `k` is a key of `index`, else 0.

```cpp
std::list<int> order{1, 2};                            // front = most recent
std::unordered_map<int, std::list<int>::iterator> index{
    {1, order.begin()}, {2, std::next(order.begin())}};
void touch(int k) {
  if (index.count(k) == 1) {
    order.splice(order.begin(), order, index[k]);      // hit: move to front
    return;
  }
  if (order.size() == 2) {
    index.erase(order.back());   // @1
    order.pop_back();
  }
  order.push_front(k);
  index[k] = order.begin();      // @2
}
int main() { touch(3); }
```

---

The O(1) LRU: a list in recency order plus a map from key to its
**list iterator**, so "where is this key?" is a lookup, not a search.

3 is a miss and the cache is full, so it evicts the back. Probe 1:
`index.erase` reads `order.back()`, still **2**, the least recent, and
removes its key; only then does `pop_back` drop the node. Popping first
would erase the wrong key, 1. Probe 2: 3 is now the front, 1 the back.

(Values from running it under GCC 16.2.)
