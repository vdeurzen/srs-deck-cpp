---
id: class-struct-default-access
kind: code
version: 1
level: 1
tags: [classes, access]
input: chips
choices:
  c1: ["struct", "class", "union"]
compile:
  harness: |
    constexpr Rgb teal{0, 128, 128};
    static_assert(teal.g == 128 && teal.b == 128);
    int main() {}
requires:
  - class-invariant-constructor
refs:
  - https://en.cppreference.com/w/cpp/language/class
  - https://en.cppreference.com/w/cpp/language/access
---

`Rgb` is a plain bundle of three independent channels with no invariant.
Pick the class-key so the harness can brace-initialise it and read its
members, with no access specifier written.

```cpp
{{c1::struct}} Rgb {
    int r, g, b;
};
```

---

`struct` and `class` differ in exactly one thing: the **default access**
(of members and of bases) is `public` for `struct`, `private` for `class`.
With `class`, `r`, `g`, `b` are private, so `Rgb` is not an aggregate and
both `teal{0, 128, 128}` and `teal.g` fail. A `union` has public members
but overlaps them, so only one channel can be initialised.

Convention: `struct` for a bundle with no invariant, `class` when the
members guard one.
