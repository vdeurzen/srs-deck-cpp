---
id: vector-basics
kind: basic
version: 1
level: 1
tags: [containers, vector, foundations]
requires:
  - std-names-and-headers
elaborate: Say what `v[2]` does on a vector of size 2, and who checks it.
refs:
  - https://en.cppreference.com/w/cpp/container/vector
  - https://en.cppreference.com/w/cpp/container/vector/push_back
---

```cpp
std::vector<int> v{4, 5};
v.push_back(6);
```

## What are `v.size()` and `v[2]` now?

---

**3 and 6: a vector is a growable array; `push_back` appends at the end.**

`std::vector<int>` holds `int`s (the element type goes in `<>`), stored
side by side. `{4, 5}` lists the starting elements,
`size()` counts them, and `v[i]` reads index i from 0, unchecked.
