---
id: stl-size-t-unsigned
kind: basic
version: 2
level: 1
tags: [stl, foundations, integers, misconception]
requires:
  - cpp-essentials/types-overflow-rules
  - cpp-essentials/types-size-t
refs:
  - https://en.cppreference.com/w/cpp/types/size_t
  - https://en.cppreference.com/w/cpp/container/vector/size
elaborate: Say where in a loop over `v` you would write `i + 1 < v.size()` instead of `i < v.size() - 1`, and why.
---

Many expect this adjacent-pairs check to run zero times on an empty `v`:

```cpp
std::vector<int> v;                             // empty
bool sorted = true;
for (std::size_t i = 0; i < v.size() - 1; ++i)
  if (v[i] > v[i + 1]) sorted = false;
```

## What does the loop do?

---

**It runs: `v.size() - 1` wraps to 2⁶⁴ − 1, so it reads `v[0]` out of range.**

`size()` returns `std::size_t`, which is unsigned, so 0 − 1 wraps to
its largest value, 18446744073709551615 on a 64-bit machine. Reading
past the end is undefined behaviour. `i + 1 < v.size()` never
subtracts.
