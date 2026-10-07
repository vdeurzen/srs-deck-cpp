---
id: value-categories-guaranteed-elision
kind: code
version: 1
level: 3
tags: [value-categories, copy-elision]
input: chips
choices:
  c1: ["return Pinned{};", "Pinned local; return local;", "Pinned local; return std::move(local);"]
compile:
  harness: |
    constexpr Pinned p = make();
    static_assert(p.id == 7);
    int main() {}
requires:
  - value-categories-temporary-materialization
refs:
  - https://en.cppreference.com/w/cpp/language/copy_elision
  - https://timsong-cpp.github.io/cppwp/n4950/dcl.init.general#16.6.1
---

`Pinned` can be neither copied nor moved. Complete `make` so that
`make()` can still initialize a `Pinned` by value.

```cpp
struct Pinned {
    int id = 7;
    constexpr Pinned() = default;
    Pinned(const Pinned&) = delete;
    Pinned(Pinned&&) = delete;
};
constexpr Pinned make() {
    {{c1::return Pinned{};}}
}
```

---

`Pinned{}` is a prvalue, and C++17 makes a prvalue initialize its result
object directly: through the `return` and into `p`, nothing is
materialized, so no copy or move constructor is needed, not even an
accessible one. A named local is an object already; returning it needs a
move (or copy) constructor even when NRVO would elide the call.
