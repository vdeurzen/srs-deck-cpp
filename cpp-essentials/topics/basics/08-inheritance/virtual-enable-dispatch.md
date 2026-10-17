---
id: virtual-enable-dispatch
kind: code
version: 1
level: 1
tags: [inheritance, virtual, dispatch]
requires:
  - virtual-dispatch-which-runs
input: chips
choices:
  c1: ["virtual", "inline", "explicit", "final"]
compile:
  harness: |
    static_assert(loudness(Siren{}) == 9, "loudness ran Sound's version");
    static_assert(loudness(Sound{}) == 1);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
---

`loudness` only knows it has some `Sound`. Make it report 9 when that
`Sound` is really a `Siren`.

```cpp
struct Sound {
  {{c1::virtual}} constexpr int volume() const { return 1; }
};
struct Siren : Sound {
  constexpr int volume() const { return 9; }
};
constexpr int loudness(const Sound& s) { return s.volume(); }
```

---

A call through a base-class reference or pointer only reaches the derived
version if the base declares the function **`virtual`**. Then any
derived function with the same name and parameters overrides it, and the
call is dispatched on the object's dynamic type. `inline` compiles but
changes nothing about dispatch. `explicit` belongs on constructors, and
`final` only goes *after* the parameter list of a function that is
already virtual, so both fail to compile here.
