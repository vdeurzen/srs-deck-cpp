---
id: chunks-lower-bound-lookup
kind: chunk
version: 1
level: 2
tags: [idioms, binary-search, containers]
expose_ms: 5000
compile:
  harness: |
    #include <vector>
    constexpr bool works() {
      std::vector<int> v{10, 20, 30};
      if (*find_or_insert(v, 20) != 20 || v.size() != 3) return false;
      if (*find_or_insert(v, 25) != 25) return false;
      if (*find_or_insert(v, 5) != 5) return false;
      return v == std::vector<int>{5, 10, 20, 25, 30};
    }
    static_assert(works());
    int main() {}
requires:
  - ordered-lower-bound-loop
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.cppreference.com/w/cpp/container/vector/insert
---

```cpp
#include <algorithm>
constexpr auto* find_or_insert(auto& v, int key) {
  auto it = std::lower_bound(v.begin(), v.end(), key);
  if (it != v.end() && *it == key) return &*it;
  return &*v.insert(it, key);
}
```

---

Find-or-insert in a **sorted vector**, the structure that beats
`std::set` for read-mostly tables because the search touches a few
contiguous cache lines. `lower_bound` returns the insertion point, not a
match — so `*it == key` is required — and that same iterator is where
`insert` goes, so the search is never repeated. Lookup O(log n), insert
an O(n) `memmove`.

Compile-checked: the harness runs it on a `std::vector` at compile time.
