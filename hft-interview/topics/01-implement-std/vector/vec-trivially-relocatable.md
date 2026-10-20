---
id: vec-trivially-relocatable
kind: basic
version: 1
level: 4
tags: [vector, relocation, strings, implement-std]
elaborate: Which of your own types store a pointer into themselves, and would break the same way?
requires:
  - cpp-essentials/strings-sso
  - vec-realloc-order
refs:
  - https://en.cppreference.com/w/cpp/types/is_trivially_copyable
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/basic_string.h
---

## Your growth path relocates `int`s with one `memcpy` instead of a `construct_at` loop. Why would the same `memcpy` break libstdc++ `std::string` elements?

---

**A short string's data pointer points into the string object itself; the copied bytes still point into the old buffer.**
After the old buffer is freed, every relocated short string reads freed
memory. `memcpy` relocation is safe for trivially copyable types;
libstdc++ uses it only for types it marks bitwise-relocatable, mainly trivial ones (an implementation detail).
