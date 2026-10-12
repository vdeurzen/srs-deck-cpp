---
id: vec-push-back-delegates
kind: basic
version: 1
level: 3
tags: [vector, move-semantics, implement-std]
requires:
  - cpp-basics/vc-named-rvalue-ref-is-lvalue
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/stl_vector.h
---

## Your `Vec` has `template <class... Args> T& emplace_back(Args&&... args)`; the real one handles growth. What is the whole body of `push_back(T&& x)`?

---

**`emplace_back(std::move(x));`**
`emplace_back` already handles growth, aliasing and construction, so
there is one path to get right. `x` names an rvalue reference but is an
lvalue: `emplace_back(x)` would copy. libstdc++'s `push_back(T&&)` is
exactly this line.
