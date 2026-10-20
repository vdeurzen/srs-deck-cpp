---
id: stl-accumulate-init-type
kind: basic
version: 1
level: 1
tags: [stl, numeric, types]
requires:
  - cpp-essentials/iter-end-one-past
  - cpp-essentials/types-auto-deduces
refs:
  - https://en.cppreference.com/w/cpp/algorithm/accumulate
elaborate: Say in one sentence, as to an interviewer, which argument you check first when a sum from the standard library comes out too small.
---

`std::accumulate(first, last, init)`, from `<numeric>`, adds each
element of `[first, last)` onto `init`.

```cpp
std::vector<double> w{0.5, 0.5, 0.5};
auto s = std::accumulate(w.begin(), w.end(), 0);
```

## What is `s`?

---

**`0`, an `int`: the running total has `init`'s type.**

Each step computes `acc = acc + x` and stores it back into `acc`, an
`int`: 0 + 0.5 = 0.5 becomes 0, three times over. The elements' type
never matters; `0.0` would give 1.5.
