---
id: storage-transparent-replacement
kind: basic
version: 1
level: 5
tags: [raw-storage, lifetime, launder, c++20]
elaborate: Your `optional`-like type destroys and re-creates its value in place. Which pointers into it stay valid after `emplace`?
requires:
  - cpp-essentials/storage-construct-at
refs:
  - https://en.cppreference.com/w/cpp/language/lifetime#Storage_reuse
  - https://timsong-cpp.github.io/cppwp/n4950/basic.life#8
  - https://cplusplus.github.io/CWG/issues/1776.html
---

## In C++23, may the old pointer `p` read the new `Quote` on the last line?

```cpp
struct Quote { const int px; };
Quote q{100};
Quote* p = &q;
std::destroy_at(p);
std::construct_at(p, 101);
int now = p->px;
```

---

**Yes: the new `Quote` transparently replaces the old one, so `p` and `q` now refer to it.**
It has the same type and exactly the same storage. Under C++17's rule
(CWG 1776), the `const` member blocked this and `p` needed
`std::launder`; C++20 dropped the `const`- and reference-member restriction.
