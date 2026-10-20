---
id: types-size-t
kind: basic
version: 3
level: 1
tags: [types, integers, containers]
requires:
  - vector-basics
  - types-signed-unsigned-range
refs:
  - https://en.cppreference.com/w/cpp/types/size_t
  - https://en.cppreference.com/w/cpp/container/vector/size
elaborate: Say which loop over a vector you would write differently because `size()` can never be negative.
---

```cpp
#include <vector>
std::vector<int> v{3, 1, 4};
std::size_t n = v.size();
```

## `v.size()` returns a `std::size_t`. On x86-64, which is it: a signed 32-bit, a signed 64-bit or an unsigned 64-bit integer type?

---

**Unsigned 64-bit: `std::size_t` is an unsigned integer type, 64 bits on x86-64.**
It is the type `sizeof` and every standard container's `size()` give,
wide enough to count the bytes of any object. It has no negative values
at all, unlike Go's signed `len`.
