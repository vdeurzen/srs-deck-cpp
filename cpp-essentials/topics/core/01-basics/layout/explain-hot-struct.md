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
elaborate: Which struct in a loop you care about would you audit first, and what number would you pin?
---

A struct sits in a large array scanned by the loop that dominates your
program's run time, and each element must start on its own 64-byte
boundary. Explain to a teammate how you decide its layout and how you
keep it from regressing.

---

- [ ] Problem: padding bytes between members are memory the scan reads but never uses
- [ ] Mechanism: each member's offset is a multiple of its alignment, so the compiler inserts padding
- [ ] Example: `char, double, char` takes 24 bytes; `double, char, char` takes 16
- [ ] Cost: `alignas(64)` rounds `sizeof` up to 64, spending padding to give each element its own boundary
- [ ] Pitfall: a later edit silently adds padding unless a `static_assert` on `sizeof` pins it
