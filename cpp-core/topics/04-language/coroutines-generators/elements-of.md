---
id: coroutines-generator-elements-of
kind: basic
version: 1
level: 4
tags: [coroutines, ranges]
requires:
  - coroutines-generator-basic
  - coroutines-symmetric-transfer
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
  - https://en.cppreference.com/w/cpp/ranges/elements_of
---

## Why does a recursive `std::generator` yield a sub-range with `co_yield std::ranges::elements_of(sub)` instead of looping `for (auto&& x : sub) co_yield x;`?

---

**Splicing costs one resume per element; the loop costs one per
level.** The loop leaves every level suspended in its own `co_await`,
so an element pulled through depth *d* resumes *d* coroutines: O(n·d)
overall. `elements_of` tells the promise that `sub` is a nested
generator; resuming the parent then resumes the innermost child by
symmetric transfer.

```cpp
std::generator<const Node&> walk(const Node& n) {
  co_yield n;
  for (const Node& child : n.children) co_yield std::ranges::elements_of(walk(child));
}
```
