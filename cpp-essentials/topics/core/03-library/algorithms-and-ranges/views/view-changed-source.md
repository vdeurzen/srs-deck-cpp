---
id: view-changed-source
kind: basic
version: 1
level: 3
tags: [ranges, views, misconception]
requires:
  - view-pull-worked
elaborate: Find a place in your own code where a view is built and its source changes before the loop; say which values the loop will see.
refs:
  - https://en.cppreference.com/w/cpp/ranges/transform_view
  - https://eel.is/c++draft/range.transform
---

`v | std::views::transform(f)` is a view whose elements are `f(x)` for each
element `x` of `v`. Many expect `r` to hold results computed on the line that builds it.

```cpp
std::vector<int> v{1, 2};
auto r = v | std::views::transform([](int x) { return x * 10; });
v[0] = 7;
int s = 0;
for (int x : r) s += x;
```

## What is `s`: 30, 90, undefined behaviour, or a compile error?

---

**90: `f` runs on each element when the loop pulls it, after `v[0] = 7`.**

Building `r` computes nothing; the loop reads `v[0]`, now 7, and `v[1]`:
70 + 20. Writing to `v` is fine, as `r` only refers to it. Tempting
because a loop filling a new vector does compute each result there.
