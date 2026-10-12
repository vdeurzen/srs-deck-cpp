---
id: vec-resize-value-inits
kind: basic
version: 1
level: 3
tags: [vector, initialization, performance, implement-std]
elaborate: Where do you size a buffer that the next call overwrites completely?
requires:
  - cpp-basics/iter-size-vs-capacity
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/vector.capacity#15
  - https://en.cppreference.com/w/cpp/container/vector/resize
  - https://en.cppreference.com/w/cpp/memory/unique_ptr/make_unique
---

## `read_prices` will overwrite all one million slots. What does this `resize` cost that the overwrite throws away?

```cpp
std::vector<double> buf;
buf.resize(1'000'000);
read_prices(buf.data(), buf.size());
```

---

**It value-initialises every element: a million zero stores across 8 MB, before the real writes.**
`resize` appends default-inserted elements, which `std::allocator`
value-initialises. `reserve` alone isn't a fix: writing past `size()`
is undefined. `std::make_unique_for_overwrite<double[]>(n)` (C++20)
default-initialises: no stores at all.
