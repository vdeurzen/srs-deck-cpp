---
id: vec-push-back-self-alias
kind: basic
version: 1
level: 3
tags: [vector, aliasing, lifetime, implement-std, misconception]
elaborate: Which other member that takes a `const T&` could be handed a reference into its own container?
requires:
  - vec-realloc-order
refs:
  - https://cplusplus.github.io/LWG/issue526
  - https://timsong-cpp.github.io/cppwp/n4950/res.on.arguments#1.3
---

## A candidate's `push_back(const T& x)` grows like this. On a full vector, what happens in `v.push_back(v[0])`?

```cpp
T* nb = a.allocate(2 * cap);           // members: a, b, n, cap; n == cap
for (std::size_t i = 0; i != n; ++i)
    std::construct_at(nb + i, std::move(b[i]));
std::destroy(b, b + n);
a.deallocate(b, cap);
std::construct_at(nb + n, x);
```

---

**Undefined behaviour: `x` is `b[0]`, already moved from, destroyed and freed.**
A `const T&` parameter looks like a separate value but can alias the
buffer, and the standard requires this call to work (LWG 526). Fix:
construct the new element in `nb` first, or copy `x` before relocating.
