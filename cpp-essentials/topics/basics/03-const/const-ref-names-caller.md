---
id: const-ref-names-caller
kind: basic
version: 1
level: 1
tags: [const, references, functions, parameters]
requires:
  - ptr-reference-must-bind
  - const-no-modify
  - vector-basics
elaborate: Say which of your own functions take a vector or a struct by value only to read it, and what `const&` would save there.
refs:
  - https://en.cppreference.com/w/cpp/language/reference
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f16-for-in-parameters-pass-cheaply-copied-types-by-value-and-others-by-reference-to-const
---

```cpp
int total_a(std::vector<int> v);
int total_b(const std::vector<int>& v);

std::vector<int> scores(100000, 1);   // 100 000 ones
int a = total_a(scores);
int b = total_b(scores);
```

## Which of the two calls copies the 100 000 elements of `scores`?

---

**Only `total_a`: `total_b`'s `v` is a reference to `const`, another name for `scores`.**

A C++ vector parameter taken by value is a full copy, unlike a Go slice.
The `&` makes `total_b`'s `v` refer to the caller's vector, and the
`const` forbids every change through it.
