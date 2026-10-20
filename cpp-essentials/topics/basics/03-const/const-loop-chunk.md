---
id: const-loop-chunk
kind: chunk
version: 3
level: 1
tags: [const, references, loops, idioms]
expose_ms: 11000
compile: null
requires:
  - const-ref-parameter
  - iter-range-for-const-auto-ref
  - types-size-t
elaborate: Where in your code does a loop copy each element when it only reads them?
refs:
  - https://en.cppreference.com/w/cpp/language/range-for
  - https://en.cppreference.com/w/cpp/language/reference
---

```cpp
std::size_t total_length(const std::vector<std::string>& names) {
  std::size_t n = 0;
  for (const auto& name : names)
    n += name.size();
  return n;
}
```

---

**Read-only traversal without copies.** The parameter borrows the whole
vector read-only; `const auto&` in the loop does the same for each
element. Plain `auto name` would copy every string on every iteration.
`std::size_t` is the unsigned type `size()` returns, so the sum needs no
sign conversion. The same loop works for any container.
