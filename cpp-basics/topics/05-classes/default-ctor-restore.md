---
id: class-default-ctor-restore
kind: code
version: 1
level: 2
tags: [classes, constructors, special-members]
input: chips
choices:
  c1: ["Size() = default;", "Size();", "Size(int, int) = default;", "Size() = delete;"]
compile:
  harness: |
    constexpr Size s;
    static_assert(s.w == 0 && s.h == 0);
    static_assert(Size(3, 4).w == 3);
    int main() {}
requires:
  - class-init-list-required
  - class-default-delete-where
refs:
  - https://en.cppreference.com/w/cpp/language/default_constructor
---

Writing `= default` after a special member function's declaration asks the
compiler for its own version; `= delete` makes every call a compile error.
`Size s;` stopped compiling when the two-argument constructor was added.
Bring it back, so that `s` is 0 × 0.

```cpp
struct Size {
    int w = 0, h = 0;
    constexpr Size(int w_, int h_) : w(w_), h(h_) {}
    {{c1::Size() = default;}}
};
```

---

The compiler writes a default constructor for you only while you declare
**no** constructor at all; `Size(int, int)` removed it. `= default` asks
for the compiler-written one back, which uses the default member
initialisers. `Size();` only declares a constructor nobody defines.
`= default` cannot apply to `Size(int, int)`, and `= delete` forbids the
call.
