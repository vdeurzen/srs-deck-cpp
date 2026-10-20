---
id: virtual-enable-dispatch
kind: code
version: 1
level: 1
tags: [inheritance, virtual, dispatch]
requires:
  - virtual-dispatch-which-runs
  - const-member-on-const-ref
  - constexpr-fn-static-assert
elaborate: Say what `loudness` would return for a `Siren` if its parameter were a `Sound` by value instead of `const Sound&`, and why.
input: type
compile:
  harness: |
    static_assert(loudness(Siren{}) == 9, "loudness ran Sound's version");
    static_assert(loudness(Sound{}) == 1);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
---

`loudness` only knows it has some `Sound`. Type the one keyword that makes
it report 9 when that `Sound` is really a `Siren`.

```cpp
struct Sound {
  {{c1::virtual}} constexpr int volume() const { return 1; }
};
struct Siren : public Sound {
  constexpr int volume() const { return 9; }
};
constexpr int loudness(const Sound& s) { return s.volume(); }
```

---

**`virtual` on the base declaration: only then does a call through a
`Sound&` reach the derived version.** `Siren::volume`, with the same
name, parameters and `const`, then overrides it, and `s.volume()` is
chosen from the object's dynamic type. Without it, the static type
`Sound` decides and `loudness` returns 1.
