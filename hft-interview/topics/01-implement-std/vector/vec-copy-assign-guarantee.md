---
id: vec-copy-assign-guarantee
kind: basic
version: 1
level: 4
tags: [vector, exceptions, performance, implement-std]
elaborate: When would you pay for the allocation and write copy-and-swap at the call site instead?
requires:
  - cpp-essentials/exceptions-strong-vs-basic
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/container.reqmts#66
  - https://en.cppreference.com/w/cpp/container/vector/operator%3D
---

## Copy-and-swap would give your `Vec::operator=(const Vec&)` the strong guarantee. Why does `std::vector` reuse its existing buffer instead?

---

**Reuse skips the allocation when the source fits.**
Copy-and-swap always builds a full new buffer, then frees the old one.
Reuse assigns over existing elements, so a throwing copy leaves a mix of
old and new: the basic guarantee. The standard gives no strong guarantee
for copy assignment; [container.reqmts]'s list omits it.
