---
id: transfer-span-cannot-grow
kind: basic
version: 1
level: 2
tags: [transfer, misconception, span]
requires:
  - cpp-essentials/vocab-span-parameter
elaborate: Say in one sentence, as to an interviewer, when a function should take `std::span<int>` and when `std::vector<int>&`.
refs:
  - https://en.cppreference.com/w/cpp/container/span
---

## What must this signature become so `add` can append `4` to the caller's sequence?

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
