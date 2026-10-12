---
id: vec-max-size-overflow
kind: basic
version: 1
level: 3
tags: [vector, growth, exceptions, implement-std]
requires:
  - vec-zero-capacity-growth
refs:
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/stl_vector.h
  - https://en.cppreference.com/w/cpp/container/vector/max_size
  - https://timsong-cpp.github.io/cppwp/n4950/vector.capacity#5
---

## Doubling the capacity would exceed `max_size()`, but one more element still fits. What does libstdc++'s `_M_check_len` do?

---

**Clamps the new capacity to `max_size()`; throws `std::length_error` only when `size() == max_size()` (implementation choice).**
Asking `allocate` for more than `max_size()` would throw, failing a push
that had room. It also clamps if the sum wraps. The standard specifies `length_error` for
`reserve(n > max_size())`.
