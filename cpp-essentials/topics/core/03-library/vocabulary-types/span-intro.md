---
id: vocab-span-intro
kind: basic
version: 1
level: 1
tags: [vocabulary-types, ownership]
requires:
  - vector-basics
  - ptr-holds-an-address
elaborate: Say which `const std::vector<int>&` parameter of yours could take a `std::span<const int>` instead, and which callers would gain.
refs:
  - https://en.cppreference.com/w/cpp/container/span
  - https://eel.is/c++draft/views.span
---

`std::span` is from the header `<span>`.

```cpp
std::vector<int> v{4, 5, 6};
std::span<const int> s = v;
```

## How many `int`s does `s` own?

---

**None: `s` stores a pointer to `v`'s first element and the length 3.**

A span is a view of a contiguous run of elements that someone else owns:
`s[i]` reads `v`'s element in place, so `v` must outlive `s`. The `const`
means it may only read them.
