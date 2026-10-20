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
    int main() {}
requires:
  - class-default-delete-where
  - class-default-member-init-intro
elaborate: When would you rather leave a class without a no-argument constructor, so that `Size s;` cannot compile?
refs:
  - https://en.cppreference.com/w/cpp/language/default_constructor
---

`Size s;` stopped compiling when the two-argument constructor was added.
Bring it back, so that `s` is 0 × 0.

```cpp
struct Size {
    int w = 0, h = 0;
    Size(int w_, int h_) : w(w_), h(h_) {}
    {{c1::Size() = default;}}
};
```

---

**The compiler writes a no-argument (default) constructor only while you
declare no constructor at all;** `Size(int, int)` removed it. `= default` asks
for the compiler-written one back, which uses the default member
initialisers. `Size();` only declares a constructor nobody defines.
`= default` cannot apply to `Size(int, int)`, and `= delete` forbids the
call.
