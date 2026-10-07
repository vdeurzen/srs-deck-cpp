---
id: transfer-span-cannot-grow
kind: basic
version: 1
level: 2
tags: [transfer, misconception, span]
requires:
  - vocab-span-parameter
elaborate: A Go function that appends returns the new slice, because the caller's copy may be stale. What in a C++ `std::vector<int>&` parameter makes that return unnecessary?
refs:
  - https://en.cppreference.com/w/cpp/container/span
---

## In Go, `add` would do `s = append(s, 4)`. What must this signature become so `add` can append `4` to the caller's sequence?

```cpp
void add(std::span<int> s) {
    // append 4 here
}
```

---

**`void add(std::vector<int>& s)`: a `std::span` can never grow.**

A span is a pointer and a length over storage someone else owns; it has
no capacity and no allocator. Only the owner can add elements, so the
function takes the container itself.
