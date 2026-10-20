---
id: types-size-t
kind: basic
version: 2
level: 1
tags: [types, integers, containers]
requires:
  - vector-basics
  - types-signed-unsigned-range
refs:
  - https://en.cppreference.com/w/cpp/types/size_t
  - https://en.cppreference.com/w/cpp/container/vector/size
elaborate: Say which loop over a C++ vector would behave differently because `size()` is unsigned where Go's `len` is signed.
---

```cpp
#include <vector>
std::vector<int> v{3, 1, 4};
std::size_t n = v.size();
```

## `v.size()` returns a `std::size_t`. On x86-64, which Go type has the same width and signedness: `int32`, `int64` or `uint64`?

---

**`uint64`: `std::size_t` is an unsigned integer type, 64 bits on x86-64.**
It is the type `sizeof` and every standard container's `size()` give,
wide enough to count the bytes of any object. Unlike Go's `len`, which
returns a signed `int`, it has no negative values at all.
