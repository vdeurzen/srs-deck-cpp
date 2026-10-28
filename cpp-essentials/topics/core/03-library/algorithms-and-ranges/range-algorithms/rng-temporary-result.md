---
id: rng-temporary-result
kind: basic
version: 1
level: 2
tags: [algorithms, ranges, lifetime]
requires:
  - rng-ranges-form-vocab
  - life-temporary-full-expression
elaborate: Say what the same two lines would do with `std::find(load().begin(), load().end(), 3)`, and why that is worse.
refs:
  - https://en.cppreference.com/w/cpp/ranges/dangling
  - https://eel.is/c++draft/range.dangling
---

The `std::ranges::` algorithms check at compile time whether their range
argument is a temporary.

```cpp
std::vector<int> load();   // returns a new vector by value

auto it = std::ranges::find(load(), 3);
int x = *it;
```

## Does the last line compile?

---

**No: `it` is a `std::ranges::dangling`, an empty type with no `*`.**

The vector `load()` returns is a temporary, destroyed at the end of the
first statement, so any iterator into it would dangle. The ranges
algorithm sees a temporary and returns `dangling` instead, turning a
use-after-free into a compile error.
