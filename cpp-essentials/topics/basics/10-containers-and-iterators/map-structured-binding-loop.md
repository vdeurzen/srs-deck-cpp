---
id: map-structured-binding-loop
kind: basic
version: 1
level: 2
tags: [containers, maps, structured-bindings, range-for]
requires:
  - structured-bindings-basics
  - iter-range-for-const-auto-ref
  - map-unordered-map-intro
elaborate: Say which loop header you would write to print every key and value of a map without copying, and why.
refs:
  - https://en.cppreference.com/w/cpp/language/structured_binding
  - https://en.cppreference.com/w/cpp/language/range-for
---

```cpp
std::unordered_map<int, int> stock;
stock[7] = 3;
for (auto& [id, n] : stock)
    n += 1;
```

## The loop binds each element's key to `id` and its value to `n`. What is `stock[7]` now?

---

**4: with `auto&`, `n` names the value inside the map, not a copy.**

Each element is a key/value pair; `auto& [id, n]` refers to that pair's
`first` and `second`. Plain `auto [id, n]` would copy each pair, leaving
`stock` at 3. To read without copying, write `const auto& [id, n]`.
