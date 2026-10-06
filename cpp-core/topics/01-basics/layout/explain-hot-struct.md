---
id: layout-explain-hot-struct
kind: explain
version: 1
level: 3
tags: [layout, alignment, padding, alignas]
requires:
  - layout-member-order
  - layout-alignas-sizeof
  - layout-pin-chunk
refs:
  - https://en.cppreference.com/w/cpp/language/object#Alignment
  - https://en.cppreference.com/w/cpp/language/alignas
---

A struct sits in a large array that a hot loop scans, and each element
must start on its own 64-byte boundary. Explain to a teammate how you
decide its layout and how you keep it from regressing.

---

- [ ] Each member starts at an offset that is a multiple of its `alignof`; padding fills the gaps
- [ ] `sizeof` is rounded up to a multiple of the struct's alignment, so array elements stay aligned
- [ ] Declaring members in decreasing order of alignment removes most of the padding
- [ ] `alignas(64)` on the struct rounds its `sizeof` up to a multiple of 64
- [ ] A `static_assert` on `sizeof`/`offsetof` makes an edit that adds padding fail the build
