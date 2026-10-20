---
id: transfer-slices-vs-span
kind: basic
version: 2
level: 3
tags: [transfer, misconception, ownership]
elaborate: Which C++ type would own the array here, and what would `evens` return then?
requires:
  - cpp-essentials/vocab-span-parameter
  - cpp-essentials/raii-storage-durations
refs:
  - https://en.cppreference.com/w/cpp/container/span
  - https://en.cppreference.com/w/cpp/language/reference#Dangling_references
---

Many expect a view returned from a function to keep the elements it
views alive. A `std::span` is a pointer and a length.

```cpp
std::span<const int> evens() {
    std::vector<int> v{0, 2, 4};
    return v;
}
int first = evens()[0];
```

## What happens on the last line?

---

**Undefined behaviour: `v` was destroyed when `evens` returned, so the
span points at freed memory.**

A `span` owns nothing and keeps nothing alive; it is only
valid while what it views is. Return the `std::vector` itself.
