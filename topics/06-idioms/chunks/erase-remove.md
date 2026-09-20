---
id: chunks-erase-remove
kind: chunk
version: 1
level: 2
tags: [idioms, containers]
expose_ms: 5000
compile: null
refs:
  - https://en.cppreference.com/w/cpp/algorithm/remove
  - https://en.cppreference.com/w/cpp/container/vector/erase2
---

```cpp
v.erase(std::remove_if(v.begin(), v.end(), pred), v.end());
```

---

The erase-remove idiom. `std::remove_if` cannot itself shrink `v` — it only
shuffles the elements to keep to the front and returns an iterator to the
new logical end, leaving the tail in a moved-from state. `erase` is what
actually shrinks the container. In C++20, prefer the free function
`std::erase_if(v, pred)`, which does both steps for you and works
uniformly across the sequence containers.
