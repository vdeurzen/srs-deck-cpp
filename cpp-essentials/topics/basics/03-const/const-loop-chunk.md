---
id: const-loop-chunk
kind: chunk
version: 2
level: 1
tags: [const, references, loops, idioms]
expose_ms: 9500
compile: null
requires:
  - const-ref-parameter
  - iter-range-for-const-auto-ref
elaborate: Where in your code does a loop copy each element when it only reads them?
refs:
  - https://en.cppreference.com/w/cpp/language/range-for
  - https://en.cppreference.com/w/cpp/language/reference
---

```cpp
int total_length(const std::vector<std::string>& names) {
  int n = 0;
  for (const auto& name : names) n += name.size();
  return n;
}
```

---

**Read-only traversal without copies.** The parameter borrows the whole
vector read-only; `const auto&` in the loop does the same for each
element. Plain `auto name` would copy every string on every iteration;
the `const` states, right in the loop, that the body only reads. The
same line works for any container, and recurs constantly.
