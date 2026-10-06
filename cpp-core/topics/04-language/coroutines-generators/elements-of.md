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

Both produce the same elements; they differ in cost. The hand-written
loop leaves every level of the recursion suspended in its own `co_await`
inside its own frame, so pulling one element from a tree of depth *d*
resumes *d* coroutines, one per level, and every value is passed up
hand to hand. Traversing a deep structure is quadratic in exactly the
way that makes generators look slow.

`co_yield std::ranges::elements_of(sub)` tells the generator's promise
that `sub` is a nested generator to **splice in**: the parent records
the child as the active coroutine and, from then on, resuming the
parent resumes the innermost child directly by symmetric transfer.
Yielding an element costs one resume regardless of depth, and when the
child finishes the parent continues after the `co_yield`.

```cpp
std::generator<const Node&> walk(const Node& n) {
  co_yield n;
  for (const Node& child : n.children) co_yield std::ranges::elements_of(walk(child));
}
```

`elements_of` also accepts an ordinary range, which is the tidy way to
yield an entire container without writing the loop — and it takes an
optional allocator argument for the child frames.
