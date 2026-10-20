---
id: vec-three-pointers
kind: basic
version: 1
level: 2
tags: [vector, layout, implement-std]
elaborate: Which of your own containers stores a size and a capacity where two pointers would do?
requires:
  - cpp-essentials/iter-size-vs-capacity
  - cpp-essentials/iter-end-one-past
refs:
  - https://en.cppreference.com/w/cpp/container/vector
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/stl_vector.h
---

## In libstdc++ (GCC's standard library), `std::vector<int>` stores neither a size nor a capacity field. What are its members?

---

**Three pointers: first element, one past the last element, end of the buffer.**
`size()` is `end - begin` and `capacity()` is `cap_end - begin`. The
`push_back` fast path compares two pointers and bumps one. In libstdc++
they are `_M_start`, `_M_finish`, `_M_end_of_storage`, 24 bytes on a
64-bit machine; an implementation choice, not the standard's.
