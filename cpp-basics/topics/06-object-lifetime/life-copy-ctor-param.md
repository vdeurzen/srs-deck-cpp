---
id: life-copy-ctor-param
kind: code
version: 1
level: 2
tags: [lifetime, copy, special-members]
requires:
  - life-copy-init-not-assign
input: chips
choices:
  c1:
    - "const Tally&"
    - "Tally&"
    - "Tally"
    - "Tally&&"
compile:
  harness: |
    constexpr Tally original{3};
    constexpr Tally duplicate = original;
    static_assert(duplicate.n == 3 && duplicate.copies == 1);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/copy_constructor
---

`Tally` counts how many times a value has been copied. Complete the
parameter of its copy constructor so that `Tally duplicate = original;`
compiles and counts one copy.

```cpp
struct Tally {
  int n;
  int copies = 0;
  constexpr Tally(int v) : n(v) {}
  constexpr Tally({{c1::const Tally&}} other)
      : n(other.n), copies(other.copies + 1) {}
};
```

---

A copy constructor takes **a reference to const of its own class**. The
reference is required: taking `Tally` by value would itself need a copy,
so the language rejects it. `const` is what lets you copy from a `const`
object or a temporary; `Tally&` binds to neither. `Tally&&` declares a
*move* constructor instead, which stops the compiler from generating a
copy constructor at all.
