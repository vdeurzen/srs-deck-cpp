---
id: map-unordered-map-intro
kind: basic
version: 1
level: 1
tags: [containers, maps, iterators, foundations]
elaborate: Say why `find` plus a comparison with `end()` is needed before you read a value.
requires:
  - pair-basics
  - iter-end-one-past
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map
  - https://en.cppreference.com/w/cpp/container/unordered_map/find
---

```cpp
std::unordered_map<int, int> stock;
stock[7] = 3;
auto it = stock.find(9);
```

## 9 is not a key of `stock`. What does `it` equal?

---

**`stock.end()`: `find` reports a missing key with the end position.**

`std::unordered_map<int, int>` is a hash map from `int` keys to `int` values.
`find(k)` returns an iterator to the element with key k, so test
`it != stock.end()` before reading. Each element is a pair: key in
`first`, value in `second`.
