---
id: rng-dangling-symptom
kind: basic
version: 1
level: 3
tags: [algorithms, ranges, lifetime]
requires:
  - rng-temporary-result
  - qry-max-element-intro
elaborate: Say why the fix must keep the vector alive for as long as you use the iterator, not just for the call.
refs:
  - https://en.cppreference.com/w/cpp/ranges/dangling
  - https://en.cppreference.com/w/cpp/ranges/borrowed_range
---

```cpp
std::vector<int> scores();

auto best = std::ranges::max_element(scores());
int top = *best;
```

GCC rejects `*best` with `no match for 'operator*' (operand type is
'std::ranges::dangling')`.

## What change makes this compile and stay correct?

---

**Name the vector first: `auto s = scores();`, then call `max_element(s)`.**

A named vector lives to the end of its scope, so the algorithm returns a
real iterator into `s`, and `*best` reads a live element. The error came
from passing a temporary.
