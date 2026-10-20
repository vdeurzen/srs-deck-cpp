---
id: life-copy-ctor-param
kind: code
version: 1
level: 2
tags: [lifetime, copy, special-members]
requires:
  - life-copy-init-not-assign
  - const-ref-names-caller
  - class-default-member-init-intro
  - constexpr-fn-static-assert
elaborate: Say in one sentence why a copy constructor taking its parameter by value could never work.
input: chips
choices:
  c1:
    - "const Tally&"
    - "Tally&"
    - "Tally"
    - "const Tally"
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

**A copy constructor takes a reference to `const` of its own class.**
By value, with or without `const`, the parameter would itself need a
copy, so the language rejects it; `Tally&` cannot bind the `const`
`original`.
